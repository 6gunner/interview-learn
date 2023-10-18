<template>
  <span>判断js数据类型的方法</span>
</template>

<script>
export default {
  data() {
    return {};
  },
  mounted() {
    const obj = {};
    const nullObj = null;
    const undefinedObj = undefined;
    const funcObj = () => {};
    const symbol = Symbol("1");
    const array1 = [];
    const date = new Date();
    const number = new Number(1);
    const number2 = 2;

    console.log(typeof obj);
    console.log(typeof nullObj);
    console.log(typeof undefinedObj);
    console.log(typeof funcObj);
    console.log(typeof symbol);
    console.log(typeof array1);
    console.log(typeof date);
    console.log(typeof number);
    console.log(typeof number2);

    console.log("隔===========");
    console.log(array1 instanceof Array);
    console.log(date instanceof Date);
    console.log(funcObj instanceof Function);

    console.log("隔===========");
    console.log(Object.prototype.toString.call(undefinedObj));
    console.log(Object.prototype.toString.call(date));
    console.log(Object.prototype.toString.call(null));
    console.log(Object.prototype.toString.call(number));
    console.log(Object.prototype.toString.call(number2));
    console.log(Object.prototype.toString.call(funcObj));
    console.log(Object.prototype.toString.call(symbol));
  }
};
</script>

<style></style>
