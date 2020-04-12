class SingleInstance {
}

SingleInstance.getInstance = (function () {
	let instance
	return function () {
		if (instance) {
			return instance
		}
		instance = new SingleInstance()
		return instance
	};
})();

const is1 = SingleInstance.getInstance()
const is2 = SingleInstance.getInstance()
console.log(is1 == is2)
