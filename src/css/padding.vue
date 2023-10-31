<!-- 一个空 div，padding-top: 100%; background: red; 会显示什么？ -->
<template>
  <div class="main">
    <div id="a"></div>
  </div>
</template>
<script>
export default {
  data() {
    return {};
  }
};
</script>
<style scoped>
.main {
  background: #fff;
  /* width: 200px; */
  height: 40px;
  border: 1px solid;
}

#a {
  width: 100px;
  padding-top: 100%;
  background: red;
}

</style>
