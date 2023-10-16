console.log('script start')

async function async1 () {
  console.log('async1 start')
  await async2(); // 如果返回的是promise函数，那么会先等promise函数resolve，再创建一个microtask，执行后面的语句。
  console.log('async1 end')
}

function async2 () {
  return Promise.resolve().then(() => {
    console.log('async2 end')
  })
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


// script start => async1 start => Promise1 => script end => async2 end => promise1 => async1 end => promise2 => setTimeout;

