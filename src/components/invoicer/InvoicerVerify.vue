<template>
  <div class="body_element summary">
    <div class="summary__customer">
      <h3>
        <span>{{customer.name}}</span>
      </h3>
    </div>
    <hr class="products__line">
    <div class="summary__products bg-gray">
      <ul class="max-height">
        <store-product v-for="(product, index) in pageOfBasket"
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
      <div class="footer">
        <jw-pagination class="pagination"
            :items="basket" 
            :pageSize="10" 
            @changePage="onChangePageBasket"
            :disableDefaultStyles="true"
            :labels="customLabels"
        ></jw-pagination>
      </div>
    </div>
    <!-- info CONSOLE-->
    <div class="summary__console">
      <div class="form_details-input">
        <input v-model="customer.order" id="ordernumber" type="text" placeholder="-">
        <label for="ordernumber">Order number</label>
      </div>
      <div class="form_details-input">
        <input v-model="totalPrice" id="totalprice" type="text" disabled>
        <label for="totalprice">Total Price</label>
      </div>
      <div class="form_details-input">
        <input v-model="totalVat" id="totalvat" type="text" disabled>
        <label for="totalvat">vat</label>
      </div>
      <div class="form_details-input">
        <input v-model="discount" id="discount" type="text" placeholder="0">
        <label for="discount">Discount</label>
      </div>
      <div class="form_details-input">
        <input v-model="shipping" id="shipping" type="text" placeholder="0">
        <label for="shipping">Shipping</label>
      </div>
      <div class="form_details-input">
        <input v-model="total" id="sum" type="text" disabled>
        <label for="sum">total</label>
      </div>
    </div>
  </div>
</template>

<script>
  const customLabels = {first: '<<',last: '>>',previous: '<',next: '>'};
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
        print: false,
        pageOfBasket: [],
        customLabels
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
       onChangePageBasket(pageOfItems) {
        this.pageOfBasket = pageOfItems;
      }
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
      
      &__console {
        display: flex;
        justify-content: space-around;
        align-items: center;
        flex: 0 0 20%;
        
      }
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
        flex: 0 0 10%;
        display: flex;
        flex-direction: column;
        justify-content: center;
        align-items: center;
      }
      &__products {
        width: 100%;
        flex: 1;
        border-radius: 20px;
        padding: .5rem;
      }

      & h3 span {
        color: $base-color;
      }
    }
    .max-height {
      height: 88%;
    }
    .form_details-input {
      margin-top: 2rem;
    }

</style>