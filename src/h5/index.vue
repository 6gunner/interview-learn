<template>
  <div class="wrapper">
    <div class="nav">
      <router-link to="/h5/click">点击穿透</router-link>
    </div>
    <div class="content">
      <router-view></router-view>
    </div>
  </div>
</template>
<script></script>

<style>
.wrapper {
  width: 100%;
  height: 100%;
  display: flex;
  flex-direction: column;
}
.content {
  flex: 1;
}
</style>
