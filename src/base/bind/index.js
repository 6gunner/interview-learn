// 自己实现一个bind方法

// 思路：
// 1、利用apply或者call来实现context的绑定
// 2、注意处理好参数, 避免返回的参数的丢失
// 3、兼容new关键字
// 4、
Function.prototype.bindFn = function(context) {};
