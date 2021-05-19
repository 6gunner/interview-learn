<template>
  <div>
    这个demo，要把file、filereader、blob、arrayBuffer这些东西一次性弄明白
    <div class="block">
      读取文件，转化为BlobURL
      <input type="file" multiple @change="showFileList" />
      <div class="info" v-show="files !== null">
        <a v-for="(file, index) in fileList" :href="file.link" :key="index">{{
          file.name
        }}</a>
      </div>
    </div>

    <div class="block">
      利用FileReader读取并且展示文本
      <input type="file" @change="showFileText" />
      <div class="info">
        {{ text }}
      </div>
    </div>

    <div class="block">
      利用FileReader读取并且展示base64
      <input type="file" @change="showFileBase64" />
      <div class="info">
        {{ base64 }}
      </div>
    </div>

    <div class="block">
      用base64反算出Blob对象
      <div class="info">
        <img :src="blobUrl" alt="" />
        {{ blob.size }}
        {{ blob.type }}
      </div>
    </div>

    <div class="block">
      blob对象的创建
      <a :href="blobLink" download="blob">blob</a>
    </div>
  </div>
</template>
<script>
/**
 * base64 data:image/png;base64,xxxxxx
 */
function base64ToBlob(base64, fileType) {
  fileType = fileType || base64.split(",")[0].match(/^data:(\w+\/\w+);\w+/);
  const bytes = window.atob(base64.split(",")[1]); // 解码base64
  const arrayByffer = new ArrayBuffer(bytes.length);
  const unit8Array = new Uint8Array(arrayByffer);
  for (let i = 0; i < bytes.length; i++) {
    unit8Array[i] = bytes.charCodeAt(i);
  }
  return new Blob([unit8Array], { type: fileType });
}

export default {
  data() {
    return {
      files: null,
      fileList: [],
      text: "",
      baes64: "",
      blob: {},
      blobUrl: "",
      blobLink: null
    };
  },
  mounted() {
    const blob = new Blob(['<a id="a"><b id="b">hey!</b></a>'], {
      type: "text/html"
    });
    console.log(blob);
    const link = URL.createObjectURL(blob);
    this.blobLink = link;
  },
  computed: {},
  methods: {
    showFileText(e) {
      const fileList = e.target.files;
      let file = fileList[0];
      const reader = new FileReader();
      reader.onload = e => {
        console.log(e.target.result);
        this.text = e.target.result;
      };
      reader.readAsText(file);
    },
    showFileBase64(e) {
      const fileList = e.target.files;
      let file = fileList[0];
      const reader = new FileReader();
      reader.onload = e => {
        debugger;
        console.log(e.target.result);
        this.base64 = e.target.result;
        // this.blob = base64ToBlob(this.base64, file.type);
        this.blob = base64ToBlob(this.base64);
        this.blobUrl = URL.createObjectURL(this.blob);
      };
      reader.readAsDataURL(file);
    },
    showFileList(e) {
      this.files = e.target.files;
      const fileList = [];
      for (let i = 0; i < this.files.length; i++) {
        const file = this.files[i];
        const dataUrl = URL.createObjectURL(file);
        fileList.push({
          name: file.name,
          link: dataUrl
        });
      }
      this.fileList = fileList;
    }
  }
};
</script>

<style>
.block {
  width: 300px;
  height: 200px;
  border: 1px solid #ccc;
}

.info {
  display: flex;
  flex-direction: column;
  flex-wrap: wrap;
  height: 150px;
  overflow: auto;
}
.info a {
  display: inline-block;
  color: blue;
  cursor: pointer;
}
.info img {
  width: 50px;
  height: 50px;
  margin: 5px;
}
</style>
