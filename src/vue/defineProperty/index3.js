// Reactive Object Simple Version
class Dep {
  constructor () {
    this.subs = new Set();
  }

  depend() {
    // 将订阅者注册到这个地方
    if (activiedUpate) {
      this.subs.add(activiedUpate);
    }
  }

  notify() {
    this.subs.forEach(sub => sub());
  }
}

// new Observer就是把obj的所有属性都变成reactive的。
class Observer {
  constructor(obj) {
    Object.keys(obj).forEach((i) => {
      defineReactive(obj, i, obj[i]);
    })
  }
}

function defineReactive(obj, key, val) {
  let dep = new Dep();
  Object.defineProperty(obj, key,{
    configurable: true,
    enumerable: true,
    set (v) {
      if (v == val) return;
      val = v;
      dep.notify();
    },
    get () {
      dep.depend();
      return val;
    }
  });
}

// js是单线程，所以一次只会有1个函数被执行
// 用一个全局的activiedUpate来存储当前执行的update函数
let activiedUpate;
function autoRun(update) {
  // 为什么要用这个wrappedUpdate？
  function wrappedUpdate() {
    activiedUpate = wrappedUpdate;
    update();
    activiedUpate = null;
  }
  wrappedUpdate();
}

// Observer测试
// 先定义一个state对象
let state = {
  a: 3,
}
new Observer(state);
// 设想一个问题，当state.a变化时，怎么能够让b的值也发生变化
autoRun(() => {
  let b = state.a * 10;
  console.log(b);
})
state.a = 4;


