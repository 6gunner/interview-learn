参考文章：https://juejin.im/post/5dff8a26e51d4558105420ed?utm_source=gold_browser_extension#heading-18

断点续传：
> 原理
服务端需要记住已上传的切片
>
步骤：
- 1.切片
- 2.利用webworker来生成md5
- 3.上传时传入md5值，通过md5值来确认是否已经上传
- 4.改造上传代码，将切片请求缓存起来，用来取消


关键代码：
- 将文件切片
````
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
````

- 利用SparkMd5
```js
const spark = new SparkMD5.ArrayBuffer();
const fileReader = new FileReader();
// 当前chunk数量
let currentChunk = 0;
fileReader.onload = function (e) {
    spark.append(e.target.result);                   // Append array buffer
    currentChunk++;
    // chunks表示总大小
    if (currentChunk < chunks) {
        loadNext();
    } else {
        console.log('finished loading');
        console.info('computed hash', spark.end());  // Compute hash
    }
};

function loadNext() {
  let start = currentChunk * chunkSize;
  let end = ((start + chunkSize) >= file.size) ? file.size : start + chunkSize;

  fileReader.readAsArrayBuffer(blobSlice.call(file, start, end));
}

```
- 通过axios来进行取消操作；

#### 总结

- 文件续传的时候，vue无法监听到后面子item进度条的变化，应该是写法有问题，data的属性变化vue应该没监听到；
- 文件续传的时候，总进度条不能达到100%。 应该也是计算有问题；


