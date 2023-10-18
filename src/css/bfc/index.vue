<template>
  <div>
    <fieldset>
      <legend>
        margin折叠
      </legend>
      <div class="content bfcDivBox">
        <div class="boxA"></div>
        <div class="boxB"></div>
      </div>
    </fieldset>
    <fieldset>
      <legend>
        子元素float，但是高度不被清除
      </legend>
      <div class="content bfcDivBox">
        <div class="floatDiv"></div>
      </div>
    </fieldset>
    <fieldset>
      <legend>
        自适应两栏
      </legend>
      <div class="content">
        <div class="left"></div>
        <div class="right"></div>
      </div>
    </fieldset>

    <fieldset disabled="disabled">
      <legend>
        不受浮动影响
      </legend>
      <div class="content">
        <img
          src="/static/img.jpeg"
          height="96"
          width="128"
          class="float-left"
        />
        <p class="bfcDivBox">
          好多文字好多文字好多文字好多文字好多文字好多文字好多文字好多文字好多文字好多文字好多文字好多文字好多文字好多文字好多文字好多文字好多文字好多文字....
        </p>
      </div>
    </fieldset>
  </div>
</template>
<script>
export default {};
</script>

<style>
.content {
  width: 400px;
  position: relative;
  border: 2px solid red;
}

.boxA {
  margin: 40px 0;
  width: 80px;
  height: 120px;
  background: blue;
}
.boxB {
  margin: 40px 0;
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

.bfcDivBox {
  overflow: hidden;
  margin-left: 20px;
}
.floatDiv {
  float: right;
  width: 400px;
  height: 200px;
  background: rgb(0, 255, 0);
}

.box {
  margin: 20px;
  background-color: lightgrey;
}

.float-left {
  float: left;
  /* margin-right: 20px; */
}
</style>
