import Vue from 'vue'
import App from './App.vue'


//Vue router
import VueRouter from 'vue-router';
import { routes } from './routes.js';
Vue.use(VueRouter);

const router = new VueRouter({
  mode: 'history',
  routes
});


//JW-Pagination 
import JwPagination from 'jw-vue-pagination';
Vue.component('jw-pagination', JwPagination);

// VUEX
import { store } from './store/store.js'

new Vue({
  el: '#app',
  router,
  store,
  render: h => h(App)
})
