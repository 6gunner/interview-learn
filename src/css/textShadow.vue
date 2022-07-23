<template>
  <div>
    <div class="text">
      The noak and the barcicle
    </div>
    <div class="multi-bg"></div>
    <div class="text-overlow">
      "Is there any tea on this spaceship?" he asked.
    </div>
  </div>
</template>
<script>
export default {
  data() {
    return {};
  }
};
</script>
<style>
.text {
  text-shadow: 0.2em 0.5em 0.1em #600, -0.3em 0.1em 0.1em #060,
    0.4em -0.3em 0.1em #006;
}
.multi-bg {
  margin-top: 30px;
  width: 100%;
  height: 200px;
  background-image: url(https://mdn.mozillademos.org/files/11305/firefox.png),
    url(https://mdn.mozillademos.org/files/11307/bubbles.png),
    linear-gradient(to right, rgba(30, 75, 115, 1), rgba(255, 255, 255, 0));
  background-repeat: no-repeat, no-repeat, no-repeat;
  background-position: bottom right, left, right;
}
.text-overlow {
  margin-top: 50px;
  width: 200px;
  line-height: 50px;
  background-color: #e5e8fc;
  overflow: hidden;
  white-space: nowrap;
  padding: 0 0.5em;
  text-overflow: clip;
}
</style>
