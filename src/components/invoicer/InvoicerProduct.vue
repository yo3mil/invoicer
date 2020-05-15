<template>
  <div class="body_element">
    <div class="body_half-1">
      <div class="title">
        
        <input v-model="searchPhrase" class="products__search-input" type="text" placeholder="Search...">
        <hr class="products__line">
      </div>
      <ul class="list max-height">
        <store-product v-for="product in pageOfProducts"
          :key="product.id"
          :code="product.code"
          :name="product.product"
          :size="product.size"
          :price="product.priceNoVat"
          :mode="true"
        >
        </store-product>
      </ul>
      <div class="footer">
        <jw-pagination class="pagination"
            :items="searchedProducts" 
            :pageSize="13" 
            @changePage="onChangePageProducts"
            :disableDefaultStyles="true"
            :labels="customLabels"
        ></jw-pagination>
      </div>
    </div>
    <div class="body_half-2 bg-gray">
      <div class="title">
        <h2>Basket</h2>
      </div>
      <ul class="list max-height">
        <store-product v-for="(product, index) in pageOfBasket"
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
      <div class="footer">
        <jw-pagination class="pagination"
            :items="basket" 
            :pageSize="13" 
            @changePage="onChangePageBasket"
            :disableDefaultStyles="true"
            :labels="customLabels"
        ></jw-pagination>
      </div>
    </div>
    
  </div>
</template>

<script>
  const customLabels = {first: '<<',last: '>>',previous: '<',next: '>'};
  import StoreProduct from './subComponents/StorePrododuct.vue';
  import { products } from '../../database/firestore.js';

  export default {
    components: {
      StoreProduct
    },
    data() {
      return {
        searchPhrase: '',
        searchedProducts: [],
        //jw-pagination
        pageOfProducts: [],
        pageOfBasket: [],
        customLabels
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
        
      },
      onChangePageProducts(pageOfItems) {
          // update page of items
          this.pageOfProducts = pageOfItems;
      },
      onChangePageBasket(pageOfItems) {
        this.pageOfBasket = pageOfItems;
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
        border-radius: 20px;
        padding: .5rem;
        
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
      & h2 {
        margin-top: 1.5rem;
      }

    }
    .max-height {
      height: 73%;
    }
    .pagination {
      margin-top: 1rem;
    }
    
</style>