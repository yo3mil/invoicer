<template>
  <div class="page__container">
      <div class="container menu">
          <ul class="menu__list">
              <router-link tag="li" to="/invoicer" class="menu__element">
                  <a href="#">new invoice</a>
              </router-link>
              <router-link tag="li" to="/customers" class="menu__element">
                  <a href="#">customers</a>
              </router-link>
              <router-link tag="li" to="/products" class="menu__element">
                  <a href="#">products</a>
              </router-link>
              <router-link tag="li" to="/history" class="menu__element">
                  <a href="#">history</a>
              </router-link>
          </ul>
      </div>
  </div>
</template>

<script>

    export default {

    }
</script>

<style lang="scss" scoped>
    @import "../styles/_base.scss";

    .menu {
        background-color: $base-color;
        height: 100vh;
        &__list {
            display: flex;
            flex-direction: column;
            justify-content: center;
            align-items: center;
            
        }
        &__element {
            font-size: 400%;
            margin-bottom: 15px;

            & a {
                text-transform: uppercase;
                text-decoration: none;
                color: $color-white;
            }
        }
    }
</style>