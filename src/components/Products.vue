<template>
  <div class="page__container bg-linear-blue">
    <div class="container">
      <!--MAIN HEADER-->
      <div class="header">
        <!-- menu btn-->
        <router-link tag="div" class="header__menu" to="/menu">
          <div class="menu__icon"><div></div><div></div><div></div></div>
        </router-link>
        
        <div class="header__title-container">
          <h1 class="header__title">Products</h1>
        </div>
      </div>
      <!--MAIN BODY-->
      <div class="body" v-show="!addPopup">
        <!--Header with Search Element-->
        <products-header @inputChange="searched = $event"></products-header>

        <!--List With all products-->
        <ul class="list">
          <products-list 
            v-for="product in pageOfItems"
            :key="product.id"
            :code="product.code"
            :name="product.product"
            :size="product.size"
            :price="product.priceNoVat"
            :vat="product.vat"
            :category="product.category"
          ></products-list>
        </ul>

        <!--Footer with pagination-->
        <div class="footer">
         <jw-pagination :items="allProducts" 
            :pageSize="13" 
            @changePage="onChangePage"
            :disableDefaultStyles="true"
            :labels="customLabels"
          ></jw-pagination>
        </div>
        <!-- Add button -->
        <div class="header__action header__action-right" @click="addPopup = true" v-show="!addPopup">
          <p>Add New</p>
        </div>
      </div>
      
      <!--Add Product Component-->
      
      <div class="body" v-show="addPopup">
        <products-add  @popupClosed="addPopup = $event"></products-add>
      </div>
      
    </div>

  </div>
</template>

<script>
// js pagination
const customLabels = {first: '<<',last: '>>',previous: '<',next: '>'};

import {products} from "../database/firestore.js";
import ProductsHeader from "./products/ProductsHeader.vue";
import ProductsList from "./products/ProductsList.vue";
import ProductsAdd from "./products/ProductsAdd.vue";
export default {
  data() {
    return {
      allProducts: products,
      searched: "",
      addPopup: false,
      
      //jw pagination
      pageOfItems: [],
      customLabels
    }
  },
  components: {
    ProductsHeader,
    ProductsList,
    ProductsAdd
  },
  watch: {
    searched() {
      if(this.searched === "") {
        this.allProducts = products;
      } else {
        this.allProducts = [];
        this.updateSearch();
      }
    }
  },
  methods: {
    updateSearch() {
      for (let i = 0; i < products.length; i++) {
        if(products[i].product.toLowerCase().includes(this.searched.toLowerCase())
        || products[i].code.toLowerCase().includes(this.searched.toLowerCase())) {
          this.allProducts.push(products[i])
        }
      }
    },
    //pagination setup
    onChangePage(pageOfitems) {
      this.pageOfItems = pageOfitems;
    }
    
  }
}
</script>

<style lang="scss">

</style>