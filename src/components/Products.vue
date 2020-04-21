<template>
  <div class="page__container">
      <div class="container">
        <div class="header">
          <router-link tag="div" class="header__menu" to="/">
            <a href="#">MENU</a>
          </router-link>
          <h1 class="header__title">Products</h1>
          <div class="header__action"><a href="#">GO</a></div>
        </div>
        <div class="body">
          <ul>
            <li v-for="product in productList">
              <p> {{ product.product }}</p>
              <p> {{ product.priceVat }}</p>
              <p> {{ product.category }}</p>
            </li>
          </ul>
        </div>
      </div>
  </div>
</template>

<script>
import products from "../database/firestore.js";

export default {
  data() {
    return {
      productList: products
    }
  }
}
</script>

<style lang="scss">
  ul {
    grid-column: center-start / center-end;
    
    
    & li {
      display: flex;
      margin-bottom: 2rem;
      & p {
        margin-right: 5rem;
      }
      
    }

  }
</style>