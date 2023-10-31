const obj = {
  a: "a",
  b: "b"
};
// obj[Symbol.iterator] = function*() {
//   for (let x in obj) {
//     yield obj[x];
//   }
// };

obj[Symbol.iterator] = function*() {
  yield* Object.values(obj);
};

// 要想让obj支持...扩展操作，就需要让obj支持iterable.
// 可以利用generator来实现
const arr = [...obj];

console.log(arr);
