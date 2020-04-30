<template>
  <div class="products">
      <div class="products__search">
        <input v-model="searchPhrase" class="products__search-input" type="text" placeholder="Search...">
        <button @click="search()" class="products__search-btn">search</button>
      </div>
      <div class="products__header">
        <h2 class="customer__header-name">Name</h2>
        <h2 class="customer__header-address">Address</h2>
        <h2 class="customer__header-address">Delivery Address</h2>
        <h2 class="customer__header-contact">Contact</h2>
        
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
  .customer__header {
    &-name {
      width: 19%;
    }
    &-address {
      width: 40%;
    }
    &-contact {
      width: 29%;
    }
  }
</style>