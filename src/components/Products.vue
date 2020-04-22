<template>
  <div class="page__container">
      <div class="container">
        <div class="header">
          <router-link tag="div" class="header__menu" to="/">
            <div class="menu__icon"><div></div><div></div><div></div></div>
          </router-link>
          <h1 class="header__title">Products</h1>
          <div class="header__action">
            <!-- <img class="header__action-btn" src="../assets/test.svg" alt="test"> -->
          </div>
        </div>
        <div class="body">
          <products-header></products-header>
          <ul class="products__list">
            <products-list 
              v-for="product in allProducts"
              :key="product.id"
              :id="product.code"
              :name="product.product"
              :size="product.size"
              :price="product.priceNoVat"
              :vat="product.vat"
            ></products-list>
          </ul>
        </div>
      </div>
  </div>
</template>

<script>
import products from "../database/firestore.js";
import ProductsHeader from "./products/ProductsHeader.vue";
import ProductsList from "./products/ProductsList.vue"

export default {
  data() {
    return {
      allProducts: products,
      search: ""
    }
  },
  components: {
    ProductsHeader,
    ProductsList
  }
}
</script>

<style lang="scss">
  
</style>