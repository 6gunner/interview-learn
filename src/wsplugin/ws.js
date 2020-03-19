const defaultOptions = {
  reconnect: true,
  reconnectDelay: 1000,
  reconnectTry: 5
}
const WS_EVENTS = ['onmessage', 'onclose', 'onerror', 'onopen']

function mergeOptions (options) {
  return {
    ...defaultOptions,
    ...options,
  }
}

function isDefine (obj) {
  return obj && obj != undefined && obj != null
}

let reconnectTry = 0
let reconnectTimeout = null

// 缓存的订阅
const subscriptions = {}

class WS {
  constructor (props) {
    this.$opts = mergeOptions(props)
    this.$store = props.store
    this._init()
  }

  _init () {
    if (!this.connected) {
      if (isDefine(this._ws)) {
        const { readyState } = this._ws
        if (readyState == 0) {
          console.warn('ws正在连接')
        }
      } else {
        this.initConnection()
      }
    } else {
      console.warn('ws已经连接，请不要重复建立连接')
    }
  }

  initConnection () {
    const options = this.$opts
    const ws = new WebSocket(options.url)
    this._ws = ws
    this.initEvent()
  }

  initEvent () {
    const { _ws } = this
    WS_EVENTS.forEach(eventKey => {
      _ws[eventKey] = (e) => {
        this.handleEventMessage(e, eventKey)
      }
    })
  }

  // 处理消息
  handleEventMessage (e, eventKey) {
    const options = this.$opts
    const store = this.$store
    if (store) {
      passToStore(`SOCKET_${eventKey}`, e, store)
    }
    switch (eventKey) {
      case 'onopen':
        this.connected = true
        reconnectTry = 0
        Object.keys(subscriptions).forEach(key => {
          this.sendObj(subscriptions[key])
        })
        break
      case 'onclose', 'onerror':
        this.connected = false
        this._ws = null
        console.warn('断开连接，错误码: = ' + e.code)
        if (options.reconnect && e.code !== 1000) {
          // 断开重连
          this.tryReconnect()
        }
        break
    }
  }

  tryReconnect () {
    const options = this.$opts
    if (options.reconnectTry > reconnectTry) {
      reconnectTry += 1
      if (reconnectTimeout) {
        clearTimeout(reconnectTimeout)
        reconnectTimeout = setTimeout(() => {
          this.initConnection()
        }, options.reconnectDelay)
      } else {
        reconnectTimeout = setTimeout(() => {
          this.initConnection()
        }, 0)
      }
    } else {
      console.error('重连失败，请检查ws服务端')
      clearTimeout(reconnectTimeout)
      reconnectTimeout = null
    }
  }

  sendObj (obj) {
    // 0 正在连接
    // 1 已经连接
    // 2 正在关闭
    // 3 已经关闭
    // const send = this._ws.send;
    if (this._ws.readyState !== 1) {
      // 缓存所有请求,可以重连再发送
      if (isDefine(obj.api) && isDefine(obj.topic)) {
        const key = `${obj.api}-${obj.topic}`
        subscriptions[key] = obj
      }
    } else {
      this._ws.send(JSON.stringify(obj))
    }
  }
}

// 传递给store函数
function passToStore (eventName, payload, store) {
  if (!eventName.startsWith('SOCKET_')) {
    return
  }
  for (const namespaced in store._mutations) {
    const mutation = namespaced.split('/').pop()
    if (mutation === eventName.toUpperCase()) {
      store.commit(namespaced, payload)
    }
  }

  for (const namespaced in store._actions) {
    const action = namespaced.split('/').pop()
    if (action.startsWith('socket_')) {
      const camelcased = `socket_${payload.toLowerCase()}`
        .replace('SOCKET_', '')
        .replace(/[\W\s_]+(\w)/g, (match, p1) => p1.toUpperCase())
      if (action === camelcased) {
        store.dispatch(namespaced, payload)
      }
    }
  }
}

export default WS
