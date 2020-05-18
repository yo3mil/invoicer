<template>
  <li class="customer" v-if="visible">
    <!--History-->
    <div class="customer__container customer">
      <div class="customer__name">
        <h3>{{ customer.info.orderNumber }}</h3>
        <h3>{{ customer.info.orderDate }}</h3>
      </div>
      <h3 class="customer__address">{{ customer.contact}}, {{ customer.name }}</h3>
      <h3 class="customer__address">{{ customer.address }}</h3>
      <div class="customer__contact">
          
        <h3>£{{ twoDecimals(customer.info.sum) }}</h3>
      </div>
      <!--Main Console-->
      <div class="customer__console" v-if="subConsole">
        <div @click="post()" class="customer__console-invoice"><i class="ion-printer"></i></div>
        <div @click="subConsole = false" class="customer__console-delete"><i class="ion-trash-a"></i></div>
      </div>
      <!-- Y/N console after clicking del-->
      <div class="customer__console" v-else>
        <div @click="remove()" class="customer__console-yes"><i class="ion-checkmark"></i></div>
        <div @click="subConsole = true" class="customer__console-no"><i class="ion-close"></i></div>
      </div>
    </div>
</li>
  
</template>

<script>
import { deleteHistory } from '../../database/firestore.js';

export default {
    props: {
      order: {type: Array},
      customer: {type: Object}
    },
    data() {
      return {
        visible: true,
        subConsole: true
      }
    },
    methods: {
      remove() {
        deleteHistory(this.$vnode.key);
        this.visible = false;
      },
      post() {
        this.$store.commit('resetState');
        this.$store.state.customer = this.customer;
        this.$store.state.productsOrder = this.order;
        this.$router.push({ path: '/invoicer' })
      },
      twoDecimals(number) {
        return (Math.round(number * 100) / 100).toFixed(2);
      }
    }
}
</script>

<style lang="scss">
    @import "../../styles/_base.scss";
</style>