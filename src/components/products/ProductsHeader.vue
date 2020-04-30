<template>
  <div class="products">
      <div class="products__search">
        <input v-model="searchPhrase" class="products__search-input" type="text" placeholder="Search...">
        <button @click="search()" class="products__search-btn">search</button>
      </div>
      <div class="products__header">
        <h2 class="products__header-product">Code</h2>
        <h2 class="products__header-name">Name</h2>
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

<style lang="scss">
  @import "../../styles/_base.scss";
  .products__header {
    &-product,
      &-size,
      &-price,
      &-vat {
        width: 16.2%;
      }
      &-name {
        width: 35%;
      }
  }
      
</style>