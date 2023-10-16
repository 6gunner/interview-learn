// 箭头函数的this不会被改变
function foo() {
  return a => {
    console.log(this.a);
  };
}

const obj1 = {
  a: 1
};

const obj2 = {
  a: 2
};

const obj3 = {
  a: 3
};

const bar = foo.call(obj1);
bar.call(obj2); // 打印出1
