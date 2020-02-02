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
  fetch('https://www.continue19.com/api/quote/v1/rates?tokens=BTC,USDT,BUSDT&legalCoins=BTC,USDT,CNY,USD').then(function (res) {
    const data = res.json();
    if (!compare(data, cache)) {
      cache = data;
      self.postMessage(data);
    }
  })
}, 1000);
