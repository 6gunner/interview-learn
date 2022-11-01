'use strict';
function plus(n){
  function add() {
    var arg = [];
    var _add = function() {
      arg = arg.concat(Array.prototype.slice.call(arguments));
      return _add;
    }
    _add.toString = function () {
      return arg.reduce((previousValue, currentValue) => {
        return previousValue + currentValue;
      }, 0);
    }
    return _add;
  }
  return add()(n);
}

// function plus(n) {
//   var sum = n;
//   function add(m) {
//     sum += m;
//     return add;
//   }
//   add.toString = function () {
//     return sum;
//   }
//   return add;
// }
console.log(plus(0).toString());
console.log(plus(1)(2)(3).toString());

module.exports = plus
