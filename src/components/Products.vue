<template>
  <div class="page__container bg-linear-blue">
    <div class="container">
      <!--MAIN HEADER-->
      <div class="header">
        <!-- menu btn-->
        <div class="header__menu">
          <router-link tag="div" to="/invoicer" class="header__menu-circle header__menu-circle-1 bg-green"><i class="ion-compose"></i></router-link>
          <router-link tag="div" to="/customers" class="header__menu-circle header__menu-circle-2 bg-red"><i class="ion-ios-people"></i></router-link>
          <router-link tag="div" to="/history" class="header__menu-circle header__menu-circle-3 bg-yellow"><i class="ion-document-text"></i></router-link>
          <router-link tag="div" to="/menu" class="header__menu-circle header__menu-circle-4"><i class="ion-ios-home"></i></router-link>
        </div>
        
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

import { productCollection } from "../database/firestore.js";
import ProductsHeader from "./products/ProductsHeader.vue";
import ProductsList from "./products/ProductsList.vue";
import ProductsAdd from "./products/ProductsAdd.vue";
export default {
  data() {
    return {
      products: [],
      allProducts: [],
      searched: "",
      addPopup: false,
      loader: false,
      //jw pagination
      pageOfItems: [],
      customLabels
    }
  },
  mounted() {
     this.allProducts = this.products;
  },
  firestore: {
    products: productCollection
  },
  components: {
    ProductsHeader,
    ProductsList,
    ProductsAdd
  },
  watch: {
    searched() {
      if(this.searched == "") {
        this.allProducts = this.products;
      } else {
        this.allProducts = [];
        this.updateSearch();
      }
    }
  },
  methods: {
    updateSearch() {
      for (let i = 0; i < this.products.length; i++) {
        if(this.products[i].product.toLowerCase().includes(this.searched.toLowerCase())
        || this.products[i].code.toLowerCase().includes(this.searched.toLowerCase())
        || this.products[i].category.toLowerCase().includes(this.searched.toLowerCase())) {
          this.allProducts.push(this.products[i])
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