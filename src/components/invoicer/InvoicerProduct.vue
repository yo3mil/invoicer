<template>
  <div class="body_element">
    <div class="body_half-1">
      <div class="title">
        
        <input v-model="searchPhrase" class="products__search-input" type="text" placeholder="Search...">
        <hr class="products__line">
      </div>
      <ul class="list max-height">
        <!-- mode:true === for product, false for basket item-->
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
      <ul class="list scroll">
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
      <!-- <div class="footer">
        <jw-pagination class="pagination"
            :items="basket" 
            :pageSize="13" 
            @changePage="onChangePageBasket"
            :disableDefaultStyles="true"
            :labels="customLabels"
        ></jw-pagination>
      </div> -->
    </div>
    
  </div>
</template>

<script>
  const customLabels = {first: '<<',last: '>>',previous: '<',next: '>'};
  import StoreProduct from './subComponents/StorePrododuct.vue';
  import { productCollection } from '../../database/firestore.js';

  export default {
    components: {
      StoreProduct
    },
    data() {
      return {
        products: [],
        searchPhrase: '',
        searchedProducts: [],
        //jw-pagination
        // TODO: scroll or pagination ? 
        pageOfProducts: [],
        pageOfBasket: [],
        customLabels
      }
    },
    firestore: {
      products: productCollection
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
        for (let i = 0; i < this.products.length; i++) {
          if(this.products[i].product.toLowerCase().includes(this.searchPhrase.toLowerCase())
          || this.products[i].code.toLowerCase().includes(this.searchPhrase.toLowerCase())) {
             this.searchedProducts.push(this.products[i])
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
      height: 100%;
    }
    .body_half {
      height: 100%;
      &-1 {
        flex: 0 0 60%;
        margin-right: 6rem;
      }
      &-2 {
        flex: 1;
        padding-left: 4px;
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
    .scroll {
      height: 85%;
      overflow: hidden;
        overflow-y: scroll;
    }
    .pagination {
      margin-top: 1rem;
    }
    
</style>