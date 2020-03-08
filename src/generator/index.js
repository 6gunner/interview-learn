function* generator1() {
  yield 'hello';
  yield 'world';
  return 'ending';
}
var hw = generator1();
hw.next()// { value: 'hello', done: false }
hw.next()// { value: 'world', done: false }
hw.next()// { value: 'ending', done: true }
hw.next()// { value: undefined, done: true }

function* foo() {
  let response1 = yield fetch('https://xxx') //返回promise对象
  console.log('response1')
  console.log(response1)
  let response2 = yield fetch('https://xxx') //返回promise对象
  console.log('response2')
  console.log(response2)
}

function run(gen) {
  var g = gen();
  function next() {
    var result = g.next();
    if (result.done) {
      return result.value;
    }
    return new Promise(((resolve, reject) => {
      resolve();
    })).then(() => {
      next();
    })
  }
  next();
}

run(generator1);
run(foo);
