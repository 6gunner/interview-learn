<template>
  <div>
    我是parent
    <child name=""></child>
  </div>
</template>
<script>
import Child from "./child";
export default {
  components: {
    Child
  }
};
</script>

<style></style>
