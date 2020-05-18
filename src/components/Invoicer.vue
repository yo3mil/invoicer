<template>
  <div class="page__container bg-linear-green">
      <div class="container">
        <!--HEADER-->
        <div class="header">
          <router-link tag="div" class="header__menu" to="/menu">
            <div class="menu__icon"><div></div><div></div><div></div></div>
          </router-link>
          <div class="header__title-container">
            <h1 :class="{active: !stage.customerStage}"  class="header__title" >customer detail</h1>
            <i class="ion-play"></i>
            <h1 :class="{active: !stage.productStage}" class="header__title">add products</h1>
            <i class="ion-play"></i>
            <h1 :class="{active: !stage.verifyStage}" class="header__title">review</h1>
          </div>
        </div>
        <!--BODY-->
        <div class="body overflow">
          <transition :name="animation" mode="out-in">
            <invoicer-customer v-if="stage.customerStage"></invoicer-customer>
            <invoicer-product v-if="stage.productStage"></invoicer-product>
            <invoicer-verify v-if="stage.verifyStage"></invoicer-verify>
          </transition>
          <div @click="proceed()" v-show="!printbtn" class="header__action header__action-right"><p>Continue</p></div>
          <div @click="back()" v-show="backbtn" class="header__action header__action-left"><p>Back</p></div>
          <div @click="print()" v-show="printbtn" class="header__action header__action-right"><p>Print</p></div>
        </div>
      </div>
  </div>
</template>

<script>
  import InvoicerCustomer from './invoicer/InvoicerCustomer.vue';
  import InvoicerProduct from './invoicer/InvoicerProduct.vue';
  import InvoicerVerify from './invoicer/InvoicerVerify.vue';
  import { saveHistory } from "../database/firestore.js";

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
        printbtn: false,
        animation: "slideLeft"
      }
    },
    methods: {
      proceed() {
        this.animation = "slideLeft";
        if(this.stage.customerStage) {
          this.viewChanger(false, true, false, true, false);
        } else if (this.stage.productStage) {
          this.viewChanger(false, false, true, true, true);
        }
      },
      back() {
        this.animation = "slideRight";
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
        this.save();
      },
      save() {
        saveHistory(this.$store.state.customer, this.$store.state.productsOrder);
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
  .active {
    opacity: .2;
  }
  .overflow {
    overflow: hidden;
  }
</style>