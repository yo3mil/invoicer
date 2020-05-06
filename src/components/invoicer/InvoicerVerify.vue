<template>
  <div class="body_element summary">
    <div class="summary__title">
      <h2>Order Summary</h2>
    </div>
    <hr class="products__line">
    <div class="summary__customer">
      <h3>
        <span>SHIPPING TO:</span>
                    {{customer.name}}
                    ({{customer.contact}}),
                    {{customer.delivery}}
      </h3>
    </div>
    <hr class="products__line">
    <div class="summary__products">
      <ul>
        <store-product v-for="product in basket"
          :key="product.id"
          :code="product.code"
          :name="product.product"
          :size="product.size"
          :price="product.priceNoVat"
          :mode="false"
        >
        </store-product>
      </ul>
    </div>
  </div>
</template>

<script>
  import StoreProduct from './subComponents/StorePrododuct.vue';
  
  export default {
    components: {
      StoreProduct
    },
    computed: {
      basket() {
        return this.$store.state.productsOrder;
      },
      customer() {
        return this.$store.state.customer;
      }
    }
  }
</script>

<style lang="scss" scoped>
    @import "../../styles/_base.scss";

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