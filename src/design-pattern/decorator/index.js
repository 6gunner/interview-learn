@testable
class MyTestableClass1 {
	// ...
}

function testable(target, key, descriptor) {
	target.isTestable = true;
}

console.log(MyTestableClass1.isTestable);


function setTestable(isTestable) {
	return function (target) {
		target.isTestable = isTestable;
	}
}

@setTestable(false)
class MyTestableClass2 {
	// ...
}

console.log(MyTestableClass2.isTestable);


class C {
	@enumable(false)
	method1() {

	}
	@enumable(true)
	method2() {

	}
}

function enumable(value) {
	return (target, key, descriptor) => {
		descriptor.enumerable = value;
		return descriptor;
	}
}

for (let key in C.prototype) {
	console.log(key);
}


// 装饰方法、属性
class MyClass {
	@log
	add(a, b) {
		return a + b;
	}
}

function log(target, name, descriptor) {
	const old = descriptor.value;
	descriptor.value = function () {
		console.log(`${name}方法被调用，参数为${JSON.stringify(arguments)}`);
		return old.apply(this, arguments);
	}
}

const demo = new MyClass();
const result = demo.add(1, 2);
console.log('result', result);
