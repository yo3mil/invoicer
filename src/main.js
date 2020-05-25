
import Vue from 'vue'
import App from './App.vue'

///////////////////////////////////////////////////////////////////////////////////////////////
///////////////////////////////////////////////////////////////////////////////////////////////
// FIREBASE
import { auth } from './database/firestore.js'
import firebase from 'firebase/app';
import 'firebase/auth';
import 'firebase/firestore';

import { firestorePlugin } from 'vuefire';
Vue.use(firestorePlugin)

///////////////////////////////////////////////////////////////////////////////////////////////
///////////////////////////////////////////////////////////////////////////////////////////////
// ROUTER
import VueRouter from 'vue-router';
import { routes } from './routes.js';
const router = new VueRouter({
  mode: 'history',
  routes
});
// route guard
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

///////////////////////////////////////////////////////////////////////////////////////////////
//JW-Pagination 
import JwPagination from 'jw-vue-pagination';
Vue.component('jw-pagination', JwPagination);

///////////////////////////////////////////////////////////////////////////////////////////////
// VUEX
import { store } from './store/store.js'



///////////////////////////////////////////////////////////////////////////////////////////////
// VUE
// fixes back to login page on reload:
let app;
firebase.auth().onAuthStateChanged(user => {
  
  if(!app) {
    app = new Vue({
      el: '#app',
      router,
      store,
      render: h => h(App)
    });
  }
});

