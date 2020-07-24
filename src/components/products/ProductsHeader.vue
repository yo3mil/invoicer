<template>
  <div class="products">
    <div class="products__search">
      <input v-model="searchPhrase" class="products__search-input" type="text" placeholder="Search...">
    </div>
    <div class="products__header">
      <h2 class="products__header-category">Category</h2>
      <h2 class="products__header-product">ID</h2>
      <h2 class="products__header-name">Product</h2>
      <h2 class="products__header-size">Size</h2>
      <h2 class="products__header-price">Price</h2>
      <h2 class="products__header-vat">VAT</h2>
    </div>
    <div class="products__line">
      <hr class="products__line">
    </div>
  </div>
</template>

<script>
  export default {
    data() {
      return {
        searchPhrase: ""
      }
    },
    watch: {
      searchPhrase() {
        this.$emit('inputChange', this.searchPhrase);
      }
    }
  }
</script>

<style lang="scss" scoped>
  @import "../../styles/_base.scss";
  .products__header {
    &-product,
      &-size,
      &-price,
      &-vat,
      &-category{
        width: 16.2%;
      }
      &-name {
        width: 35%;
      }
  }
  
</style>