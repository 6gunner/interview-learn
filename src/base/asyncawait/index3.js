var original = Promise.resolve(33);
var cast = Promise.resolve(original); // resolve后面如果传入的是promise，那么将返回这个 Promise ；
console.log(cast); // Promise {<fulfilled>: 33}

console.log("original === cast ? " + (original === cast)); // true

var p1 = Promise.resolve(
  new Promise(function(resolve, reject) {
    setTimeout(resolve, 500, "one");
  })
);
console.log(p1); //  Promise { <pending> }

const thenableObj = {
  // 这里的then方法，可以理解成Promise的构造方法参数executor。
  // 即 = new Promise((resolve, reject) => {})
  then: (resolve, reject) => {
    console.log("我被执行了");
    resolve("dadaasd");
  }
};

// 接收一个有.then方法的对象
const thenableObjTest = Promise.resolve(thenableObj);
console.log(thenableObjTest); // 是一个promise对象   Promise { <pending> }
thenableObjTest.then(value => {
  console.log(value); // dadaasd
});
