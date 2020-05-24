import Vue from 'vue'
import App from './App.vue'



///////////////////////////////////////////////////////////////////////////////////////////////
///////////////////////////////////////////////////////////////////////////////////////////////
// FIREBASE
import firebase from 'firebase/app';
import 'firebase/auth';
import 'firebase/firestore';

//Firebase Config
// firebase config is just a pointer and can be (have to be) public.
const config = {
  apiKey: "AIzaSyAUhex5r079Zvcb9aVb8yXSKpxUgexoNoc",
  authDomain: "orientalmart-a0ffd.firebaseapp.com",
  databaseURL: "https://orientalmart-a0ffd.firebaseio.com",
  projectId: "orientalmart-a0ffd",
  storageBucket: "orientalmart-a0ffd.appspot.com",
  messagingSenderId: "785374799937",
  appId: "1:785374799937:web:84ea0759969e11c420bec0"
}
// Initialize Firebase
firebase.initializeApp(config);
export const db = firebase.firestore();
export const auth = firebase.auth();
// For this to work files from JSON upload folder have to be in root !


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

