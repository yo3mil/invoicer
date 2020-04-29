<template>
  <div class="products">
      <div class="products__search">
        <input v-model="searchPhrase" class="products__search-input" type="text" placeholder="Search...">
        <button @click="search()" class="products__search-btn">search</button>
      </div>
      <div class="products__header">
        <h2 class="products__header-">Name</h2>
        <h2 class="products__header-">Name</h2>
        <h2 class="products__header-">Size</h2>
        <h2 class="products__header-">Price</h2>
        <h2 class="products__header-">VAT</h2>
      </div>
      <hr class="products__line">
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
</style>