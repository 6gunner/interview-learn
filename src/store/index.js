import Vuex from 'vuex';
import Vue from 'vue'

Vue.use(Vuex);

const ws = {
  state: {
    detail: {},
  },
  mutations: {
    SOCKET_ONMESSAGE(state, {
      data
    }) {
      console.log('接收到消息');
      // 可以去做任何state的更新操作了
      const jsonObj = JSON.parse(data);
      const respApi = jsonObj.api;
      const respData = jsonObj.data;
      if (respApi == 'quote.detail' && respData) {
        state.detail = respData[0];
      }
    }
  }
}
const store = new Vuex.Store({
  ...ws,
})

export default store;
