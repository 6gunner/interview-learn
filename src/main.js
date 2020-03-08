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
    component: () => import('./webworker/index'),
  }, {
    path:'/event',
    component: () => import('./event/index')
  }, {
    path:'/event2',
    component: () => import('./event/index2')
  }, {
    path: '/generator',
    component: () => import('./generator/index')
  }, {
    path: '/asyncawait',
    component: () => import('./asyncawait/index')
  }, {
    path: '/closure',
    component: () => import('./closure/index')
  }, {
    path: '/c',
    component: () => import('./constructor/index')
  }, {
    path: '/copy',
    component: () => import('./copy/deepCopy')
  }, {
    path: '/curry',
    component: () => import('./curry/index')
  }]
})
import App from './App.vue'

new Vue({
  el: '#app',
  router,
  render: h => h(App)
})
