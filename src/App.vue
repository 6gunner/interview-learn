<template>
  <div id="app">
    <img src="./assets/logo.png">
    <h1>{{ msg }}</h1>
    <h2>Essential Links</h2>
    <ul>
      <input type="file" name="file" v-on:change="onupload"/>
      <button v-on:click="upload"> 上传</button>
    </ul>
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
      }
    },
    mounted() {

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
          });
          cur += chunkSize;
        }
        return chunks;
      },
      async upload() {
        const chunks = this._createChunks();
        const fileName = this.file.name;
        const formDatas = chunks.map((item, key) => {
          const formData = new FormData();
          formData.append('chunk', item.file);
          formData.append('hash', `${fileName}-${key}`);
          formData.append("filename", this.file.name);
          return formData
        });
        const promises = formDatas.map((formData) => {
          return axios({
            url: 'file/v1/uploadChunks',
            method: 'post',
            baseURL: '/api',
            data: formData
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
    margin-top: 60px;
  }

  h1, h2 {
    font-weight: normal;
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
</style>
