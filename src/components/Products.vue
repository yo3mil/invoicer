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
import {products} from "../database/firestore.js";
import ProductsHeader from "./products/ProductsHeader.vue";
import ProductsList from "./products/ProductsList.vue";
import ProductsAdd from "./products/ProductsAdd.vue";
export default {
  data() {
    return {
      allProducts: products,
      searched: "",
      addPopup: false
    }
  },
  computed: {
    allProducts() {
      return products;
    }
  },
  components: {
    ProductsHeader,
    ProductsList,
    ProductsAdd
  }
}
</script>

<style lang="scss">
  
</style>