<template>
  <div class="products">
      <div class="products__search">
        <input class="products__search-input" type="text" placeholder="Search...">
        <button class="products__search-btn">search</button>
      </div>
      <div class="products__header">
        <h2 class="products__header-product">Product</h2>
        <h2 class="products__header-name">Name</h2>
        <h2 class="products__header-size">Size</h2>
        <h2 class="products__header-price">Price (excl.VAT)</h2>
        <h2 class="products__header-vat">VAT</h2>
      </div>
      <hr class="products__line">
    </div>
</template>

<script>
  export default {

  }
</script>

<style lang="scss">
  @import "../../styles/_base.scss";

  .products {
    grid-row: 1 / 2;
    grid-column: center-start / center-end;
    
    &__search {
      margin-top: 1rem;
      &-input {
        color: $base-color;
        height: 1.8rem;
        width: 7rem;
        border-radius: 100px;
        border: 2px solid $base-color-light;
        background-color: $base-color-lighter;
        transition: all .5s;
        padding-left: 10px ;
        &:focus {
          width: 15rem;
        }
      }
      &-btn {
        display: none;
      }
    }

    &__header {
      display: flex;
      justify-content: space-between;
      width: 100%;
      margin-top: 1rem;
      margin-bottom: 1rem;
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

    &__line {
      border: 0;
      height: 1px;
      background: $base-color-light;
      background-image: -webkit-linear-gradient(left, $base-color-light, $base-color, $base-color-light);
      
    }
    &__list {
      grid-row: 2 / -1;
      grid-column: center-start / center-end;
    }
  }
</style>