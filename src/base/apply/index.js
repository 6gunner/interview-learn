// 自己实现一个apply函数 Function.prototype.applyFn = function (targetObject, targetArrays) {}

// 思路：
// 1、因为我们最终想让函数运行时，this指向targetObject。所以可以先将方法附到targetObject属性上
// 2、运行完方法后，将属性删除
// 3、注意要保证key的唯一性，建议用Symbol来保证唯一性
