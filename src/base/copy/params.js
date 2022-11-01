// 参数传递
let foo = 1;
const test1 = val => {
  val = 2;
  console.log(val);
};
test1(foo);
console.log(foo); // 上面会打印的是1；

foo = { a: 1 };
const test2 = val => {
  val.a = 2;
  console.log(val.a);
};
test2(foo);
console.log(foo); // 上面会打印的是{a:2};

foo = { a: 1 };
const test3 = val => {
  val = 2;
  console.log(val);
};
test3(foo);
console.log(foo); // 上面会打印的还是{a:1};
