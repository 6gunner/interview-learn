async function f1() {
  return '1';
}

function f2() {
  return 2;
}

console.log(f1());
console.log(Promise.resolve('1'));
console.log(new Promise(resolve => {
  resolve('1');
}));
console.log(f2());


