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
      // demo1
      const uInt8Array = new Uint8Array(new ArrayBuffer(10));
      for (let i = 0; i < uInt8Array.length; ++i) {
        uInt8Array[i] = i * 2; // [0, 2, 4, 6, 8,...]
      }
      worker.postMessage(uInt8Array);
      worker.onmessage = function (e) {
        console.log(e.data);
      }

      // demo2
      const arrayBuffer = new ArrayBuffer(1);
      worker.postMessage(arrayBuffer, [arrayBuffer]);
      arrayBuffer[0] = 1;

      // demo3
      this.worker = worker;
    },
    beforeDestroy() {
      this.worker.terminate();
    }
  }


</script>

