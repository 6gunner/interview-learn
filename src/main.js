import Vue from 'vue'
import VueRouter from 'vue-router';

Vue.use(VueRouter);
const router = new VueRouter({
  mode: 'hash', // history或hash模式
  routes: [{
    path: '/upload',
    component: () => import('./uploadFile/index'),
  }, {
    path: '/worker',
    component: () => import('./worker/index'),
  }]
})
import App from './App.vue'

new Vue({
  el: '#app',
  router,
  render: h => h(App)
})
