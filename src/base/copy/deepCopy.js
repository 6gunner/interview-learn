function deepCloe1(obj) {
  return JSON.parse(JSON.stringify(obj));
}

const obj1 = {
  key1: {
    name1: 'name1',
    value1: 'value1'
  },
  key2: [{
    name2: 'name2',
    value2:'value2'
  }],
  key3: function() {
    return 1;
  },
  key4: new RegExp(/regex/g),
}
let obj2 = deepCloe1(obj1);
console.log(obj2);


function deepClone2(obj) {
  let target;
  if (obj.constructor == Object) {
    target = {};
  } else if (obj.constructor == Array) {
    target = [];
  } else {
    target = obj;
  }
  for (let key in obj) {
    if (obj.hasOwnProperty(key)) {
      const value = obj[key];
      if (obj.constructor == Object || obj.constructor == Array) {
        target[key] = deepClone2(value);
      } else {
        target[key] = value;
      }
    }
  }
  return target;
}

let obj3 = deepClone2(obj1);
obj1.key1.name1 = 'dasfsaa';
console.log(obj1);
console.log(obj3);
