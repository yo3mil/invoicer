<template>
  <div class="body_element summary">
    <div class="summary__customer">
      <h3>
        <span>{{customer.name}}, {{ customer.contact}}</span>
      </h3>
    </div>
    <hr class="products__line">
    <div class="summary__products bg-gray">
      <ul class="max-height">
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
    <div class="summary__console">
      <div class="form_details-input">
        <select id="typeOfInvoice" name="typeofinvoice" v-model="info.orderType">
          <option value="invoice">Invoice</option>
          <option value="credit">Credit Note</option>
          <option value="quote">Quotation</option>
        </select>
        <label for="ordernumber">Order type</label>
      </div>
      <div class="form_details-input">
        <input @input="updateInfo" v-model="info.orderNumber" id="ordernumber" type="text">
        <label for="ordernumber">Order number</label>
      </div>
      <div class="form_details-input">
        <input @input="updateInfo" v-model="info.discount" id="discount" type="text" placeholder="0">
        <label for="discount">Discount (%)</label>
      </div>
       <div class="form_details-input">
        <input @input="updateInfo" v-model="info.shipping" id="shipping" type="text" placeholder="0">
        <label for="shipping">Shipping(£)(no VAT)</label>
      </div>
      <div class="form_details-input">
        <h3 class="form_details-input-fake_input">£{{ twoDecimals(discountCalculator(totalPrice, info.discount)) }}</h3>
        <label for="totalprice">Total Price (£)</label>
      </div>
      <div class="form_details-input">
        <h3 class="form_details-input-fake_input">£{{ twoDecimals(totalVatIncludingShipping) }}</h3>
        <label for="totalvat">vat (£)</label>
      </div>
      <div class="form_details-input">
        <h3 class="form_details-input-fake_input">£{{ twoDecimals(total) }}</h3>
        <label for="sum">total (£)</label>
      </div>
    </div>
  </div>
</template>

<script>
  const customLabels = {first: '<<',last: '>>',previous: '<',next: '>'};
  import PrintPage from './subComponents/PrintPage.vue'
  import StoreProduct from './subComponents/StorePrododuct.vue';
  import { mapGetters } from 'vuex';
  import { calculators } from '../../mixins/mixins.js'
  export default {
    components: {
      StoreProduct,
      PrintPage
    },
    mixins: [ calculators ],
    created() {
      this.updateInfo();
    },
    data() {
      return {
        info: {
          shipping: 0,
          discount: 0,
          orderType: 'invoice',
          orderNumber: '',
          orderDate: new Date().toLocaleDateString()
        },
        print: false,
        // TODO: scroll or pages ? pagination, needs update.
        pageOfBasket: [],
        customLabels
      }
    },
    computed: {
      ...mapGetters([
        'totalPrice', 'totalVat', 'subTotal','basket','customer'
      ]),
      total() {
        return (this.discountCalculator(this.totalPrice, this.info.discount) + Number(this.info.shipping) + this.totalVatIncludingShipping);
      },
      totalVatIncludingShipping() {
        return this.discountCalculator(this.totalVat, this.info.discount) + Number(this.info.shipping * 0.2)
      }
    },
    methods: {
      onChangePageBasket(pageOfItems) {
        this.pageOfBasket = pageOfItems;
      },
      updateInfo (e) {
        this.info.sum = this.total;
        this.$store.commit('updateInfo', this.info)
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
    .form_details-input-fake_input {
      font-weight: bold;
      padding: .8rem;
      text-align: center;
      width: 13rem;
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
        text-transform: uppercase;
      }
      &__products {
        width: 100%;
        flex: 1;
        border-radius: 20px;
        padding: .5rem;
        overflow: hidden;
        overflow-y: scroll;
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
      & input,
      & select {
        width: 9.5rem;
      }
      
    }

</style>