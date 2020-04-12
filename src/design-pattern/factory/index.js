class Product {
	constructor(name){
		this.name = name;
	}
	sayHello() {
		console.log("Hello " + this.name);
	}
}
// 创建工厂
function createProduct(name) {
	return new Product(name);
}

createProduct("KeYang").sayHello();


