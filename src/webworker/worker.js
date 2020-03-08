// Worker 线程
let cache;
/**
 *
 * @param o1 new
 * @param o2 old
 */
function compare(o1, o2) {
  if(JSON.stringify(o1) != JSON.stringify(o2)) {
    return false;
  }
  // todo，更深的比较
  return true;
};

setInterval(function () {
  fetch('/api/quote/v1/rates?tokens=BTC,USDT,BUSDT&legalCoins=BTC,USDT,CNY,USD').then(function (res) {
    return res.json();
  }).then(({ data }) => {
    if (!compare(data, cache)) {
      cache = data;
      self.postMessage(data);
    }
  })
}, 5000);

self.addEventListener('message', event => {
  console.log(event.data);
  if (event.data.constructor == ArrayBuffer) {
    const data = event.data;
    console.log("webworker 转移前" + data.byteLength);
    self.postMessage(data);
    console.log("webworker 正常发送后" + data.byteLength);
    self.postMessage(data, [data]);
    console.log("webworker 转移所有权后" + data.byteLength);
  }
})
