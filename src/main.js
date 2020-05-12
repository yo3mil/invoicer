import Vue from 'vue'
import App from './App.vue'



//Vue router
import VueRouter from 'vue-router';
import { routes } from './routes.js';


const router = new VueRouter({
  mode: 'history',
  routes
});

router.beforeEach((to, from, next) => {
 // check for required path

   //check if not logged in
    if (!auth.currentUser && to.matched.some(record => record.meta.requiresAuth)) {
     //go to login page
      next({
        path: '/',
        query: {
          redirect: to.fullPath
        }
      })
    } else {
      // proceed to the route
      next();
    }
 
});

Vue.use(VueRouter);



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
