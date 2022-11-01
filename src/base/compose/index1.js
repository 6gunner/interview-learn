function compose(...fns) {
  let length = fns.length;
  let i = length - 1;

  let result;
  return function f(...args) {
    result = fns[i].call(null, args);
    if (i <= 0) {
      return result;
    }
    i--;
    return f.call(null, result);
  };
}

let fn1 = function() {};
let funcs = [fn1, fn2, fn3, fn4];
let compseFunc = compose(...funcs);
// fn1(fn2(fn3(fn4())));
compseFunc(2);
