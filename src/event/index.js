console.log('script start')

async function async1 () {
  console.log('async1 start')
  await async2(); // 如果async2返回的是非promise对象，那么await的结果会是一个立即执行的Promise，下面的一行代码会接着执行
  console.log('async1 end')
}

function async2 () {
  console.log('async2 end');
  // return undefined;
}

async1()

setTimeout(function () {
  console.log('setTimeout')
}, 0)

new Promise(resolve => {
  console.log('Promise1')
  resolve()
}).then(function () {
  console.log('promise1')
}).then(function () {
  console.log('promise2')
})

console.log('script end')


// script start => async1 start => async2 end => Promise1 => script end => async1 end => promise1 => promise2 => setTimeout;

