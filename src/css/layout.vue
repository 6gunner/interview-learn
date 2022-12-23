<template>
  <div>
    css-learn
    <router-view></router-view>
  </div>
</template>

<script>
export default {
  mounted() {
    console.log("我被加载了");
  }
};
</script>
