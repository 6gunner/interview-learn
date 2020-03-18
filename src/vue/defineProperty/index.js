// 如果是数组的话，怎么进行检测更新？
function isObject(obj) {
  return obj.constructor == Object || obj.constructor == Array;
}

class Dep {
  constructor () {
    this.subs = new Set()
  }
  depend () {
    // 将订阅者注册到这个地方
    if (activiedUpate) {
      this.subs.add(activiedUpate)
    }
  }
  notify () {
    this.subs.forEach(sub => sub())
  }
}

function def (obj, key, val, enumerable) {
  Object.defineProperty(obj, key, {
    value: val,
    enumerable: !!enumerable,
    writable: true,
    configurable: true
  })
}

/**
 * 重写数组对象的原型
 * @param array
 */
function reAssignArrayMethod (array) {
  const methods = ['push', 'pop', 'unshift', 'shift', 'splice', 'reverse', 'sort']
  const arrayProto = Object.create(Array.prototype)
  methods.forEach(method => {
    const originalMethod = arrayProto[method]
    Object.defineProperty(arrayProto, method, {
      value: (...args) => {
        const result = originalMethod.apply(array, args)
        // 调用ob对象去notify
        array['_ob_'].dep.notify()
        return result
      },
      enumerable: true,
      writable: true,
      configurable: true
    })
  })
  array.__proto__ = arrayProto
}

// new Observer就是把obj的所有属性都变成reactive的。
class Observer {
  constructor (obj) {
    this.dep = new Dep()
    def(obj, '_ob_', this)
    if (Array.isArray(obj)) {
      reAssignArrayMethod(obj)
    } else {
      Object.keys(obj).forEach((i) => {
        defineReactive(obj, i, obj[i])
      })
    }
  }
}

function createObserver (val) {
  if (!isObject(val)) {
    return
  }
  const ob = new Observer(val);
  return ob;
}

function defineReactive (obj, key, val) {
  let dep = new Dep()
  const childOb = createObserver(val)
  Object.defineProperty(obj, key, {
    configurable: true,
    enumerable: true,
    set (v) {
      if (v == val) return
      val = v
      dep.notify();
    },
    get () {
      dep.depend()
      if (childOb) {
        childOb.dep.depend()
      }
      return val
    }
  })

}

// js是单线程，所以一次只会有1个函数被执行
// 用一个全局的activiedUpate来存储当前执行的update函数
let activiedUpate

function autoRun (update) {
  // 为什么要用这个wrappedUpdate？设置全局activiedUpate
  function wrappedUpdate () {
    activiedUpate = wrappedUpdate
    update()
    activiedUpate = null
  }

  wrappedUpdate()
}

const state = {
  array: [0, 1, 2]
}
new Observer(state)
autoRun(() => {
  console.log(state.array)
})
state.array.push(3)


