<!-- 一个未知宽高的父div里有两个子div，他们宽度一个是40%另一个是60%；并且并列着，并列方式不用关心。现给两个子div加一个1px的border，第二个盒子就会被挤下去，求几种解决方案。 -->

<template>
  <div class="main">
    <div id="a"></div>
    <div id="b"></div>
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
  width: 200px;
  height: 40px;
  border: 1px solid;
}

#a {
  /* width: 40%; */
  width: calc(40% - 2px);
  height: 100%;
  border: 1px solid red;
  float: left;
}
#b {
  /* width: 60%; */
  width: calc(60% - 2px);
  height: 100%;
  border: 1px solid green;
  overflow: hidden;
}
</style>
