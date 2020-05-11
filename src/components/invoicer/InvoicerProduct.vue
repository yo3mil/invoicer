<template>
  <div class="body_element">
    <div class="body_half-1">
      <div class="title">
        
        <input v-model="searchPhrase" class="products__search-input" type="text" placeholder="Search...">
        <hr class="products__line">
      </div>
      <ul class="list">
        <store-product v-for="product in searchedProducts"
          :key="product.id"
          :code="product.code"
          :name="product.product"
          :size="product.size"
          :price="product.priceNoVat"
          :mode="true"
        >
        </store-product>
      </ul>
    </div>
    <div class="body_half-2">
      <div class="title">
        <h2>Basket</h2>
        <hr class="products__line">
      </div>
      <ul class="list">
        <store-product v-for="(product, index) in basket"
          :index="index"
          :key="product.id"
          :code="product.code"
          :name="product.product"
          :size="product.size"
          :price="product.priceNoVat"
          :quantity="product.quantity"
          :mode="false"
        >
        </store-product>
      </ul>
    </div>
  </div>
</template>

<script>
  import StoreProduct from './subComponents/StorePrododuct.vue';
  import { products } from '../../database/firestore.js';

  export default {
    components: {
      StoreProduct
    },
    data() {
      return {
        searchPhrase: '',
        searchedProducts: []
      }
    },
    computed: {
      basket() {
        return this.$store.state.productsOrder;
      }
    },
    watch: {
      searchPhrase() {
        if(this.searchPhrase == '') {
          this.searchedProducts = [];
        } else {
          this.searchedProducts = [];
          this.updateSearch();
        }
      }
    },
    methods: {
      updateSearch() {
        for (let i = 0; i < products.length; i++) {
          if(products[i].product.toLowerCase().includes(this.searchPhrase.toLowerCase())
          || products[i].code.toLowerCase().includes(this.searchPhrase.toLowerCase())) {
            this.searchedProducts.push(products[i])
          }
        }
        
      }
    }
  }
</script>

<style lang="scss" scoped>
    @import "../../styles/_base.scss";
    .body_element {
      display: flex;
    }
    .body_half {
      height: 100%;
      &-1 {
        flex: 0 0 60%;
        margin-right: 6rem;
      }
      &-2 {
        flex: 1;
      }
      
    }
    .title {
      height: 4rem;
      display: flex;
      flex-direction: column;
      margin-top: 1.5rem;

      & input,
      & h2 {
        margin-bottom: auto;
      }

    }
    
</style>