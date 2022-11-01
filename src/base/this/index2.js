var a = 100;
function foo() {
  // ("use strict"); // this是undefined
  // console.log(this.a); //

  console.log(this.a);
}
foo();
