<template>
  <div class="page__container">
      <div class="container">
        <div class="header">
          <router-link tag="div" class="header__menu" to="/menu">
            <div class="menu__icon"><div></div><div></div><div></div></div>
          </router-link>
          <h1 class="header__title">Invoicer</h1>
          <div @click="proceed()" v-show="!printbtn" class="header__action"><i class="ion-arrow-right-a"></i></div>
          <div @click="back()" v-show="backbtn" class="header__action move_left"><i class="ion-arrow-left-a"></i></div>
          <div @click="print()" v-show="printbtn" class="header__action printer"><i class="ion-printer"></i></div>
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
        stage: { customerStage: true, productStage: false, verifyStage: false },
        backbtn: false,
        printbtn: false
      }
    },
    methods: {
      proceed() {
        if(this.stage.customerStage) {
          this.viewChanger(false, true, false, true, false);
        } else if (this.stage.productStage) {
          this.viewChanger(false, false, true, true, true);
        }
      },
      back() {
        if(this.stage.productStage) {
          this.viewChanger(true, false, false, false, false)
        } else if (this.stage.verifyStage) {
          this.viewChanger(false, true, false, true, false)
        }
      },
      viewChanger(customerDetails, productDetails, verifyPage, backButton, printButton) {
        this.stage.customerStage = customerDetails;
        this.stage.productStage = productDetails;
        this.stage.verifyStage = verifyPage;
        this.backbtn = backButton;
        this.printbtn = printButton;
      },
      print() {
        this.$router.replace({path: '/PrintPage'})
      }
    }
  }
</script>

<style lang="scss">
  @import "../styles/_base.scss";
  .move_left {
    margin-right: 4rem;
  }
  .printer {
    transform: scale(1.2);
    
  }
</style>