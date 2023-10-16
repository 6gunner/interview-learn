// css3的一些整理
<template>
  <div>
    <div class="sand-box1">
      这里是border-radius的相关属性
      <div class="border-radius-test"></div>
    </div>
    <div class="sand-box2">
      这里是border-shadow的相关属性
      <div class="border-shadow-test"></div>
    </div>
    <div class="sand-box3">
      这是vertical-align的相关属性
      <div class="wrap">
        <img src="/static/img.jpeg" alt="" />
      </div>
      <div class="wrap">
        <img src="/static/img.jpeg" alt="" />
        <span style="display:inline-block;background: red; ">xxxxx</span>
      </div>
      <div class="wrap">
        <span></span>
        <span>我有内容</span>
      </div>
      <div class="wrap" style="height:200px;">
        <img src="/static/img.jpeg" alt="" />
        x
      </div>

      <div class="wrap" style="height:200px;text-align:center;">
        <img src="/static/img.jpeg" alt="" />
        x
        <span
          style="display:inline-block;height:100%;width:0;vertical-align:middle;font-size:0;"
        ></span>
      </div>
    </div>
    <div class="sand-box4">
      测试line-height
      <div class="div div1">
        我是一行有fontSize但是line-height为0的文字
      </div>
      <div class="div div2">
        我是一行fontSize=0,但是line-height为100px的文字
      </div>
      <div class="div div3">我是一行有fontSize，且line-height为100px的文字</div>
      <div class="div div4">
        我是父级元素，我的font-size为16，我的行高为150%；
        <div class="div-child">
          我是子元素，我的font-size为40,我继承了line-height
        </div>
      </div>
      <div class="div div5">
        我是父级元素，我的font-size为16，我的行高为1.5；
        <div class="div-child">
          我是子元素，我的font-size为40,我继承了line-height
        </div>
      </div>
      <div class="div div6">
        我是父级元素，我的font-size为16，我的行高为1.5em；
        <div class="div-child">
          我是子元素，我的font-size为40,我继承了line-height
        </div>
      </div>
    </div>
    <div class="text">
      The noak and the barcicle
    </div>
    <div class="multi-bg"></div>
    <div class="text-overlow">
      "Is there any tea on this spaceship?" he asked.
    </div>
    <div class="transform-box">
      <div class="transform transform1"></div>
      <div class="transform transform2"></div>
      <div class="transform transform3"></div>
    </div>
    <div class="transistion-box">
      <div class="transistion transistion1"></div>
    </div>

    <div class="scroll-box">
      <div class="scroll-inner-box"></div>
    </div>
  </div>
</template>
<script>
export default {};
</script>
<style>
.border-radius-test {
  height: 200px;
  width: 200px;
  border: 1px solid red;
  border-radius: 30px/10px;
  /* -webkit-border-radius: 30px 10px; */
}

.border-shadow-test {
  height: 200px;
  width: 200px;
  padding: 10px;
  border: 10px dashed #beceeb;
  background: yellow;
  box-shadow: inset 5px 5px 10px black;
}

.sand-box3 .wrap {
  background: #249ff1;
  margin-top: 10px;
}

.sand-box3 .wrap span {
  background: red;
  display: inline-block;
  width: 100px;
  height: 50px;
}

.sand-box3 .wrap img {
  width: 50px;
  height: 50px;
}

.sand-box3 .vdiv img {
  width: 50px;
  height: 50px;
}
.sand-box3 .vdiv2 {
  display: block;
  height: 100px;
  line-height: 40px;
  width: 400px;
  border: 1px solid #ccc;
  vertical-align: middle;
}

.sand-box4 {
}
.div {
  background: #f0f0f0;
  border: 1px solid #e0e0e0;
  margin: 10px;
}
.div1 {
  font-size: 16px;
  line-height: 0;
}
.div2 {
  font-size: 0;
  line-height: 100px;
}
.div3 {
  font-size: 16px;
  line-height: 100px;
}
.div4 {
  font-size: 16px;
  line-height: 150%;
}

.div5 {
  font-size: 16px;
  line-height: 1.5;
}

.div6 {
  font-size: 16px;
  line-height: 1.5em;
}

.div .div-child {
  font-size: 40px;
}

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
.transform {
  background-color: chartreuse;
  width: 100px;
  height: 100px;
}
.transform1 {
  transform: translate(30px, 20px);
  transform: rotateZ(-180deg) translate3D(0, 0, 0);
}
.transform2 {
  transform: scale(0.5);
}
.transform3 {
  transform: rotate(45deg);
}
.transistion {
  background-color: chartreuse;
  width: 100px;
  height: 100px;
  margin-top: 50px;
}
.transistion1 {
  transition: transform 200ms cubic-bezier(0.18, 0.89, 0.32, 1.28) 50ms,
    width 1000ms ease-in-out 0ms;
}
.transistion1:hover {
  transform: translate(30px, 0px);
  width: 300px;
  visibility: hidden;
}
.scroll-box {
  width: 300px;
  height: 200px;
  /* height: 100%; */
  /* height: auto; */
  /*or 100%.  if set 'auto'， no smooth scrolling on iOS*/
  border: 1px solid rebeccapurple;
  overflow-y: scroll; /* has to be scroll, not auto */
  -webkit-overflow-scrolling: touch;
  padding: 20px;
}
.scroll-inner-box {
  height: 500px;
  width: 200px;
  background-color: salmon;
}
</style>
