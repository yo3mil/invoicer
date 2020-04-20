
import Menu from './components/Menu.vue';
import Invoicer from './components/Invoicer.vue';
import Customers from './components/Customers.vue';
import Products from './components/Products.vue';
import History from './components/History.vue';

export const routes = [
    {path: '/', component: Menu},
    {path: '/invoicer', component: Invoicer },
    {path: '/customers', component: Customers },
    {path: '/products', component: Products },
    {path: '/history', component: History }
]