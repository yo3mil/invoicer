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



new Vue({
  el: '#app',
  router,
  render: h => h(App)
})
