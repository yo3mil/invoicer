import Vue from 'vue';
import Vuex from 'vuex';

Vue.use(Vuex);

export const store = new Vuex.Store({
    state: {
        customer: {},
        productsOrder: []
    },
    getters: {
        // all in basket just price no vat
        totalPrice(state) {
            let total = [];
            let multiplyItem;
            for(let i = 0; i < state.productsOrder.length; i++){
                multiplyItem = state.productsOrder[i].quantity * Number(state.productsOrder[i].priceNoVat);
                total.push(multiplyItem);
            }
            return total.reduce((a, b) => a + b, 0);
        },
        //TODO: code repetition here needs fixing !
        totalVat(state) {
            let total = [];
            let multiplyItem;
            for(let i = 0; i < state.productsOrder.length; i++){
                multiplyItem = state.productsOrder[i].quantity * Number(state.productsOrder[i].vat);
                total.push(multiplyItem);
            }
            return total.reduce((a, b) => a + b, 0);
        },
        subTotal(state, getters) {
            return getters.totalPrice + getters.totalVat;
        },
        basket(state) {
            return state.productsOrder;
        },
        customer(state) {
            return state.customer;
        }
    },
    mutations: {
        increment(state, index) {
            state.productsOrder[index].quantity++;
        },
        decrement(state, index) {
            state.productsOrder[index].quantity--;
        },
        resetState(state) {
            state.customer = {};
            state.productsOrder = [];
        },
        updateInfo (state, info) {
            state.customer.info = info;
            //console.log(state.customer);
            
        }
    }
});
