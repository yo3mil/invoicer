
import Menu from './components/Menu.vue';
import Invoicer from './components/Invoicer.vue';
import Customers from './components/Customers.vue';
import Products from './components/Products.vue';
import History from './components/History.vue';
import SingIn from './components/SingIn.vue'
import PrintPage from './components/invoicer/subComponents/PrintPage.vue'

export const routes = [
    {
        path: '/',
        component: SingIn
    },
    {
        path: '/menu', 
        component: Menu,
        meta:{requiresAuth: true}
    },
    {
        path: '/invoicer', 
        component: Invoicer,
        meta:{requiresAuth: true} 
    },
    {
        path: '/customers', 
        component: Customers,
        meta:{requiresAuth: true} 
    },
    {
        path: '/products', 
        component: Products,
        meta:{requiresAuth: true} 
    },
    {
        path: '/history', 
        component: History,
        meta:{requiresAuth: true} 
    },
    {
        path: '/printpage', 
        component: PrintPage,
        meta:{requiresAuth: true} 
    }
]

