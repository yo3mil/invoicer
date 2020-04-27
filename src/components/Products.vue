<template>
  <div class="page__container">

    <products-add v-show="addPopup" @popupClosed="addPopup = $event"></products-add>

    <div class="container">
      <div class="header">
        <router-link tag="div" class="header__menu" to="/">
          <div class="menu__icon"><div></div><div></div><div></div></div>
        </router-link>
        <h1 class="header__title">Products</h1>
        <!-- Add button -->
        <div class="header__action" @click="addPopup = true">
          <i class="ion-plus"></i>
        </div>
      </div>

      <div class="body">
        <products-header @inputChange="searched = $event"></products-header>
        <ul class="products__list">
          <products-list 
            v-for="product in pageOfItems"
            :key="product.id"
            :code="product.code"
            :name="product.product"
            :size="product.size"
            :price="product.priceNoVat"
            :vat="product.vat"
          ></products-list>
        </ul>
        <div class="footer">
          <hr class="products__line">
          <jw-pagination :items="allProducts" 
            :pageSize="12" 
            @changePage="onChangePage"
            :disableDefaultStyles="true"
            :labels="customLabels"
          ></jw-pagination>
        </div>
      </div>
    </div>

  </div>
</template>

<script>
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