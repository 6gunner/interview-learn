import WS from './ws';

export default {
  install(Vue, url, options = {}) {
    Vue.prototype.$socket = new WS({
      ...options,
      url,
    });
  }
}
