

// var name = "the window";
// var object = {
//   name : "My Object",
//   getNameFunc : function(){
//     return function(){
//       console.log(this);
//       return this.name;
//     };
//   }
// };
// console.log(object.getNameFunc()());

var name = "window";
var object = {
  name : "My Object",
  getNameFunc : function(){
    var that = this;
    return function(){
      return that.name;
    };
  }
};
console.log(object.getNameFunc()());

function User() {
  var name = "anybody";
  function getName() {
    return name;
  }
  this.getName = getName;
}
var user = new User();
console.log(user.name )// 错误代码
console.log(user.getName());

