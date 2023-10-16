var a = 100;
function foo() {
  // ("use strict"); // this是undefined
  console.log(this.a);
}
foo(); // 100 打印的是window.a
