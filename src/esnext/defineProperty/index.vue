<template>
  <div>
    defineProperty
  </div>
</template>

<script>
export default {
  mounted() {
    // this.test1();
    this.test2();
  },

  methods: {
    test1() {
      // 测试description默认值
      const obj = {};
      Object.defineProperty(obj, "test1", {
        value: 1
      });
      try {
        console.log(JSON.stringify(obj)); // 应该打印一个空的
        console.log(obj.test1);
        // obj.test1 = 2; // TypeError: Cannot assign to read only property 'test1' of object '#<Object>'
        // console.log(obj.test1);
        delete obj.test1; // TypeError: Cannot delete property 'test1' of #<Object>
        console.log(obj.test1);
      } catch (error) {
        console.warn(error);
      }
    },

    test2() {
      const obj = {};
      let bValue = 38;
      Object.defineProperty(obj, "b", {
        get() {
          return bValue;
        },
        // value: 1,
        writable: true,
        enumerable: true,
        configurable: true
      });
      console.log(obj.b);
    }
  }
};
</script>

<style></style>
