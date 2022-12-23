const obj = {};

const description = Object.create(null);
description.value = 1;
Object.defineProperty(obj, "key", description);

obj.key = 2;
console.log(JSON.stringify(obj));
console.log(obj.key);

// demo 失败的情况
let bValue = 38;
Object.defineProperty(obj, "b", {
  get() {
    return bValue;
  },
  set(newValue) {
    bValue = newValue;
  },
  enumerable: true,
  configurable: true,
  value: 1
});
console.log(obj.b);
