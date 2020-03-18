function Foo () {
  this.id = Math.random()
}

Foo.prototype.doFoo = function () {
  console.log('Foo!')
}

function Boo() {
  this.something = 5;
}
Boo.prototype = new Foo();

var boo1 = new Boo();
var boo2 = new Boo();
console.log(boo1.id); // 0.5933014075158305
console.log(boo2.id); // 0.5933014075158305

function Boo2(){
  Foo.call(this); // set unique `id` on `this`
  this.something =5;
}
// Boo2.prototype = new Foo();
// 区别在于，Object.create的对象，是没有id属性的
Boo2.prototype = Object.create(Foo.prototype);
var boo2_1 = new Boo2();
var boo2_2 = new Boo2();
console.log(boo2_1.id); // 0.6992281125973856
console.log(boo2_2.id); // 0.8822564238032726

