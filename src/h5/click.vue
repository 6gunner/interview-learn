<template>
  <div class="clickPenetrateDemo">
    <div class="bg" @click="testPenetrate" ref="bg"></div>
    <div class="modal-wrapper" ref="modal">
      <div class="modal">
        <div class="content" @touchstart="cancel">
          sdasdadsa
        </div>
      </div>
    </div>
  </div>
</template>
<script>
const FastClick = require("fastclick");
export default {
  data() {
    return {};
  },
  mounted() {
    // debugger;
    // const script = document.createElement("script");
    // script.type = "text/javascript";
    // document.querySelector("head").appendChild(script);
    // script.onload = () => {
    FastClick.attach(document.body, {});
    // };
    // script.src =
    //   "https://cdn.jsdelivr.net/npm/fastclick@1.0.6/lib/fastclick.min.js";
  },
  methods: {
    cancel(e) {
      // setTimeout(() => {
      //   this.hideModal();
      // }, 350);
      this.hideModal();
      // const bgRef = this.$refs.bg;
      // bgRef.style.pointerEvents = "none";
      // setTimeout(() => {
      //   debugger;
      //   bgRef.style.pointerEvents = "";
      // }, 350);
    },
    confirm() {},
    hideModal() {
      debugger;
      this.$refs.modal.style.display = "none";
    },
    testPenetrate() {
      alert("我被触发了..");
    }
  }
};
</script>
<style>
.clickPenetrateDemo {
  width: 100%;
  height: 100%;
  position: relative;
}
.bg {
  background: #cedede;
  width: 100%;
  height: 100%;
}
.modal-wrapper {
  position: fixed;
  z-index: 1;
  top: 0;
  bottom: 0;
  left: 0;
  right: 0;
  text-align: center;
  background: rgba(0, 0, 0, 0.2);
  display: flex;
  align-items: center;
}
.modal {
  position: relative;
  margin: 0 auto 50px;
  background: #fff;
  border-radius: 2px;
  box-shadow: 0 1px 3px rgb(0 0 0 / 30%);
  box-sizing: border-box;
  width: 50%;
}

.content {
  height: 200px;
}
</style>
