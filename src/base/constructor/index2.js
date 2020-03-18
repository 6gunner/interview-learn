function C() {
  this.name = "keyang";
  this.sayHello = function() {
    return 'Hello' + name;
  }
}
C.prototype.sayHi = function () {
  return 'Hi' + name;
}
console.log(C.__proto__); // Function.prototype
console.log(C.prototype);

var c1 = new C();
var c2 = new C();

console.log(c1.constructor);


console.log(c1.sayHello == c2.sayHello); // false
console.log(c1.sayHi == c2.sayHi); //true
