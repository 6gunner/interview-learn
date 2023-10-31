function testFunc(array: Array<Function>): void {
  // todo
}

function sleep(time: number) {
  return new Promise(resolve => {
    setTimeout(resolve, time);
  });
}

testFunc([
  () => console.log(1),
  () => sleep(1000),
  () => console.log(2),
  () => sleep(2000),
  () => console.log(3)
]);
