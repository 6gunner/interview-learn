const p1 = new Promise((resolve, reject) => {
  resolve(1);
});
console.log(p1); // 1个Promise对象，里面是{1}
p1.then(res => {
  console.log(res);
  //then回调中可以return一个Promise
  return new Promise((resolve, reject) => {
    setTimeout(() => {
      resolve(2);
    }, 1000);
  });
})
  .then(res => {
    console.log(res); // 2
    //then回调中也可以return一个值，或者不返回
    // return 3;
  })
  .then(res => {
    console.log(res); //3
  });
