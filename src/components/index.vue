<template>
  <div>
    module test
  </div>
</template>

<script>
import Other, { Tab, Table } from "./index";
import * as A from "./index";
export default {
  mounted() {
    this.test();
  },
  methods: {
    test() {
      debugger;
      console.log(A);
      console.log(Other);
      console.log(Tab);
      console.log(Table);
    }
  }
};
</script>

<style></style>
