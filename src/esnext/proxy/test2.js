class Person {
  constructor(name) {
    this.name = name;
  }
}

let proxyPersonClass = new Proxy(Person, {
  // apply是函数调用的捕获
  apply(target, thisArg, argumentsList) {
    console.log(this);
    console.log(thisArg);
    console.log(argumentsList);
    throw new Error(`Function ${target.name} cannot be invoked without 'new'`);
  },
  // construct是构造函数调用的捕获
  construct(target, args) {
    console.log(`Creating a ${target.name}`);
    // console.log(this);
    // console.log(args);
    // expected output: "Creating a monster1"
    return new target(...args);
  }
});

proxyPersonClass("coda");
const person = new proxyPersonClass("gpp");
console.log(person.name);
