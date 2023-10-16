function foo(a) {
  this.a = a;
}

const obj1 = {};

var bar = foo.bind(obj1);
bar(3);
console.log(obj1.a); // 3
console.log(obj1.a); // 3

var baz = new foo(5);
console.log(baz.a); // 5
