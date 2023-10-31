export function myInterval(callback, delay) {
  let intervalId;
  let shouldContinue = true;
  function _innerCallback() {
    callback && callback();
    if (shouldContinue) {
      intervalId = setTimeout(_innerCallback, delay);
    }
  }
  _innerCallback();
  return {
    clear: () => {
      shouldContinue = false;
      intervalId && clearTimeout(intervalId);
    }
  };
}

export function clearMyInterval(obj) {
  obj.clear();
}
