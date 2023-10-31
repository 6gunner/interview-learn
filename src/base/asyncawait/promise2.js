// const myPromise = Promise.resolve(Promise.resolve("Promise!"));
const myPromise = Promise.resolve("Promise!");
console.log(myPromise);
function funcOne() {
  // myPromise.then(res => res).then(res => console.log(res));
  myPromise.then(res => console.log(res));
  setTimeout(() => console.log("Timeout!"), 0);
  console.log("Last line!");
}

async function funcTwo() {
  const res = await myPromise;
  // await关键字后面的，如果是promise，要阻塞等待
  // console.log(await res);
  // 如果是普通对象的，直接返回
  console.log(res);
  setTimeout(() => console.log("Timeout!"), 0);
  console.log("Last line!");
}

funcOne();
funcTwo();
