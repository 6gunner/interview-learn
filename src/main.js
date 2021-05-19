import Vue from "vue";
import VueRouter from "vue-router";
import WsPlugin from "./wsplugin/index";
import Vuex from "vuex";

import "./index.css";
import router from "./router";
import store from "./store";

Vue.use(VueRouter);
Vue.use(WsPlugin, "wss://ws.quote.gsoms.top/ws", {
  store
});

import App from "./App.vue";
const vm = new Vue({
  el: "#app",
  store,
  router,
  render: h => h(App) // 这里因为指定了render函数，所以template不会有效
});
