<template>
  <div id="app">
    <h2>Essential Links</h2>
    <input type="file" name="file" v-on:change="onupload"/>
    <button v-on:click="upload"> 上传</button>
    <button v-on:click="pause" v-if="!paused"> 暂停</button>
    <button v-on:click="resume" v-else> 恢复</button>
    <h3>计算文件hash</h3>
    <div class="progress_wrapper">
      <div class="progress_inner" :style="{
          width: fakeUploadPercentage + '%',
        }"></div>
      <span>{{fakeUploadPercentage + '%'}}</span>
    </div>
    <h3>总进度</h3>
    <div class="progress_wrapper">
      <div class="progress_inner" :style="{
          width: uploadPercentage + '%',
        }"></div>
      <span>{{uploadPercentage + '%' }}</span>
    </div>
    <h3>上传情况</h3>
    <div class="child_progress_title">
      <span>文件切片名称</span>
      <span>文件切片大小(kb)</span>
      <span>文件切片进度</span>
    </div>
    <div v-for="(item, index) in data"
         class="child_progress_container"
         :key="index">
      <span>{{item.hash}}</span>
      <span>{{Math.ceil(item.chunk.size / 1024)}}</span>
      <div class="child_progress_wrapper">
        <div
          class="child_progress_inner"
          :style="{
          width: item.progress + '%',
        }">
        </div>
        <span>{{item.progress}}%</span>
      </div>

    </div>
  </div>
</template>

<script>
  import axios from 'axios';
  import qs from 'qs';
  import Worker from './hash.worker';

  export default {
    name: 'app',
    data() {
      return {
        file: null,
        hash: null,
        uploading: false,
        paused: false,
        data: [],
        hashPercentage: 0,
        fakeUploadPercentage: 0,
      }
    },
    mounted() {

    },
    computed: {
      uploadPercentage() {
        if (!this.file || !this.data.length) return 0;
        const uploadedSize = this.data.reduce((prev, curr) => {
          return prev + curr.loaded;
        }, 0);
        return Math.floor(uploadedSize / this.file.size * 100)
      },
    },
    watch: {
      uploadPercentage(now) {
        if (now > this.fakeUploadPercentage) {
          this.fakeUploadPercentage = now;
        }
      }
    },
    methods: {
      pause() {
        if (this.source) {
          this.source.cancel();
          this.paused = true;
        }
      },
      async resume() {
        const ret = await this._verifyUpload(this.file.name, this.hash);
        const {shouldUpload, uploadedList} = ret.data;
        if (shouldUpload) {
          await this._uploadChunks(uploadedList);
        }
      },
      onupload(event) {
        const files = event.target.files;
        this.file = files[0];
        this.reset();
      },
      _createChunks() {
        const file = this.file;
        const perChunkSize = 1048576; // 每个是1M 1024 * 1024
        const chunkLength = Math.ceil(file.size / perChunkSize);
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
      _createHash(fileChunkList) {
        const _this = this;
        return new Promise((resolve) => {
          const worker = new Worker();
          worker.postMessage({fileChunkList});
          worker.onmessage = function (e) {
            const {percentage, hash} = e.data;
            _this.hashPercentage = percentage;
            if (hash) {
              resolve(hash);
            }
          }
        });

      },

      /**
       * 页面重置
       */
      reset() {
        this.uploading = false;
        this.data = [];
        this.hashPercentage = 0;
        this.hash = null;
      },
      async upload() {
        this.uploading = true;
        const chunks = this._createChunks();
        const hash = await this._createHash(chunks);
        this.hash = hash;
        const ret = await this._verifyUpload();
        const {shouldUpload, uploadedList} = ret.data;
        if (shouldUpload) {
          this.data = chunks.map(({file, filename}, index) => ({
            chunk: file,
            index,
            hash: `${hash}-${index}`,
            filename,
            loaded: 0,
            percentage: uploadedList.indexOf(`${hash}-${index}`) > -1 ? 100 : 0,
          }));
          await this._uploadChunks();
        } else {
          alert('秒传：上传成功');
        }
      },
      async _uploadChunks(uploadedList = []) {
        console.log(uploadedList);
        this.paused = false;
        const CancelToken = axios.CancelToken;
        const source = CancelToken.source();
        this.source = source;
        const promises = this.data
          .filter(({hash}) => !uploadedList.includes(hash))
          .map((item) => {
            const formData = new FormData();
            formData.append('chunk', item.chunk);
            formData.append('hash', item.hash);
            formData.append("filename", item.filename);
            return {formData, index: item.index}
          }).map(({formData, index}) => {
            console.log(index);
            return axios({
              url: 'file/v1/uploadChunks',
              method: 'post',
              baseURL: '/api',
              data: formData,
              onUploadProgress: this.createUploadHandler(this.data[index]),
              cancelToken: source.token
            });
          });
        await Promise.all(promises);
        if (uploadedList.length + promises.length === this.data.length) {
          await this.mergeRequest();
        }
        // await this.mergeRequest();
      },
      async mergeRequest() {
        await axios({
          url: 'file/v1/mergeChunks',
          method: 'post',
          baseURL: '/api',
          data: qs.stringify({
            filename: this.file.name,
            hash: this.hash,
          }),
        })
      },
      createUploadHandler(item) {
        return (e) => {
          // 记录每一块的进度
          const progress = Math.floor(e.loaded / e.total) * 100;
          item.progress = progress;
          item.loaded = e.loaded;
        }
      },
      async _verifyUpload(filename, hash) {
        return axios({
          url: 'file/v1/verifyUpload',
          method: 'post',
          baseURL: '/api',
          data: qs.stringify({
            filename: this.file.name,
            hash: this.hash,
          })
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
    align-items: center;
    position: relative;
  }

  .progress_inner {
    border: 1px solid transparent;
    background: #42b983;
    height: 5px;
    border-radius: 5px;
    display: inline-block;
    text-align: left;
  }

  .progress_inner + span {
    position: absolute;
    right: -50px;
  }

  .child_progress_title {
    display: flex;
    justify-content: space-between;
  }

  .child_progress_title span {
    width: 33%;
    text-align: center;
  }

  .child_progress_container {
    display: flex;
    flex-direction: row;
    align-items: center;

  }

  .child_progress_container span {
    margin: 20px 0;
    width: 33%;
    align-items: center;
  }

  .child_progress_wrapper {
    width: 33%;
    margin: 20px 0;
    background: transparent;
    border-radius: 5px;
    display: flex;
    justify-content: space-between;

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
