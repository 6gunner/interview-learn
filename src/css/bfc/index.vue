<template>
  <div>
    <fieldset>
      <legend>
        margin折叠
      </legend>
      <div class="content">
        <div class="boxA"></div>
        <div class="boxBWrapper">
          <div class="boxB"></div>
        </div>
      </div>
    </fieldset>
    <fieldset>
      <legend>
        高度计算在内
      </legend>
      <div class="content floatDivBox">
        <div class="floatDiv"></div>
      </div>
    </fieldset>
    <fieldset>
      <legend>
        不会重叠
      </legend>
      <div class="content">
        <div class="left"></div>
        <div class="right"></div>
      </div>
    </fieldset>
  </div>
</template>
<script>
export default {};
</script>

<style>
.content {
  width: 600px;
  position: relative;
  border: 2px solid red;
}

.boxA {
  margin: 40px;
  width: 80px;
  height: 120px;
  background: blue;
}
.boxB {
  margin: 40px;
  width: 80px;
  height: 40px;
  background: blue;
}
.boxBWrapper {
  overflow: hidden;
}

.left {
  width: 80px;
  height: 120px;
  float: left;
  background: blue;
}

.right {
  height: 200px;
  background: yellow;
  /* 创造出bfc */
  overflow: hidden;
}

.floatDivBox {
  overflow: hidden;
}
.floatDiv {
  float: right;
  width: 600px;
  height: 200px;
  background: rgb(0, 255, 0);
}
</style>
