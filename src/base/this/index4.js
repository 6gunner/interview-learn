const obj = {
  fn1: () => console.log(this),
  fn2: function() {
    console.log(this);
  }
};

console.log(obj.fn2.prototype);
obj.fn1();
obj.fn2();

// const x = new obj.fn1();
const y = new obj.fn2();
