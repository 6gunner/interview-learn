<template>
  <div id="app">
    <h2>Essential Links</h2>
    <input type="file" name="file" v-on:change="onupload"/>
    <button v-on:click="upload"> 上传</button>
    <h3>总进度</h3>
    <div class="progress_wrapper">
      <div class="progress_inner" :style="{
          width: progress,
        }"></div>
      <span>{{progress}}</span>
    </div>
    <h3>子进度</h3>
    <div class="child_progress_wrapper" v-for="(item, index) in data"
         :key="index">
      <span>{{item.hash}}</span>
      <div
        class="child_progress_inner"
        :style="{
          width: item.progress + '%',
        }">
      </div>
      <span>{{item.progress}}%</span>
    </div>
  </div>
</template>

<script>
  import axios from 'axios';
  import qs from 'qs';

  export default {
    name: 'app',
    data() {
      return {
        file: null,
        data: [],
      }
    },
    mounted() {

    },
    computed: {
      progress() {
        if (!this.file || !this.data.length) return 0;

        const uploadedSize = this.data.reduce((prev, curr) => {
          return prev + curr.loaded;
        }, 0);
        console.log(uploadedSize);
        return (uploadedSize / this.file.size * 100).toFixed(2) + '%';
      }
    },
    methods: {
      onupload(event) {
        const files = event.target.files;
        this.file = files[0];
      },
      _createChunks() {
        const file = this.file;
        const chunkLength = Math.ceil(file.size / 1048576);
        const chunks = [];
        const chunkSize = Math.ceil(file.size / chunkLength);
        let cur = 0;
        while (cur < file.size) {
          chunks.push({
            file: file.slice(cur, cur + chunkSize),
            filename: file.name,
          });
          cur += chunkSize;
        }
        return chunks;
      },
      async upload() {
        const chunks = this._createChunks();
        this.data = chunks.map(({file, filename}, index) => ({
          chunk: file,
          index,
          hash: `${filename}-${index}`,
          filename,
          loaded: 0,
          percentage: 0
        }));
        await this._uploadChunks();
      },
      async _uploadChunks() {
        const promises = this.data.map((item, key) => {
          const formData = new FormData();
          formData.append('chunk', item.chunk);
          formData.append('hash', item.hash);
          formData.append("filename", item.filename);
          return formData
        }).map((formData, index) => {
          return axios({
            url: 'file/v1/uploadChunks',
            method: 'post',
            baseURL: '/api',
            data: formData,
            onUploadProgress: this.createUploadHandler(index)
          });
        });
        await Promise.all(promises);
        await this.mergeRequest();
      },
      async mergeRequest() {
        await axios({
          url: 'file/v1/mergeChunks',
          method: 'post',
          baseURL: '/api',
          data: qs.stringify({
            filename: this.file.name,
          }),
        })
      },
      createUploadHandler(index) {
        return (e) => {
          // 记录每一块的进度
          const progress = Math.ceil(e.loaded / e.total) * 100;
          this.data[index].progress = progress;
          this.data[index].loaded = e.loaded;
        }
      }
    }
  }
</script>

<style>
  #app {
    font-family: 'Avenir', Helvetica, Arial, sans-serif;
    -webkit-font-smoothing: antialiased;
    -moz-osx-font-smoothing: grayscale;
    text-align: center;
    color: #2c3e50;
    width: 80%;
    margin: 60px auto 0;
  }

  h1, h2 {
    font-weight: normal;
    text-align: center;
  }

  ul {
    list-style-type: none;
    padding: 0;
  }

  li {
    display: inline-block;
    margin: 0 10px;
  }

  a {
    color: #42b983;
  }

  h3 {
    text-align: left;
  }

  .progress_wrapper {
    width: 100%;
    margin: 20px 0;
    background: transparent;
    border-radius: 5px;

    display: flex;
    flex-direction: row;
    align-content: center;
  }

  .progress_inner {
    border: 1px solid transparent;
    background: #42b983;
    height: 5px;
    border-radius: 5px;
    display: inline-block;
    align-self: center;
  }

  .progress_inner + span {
    float: right;
  }

  .child_progress_wrapper {
    width: 40%;
    margin: 20px 0;
    background: transparent;
    border-radius: 5px;

    display: flex;
    flex-direction: row;
    align-content: center;
  }

  .child_progress_inner {
    border: 1px solid transparent;
    background: #52f1f0;
    height: 5px;
    border-radius: 5px;
    display: inline-block;
    align-self: center;
  }

  .child_progress_inner + span {
    float: right;
  }
</style>
