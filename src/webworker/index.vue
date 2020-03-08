<template>
  <div>
  </div>
</template>
<script>
  import Worker from 'worker-loader!./worker.js';

  export default {
    data() {
      return {

      }
    },
    mounted() {
      const worker = new Worker();
      this.worker = worker;
      worker.onmessage = function (e) {
        console.log(e.data);
      }

      // demo1 发送二进制
      const uInt8Array = new Uint8Array(new ArrayBuffer(10));
      for (let i = 0; i < uInt8Array.length; ++i) {
        uInt8Array[i] = i * 2; // [0, 2, 4, 6, 8,...]
      }
      worker.postMessage(uInt8Array);

      // demo2 转移arrayBuffer的拥有权
      const arrayBuffer = new ArrayBuffer(8);
      console.log("Index.vue 转移前" + arrayBuffer.byteLength);
      worker.postMessage(arrayBuffer, [arrayBuffer]);
      console.log("Index.vue 转移后" + arrayBuffer.byteLength);

      // demo3
      const message = "普通message";
      worker.postMessage(message);

    },
    beforeDestroy() {
      this.worker.terminate();
    }
  }


</script>

