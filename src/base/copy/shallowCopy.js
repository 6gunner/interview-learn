var baseArray1 = [1, 2, 3, 4, 5];
var baseArray2 = baseArray1.slice(0);

console.log(baseArray1 == baseArray2); // false

// 误区
var obj1 = {};
var obj2 = {};

var referenceArray1 = [obj1, obj2];
var referenceArray2 = referenceArray1.slice(0);
console.log(referenceArray2 == referenceArray1); // false
referenceArray1[0][name] = "test1";
referenceArray2[0][name] = "test2";
console.log(referenceArray2[0][name]);
console.log(referenceArray1[0][name]);


