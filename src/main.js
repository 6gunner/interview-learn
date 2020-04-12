import Vue from 'vue'
import VueRouter from 'vue-router';
import WsPlugin from './wsplugin/index';
import Vuex from 'vuex';
import store from './store';

Vue.use(VueRouter);
Vue.use(WsPlugin, 'wss://ws.quote.gsoms.top/ws', {
  store
});
const router = new VueRouter({
  mode: 'hash', // history或hash模式
  routes: [{
    path: '/upload',
    component: () => import('./uploadFile/index'),
  }, {
    path: '/worker',
    component: () => import('./webworker/index'),
  }, {
    path:'/event',
    component: () => import('./base/event/index')
  }, {
    path:'/event2',
    component: () => import('./base/event/index2')
  }, {
    path: '/generator',
    component: () => import('./generator/index')
  }, {
    path: '/asyncawait',
    component: () => import('./base/asyncawait/index')
  }, {
    path: '/closure',
    component: () => import('./base/closure/index')
  }, {
    path: '/c',
    component: () => import('./base/constructor/index')
  }, {
    path: '/copy',
    component: () => import('./base/copy/deepCopy')
  }, {
    path: '/curry',
    component: () => import('./curry/index')
  }, {
    path: '/sw',
    component: () => import('./serviceworker/index')
  }, {
    path: '/sticky',
    component: () => import('./css/position/sticky')
  }, {
    path: '/verticalAlign',
    component: () => import('./css/verticalAlign')
  }, {
    path: '/grid',
    component: () => import('./css/grid')
  }, {
    path: '/defineProperty',
    component: () => import('./vue/defineProperty')
  }, {
    path: '/vue/lifecycle',
    component: () => import('./vue/liefcycle')
  }, {
    path: '/wsplugin',
    component: () => import('./wsplugin/test')
  }, {
    path: '/design/decorator',
    component: () => import('./design-pattern/decorator')
  }, {
    path: '/http',
    component: () => import('./http/Index')
  }]
})
import App from './App.vue'
const vm = new Vue({
  el: '#app',
  store,
  router,
  render: h => h(App) // 这里因为指定了render函数，所以template不会有效
})

