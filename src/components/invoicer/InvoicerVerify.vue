<template>
  <div class="body_element summary">
    <div class="summary__customer">
      <h3>
        <span>SHIPPING TO:</span>{{customer.name}}{{ customer.payment }}
      </h3>
    </div>
    <hr class="products__line">
    <div class="summary__products">
      <ul>
        <store-product v-for="(product, index) in basket"
          :key="product.id"
          :code="product.code"
          :name="product.product"
          :size="product.size"
          :price="product.priceNoVat"
          :quantity="product.quantity"
          :index="index"
          :mode="false"
        >
        </store-product>
      </ul>
    </div>
    <!-- info CONSOLE-->
    <hr class="products__line">
    <div>
      <h1> {{ totalPrice }} </h1>
      <h1> {{ totalVat }} </h1>
      <h1> {{ subTotal }} </h1>
      <input v-model="shipping" type="text">
      <input v-model="discount" type="text">
      <h1>{{ total }}</h1>
    </div>
    
  </div>
</template>

<script>
  import PrintPage from './subComponents/PrintPage.vue'
  import StoreProduct from './subComponents/StorePrododuct.vue';
  import {mapGetters} from 'vuex';
  
  export default {
    components: {
      StoreProduct,
      PrintPage
    },
    data() {
      return {
        shipping: 0,
        discount: 0,
        print: false
      }
    },
    computed: {
      ...mapGetters([
        'totalPrice', 'totalVat', 'subTotal','basket','customer'
      ]),
      // total including shipping and discount.
      total() {
        return (this.subTotal + Number(this.shipping)) - (this.subTotal * (Number(this.discount) / 100));
      }
    },
    methods: {
       
    }
  }
</script>

<style lang="scss" scoped>
    @import "../../styles/_base.scss";
    button {
      width: 10rem;
      height: 10rem;
    }
    .summary {
      display: flex;
      flex-direction: column;
      &__title {
        text-transform: uppercase;
        display: flex;
        flex-direction: column;
        justify-content: center;
        align-items: center;
        width: 100%;
        flex: 0 0 15%;
      }
      &__customer {
        width: 100%;
        flex: 0 0 15%;
        display: flex;
        flex-direction: column;
        justify-content: center;
        align-items: center;
      }
      &__products {
        width: 100%;
        flex: 1;
      }

      & h3 span {
        color: $base-color;
      }
    }

</style>