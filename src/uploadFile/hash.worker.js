self.importScripts('/static/spark-md5.js');
self.onmessage = function(e) {
  const { fileChunkList } = e.data;
  const spark = new self.SparkMD5.ArrayBuffer();
  let count = 0;
  let percentage = 0;
  fileChunkList.forEach(chunk => {
    spark.append(chunk);

  });
  const loadNext = function(index) {
    const fileReader = new FileReader();
    fileReader.readAsArrayBuffer(fileChunkList[index].file);
    fileReader.onload = e => {
      count += 1;
      spark.append(e.target.result);

      if (count == fileChunkList.length) {
        self.postMessage({
          percentage: 100,
          hash: spark.end()
        });
      } else {
        percentage += 100 / fileChunkList.length;
        self.postMessage({
          percentage: percentage.toFixed(2),
        });
        loadNext(count);
      }
    }
  }
  loadNext(0);
}
