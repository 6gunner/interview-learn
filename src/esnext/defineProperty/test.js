// 测试description默认值
const obj = {};
Object.defineProperty(obj, "test1", {
  value: 1
});
console.log(JSON.stringify(obj)); // 应该打印一个空的
console.log(obj.test1);
obj.test1 = 2; // 应该没法改变
console.log(obj.test1);
delete obj.test1; // 不能删除
console.log(obj.test1);

const description = Object.create(null);
description.value = 1;
Object.defineProperty(obj, "key", description);

obj.key = 2;
console.log(JSON.stringify(obj));
console.log(obj.key);
