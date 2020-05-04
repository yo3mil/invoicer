<template>
  <div class="page__container">
      <div class="container">
        <div class="header">
          <router-link tag="div" class="header__menu" to="/">
            <div class="menu__icon"><div></div><div></div><div></div></div>
          </router-link>
          <h1 class="header__title">Invoicer</h1>
          <div @click="proceed()" class="header__action"><i class="ion-arrow-right-a"></i></div>

        </div>
        <div class="body">
          <invoicer-customer v-if="stage.customerStage"></invoicer-customer>
          <invoicer-product v-if="stage.productStage"></invoicer-product>
          <invoicer-verify v-if="stage.verifyStage"></invoicer-verify>
        </div>
      </div>
  </div>
</template>

<script>
  import InvoicerCustomer from './invoicer/InvoicerCustomer.vue';
  import InvoicerProduct from './invoicer/InvoicerProduct.vue';
  import InvoicerVerify from './invoicer/InvoicerVerify.vue';

  export default {
    components: {
      InvoicerCustomer,
      InvoicerProduct,
      InvoicerVerify
    },
    data() {
      return {
        stage: { customerStage: true, productStage: false, verifyStage: false},
        customerDetails: {},
        order: []
      }
    },
    methods: {
      proceed() {
        if(this.stage.customerStage) {
          this.stage.customerStage = false;
          this.stage.productStage = true;
          this.stage.verifyStage = false;
        } else if (this.productStage) {
          this.stage.customerStage = false;
          this.stage.productStage = false;
          this.stage.verifyStage = true;
        }
        
      }
    }
  }
</script>

<style>

</style>