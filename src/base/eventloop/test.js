console.log("script start");

async function async1() {
  console.log("async1 start");
  // 如果async2返回的是非promise对象，那么await返回的是一个立即执行的Promise，
  const a = await async2();
  // 下面的一行代码会在promise后执行，相当于创建了一个微任务
  console.log(a);
  console.log("async1 end");
}

function async2() {
  console.log("async2 end");
  return 1;
}

async1();

// 产生宏任务
setTimeout(function() {
  console.log("setTimeout");
}, 0);

new Promise(resolve => {
  console.log("Promise");
  resolve();
})
  // 产生微任务
  .then(function() {
    console.log("promise1");
    return Promise.resolve(1);
  })
  // 产生微任务
  .then(function(ret) {
    console.log("promise2-" + ret);
  });

console.log("script end");

// script start => async1 start => async2 end => Promise => script end => async1 end => promise1 => promise2 => setTimeout;
