<template>
  <li class="product">
      <h3 class="product__id">{{id}}</h3>
      <h3 class="product__name">{{name}}</h3>
      <h3 class="product__size">{{size}}</h3>
      <h3 class="product__price">£ {{price}}</h3>
      <h3 class="product__vat">£ {{vat}}</h3>
      <div class="product__console">
          <div class="product__console-edit"><i class="ion-edit"></i></div>
          <div class="product__console-delete"><i class="ion-trash-a"></i></div>
      </div>
  </li>
  
</template>

<script>
export default {
    props: {
        id: {
        type: String,
        required: true
      },
      name: {
        type: String,
        required: true
      },
      size: {
        type: String,
        required: true
      },
      price: {
        type: String,
        required: true
      },
      vat: {
        type: String,
        required: true
      }
    }
}
</script>

<style lang="scss">
    @import "../../styles/_base.scss";

    .product {
        display: flex;
        width: 100%;
        height: 2rem;
        
        align-items: center;
        transition: all .1s;
        &:hover {
            background-color: $base-color-light;
        }
        &__id,
        &__size,
        &__price {
            width: 16.2%;
            
        }
        &__name {
            width: 35%;
            
        }
        &__vat {
            width: 5%;
            
        }
        &__console {
            
            width: 11%;
            display: flex;
            align-items: center;
            justify-content: center;
            align-items: center;
            font-size: .9rem;
            cursor: pointer;
            height: 100%;
            &-edit,
            &-delete {
              width: 50%;
              height: 100%;
              display: flex;
              justify-content: center;
              align-items: center;
              
              &:hover {
                transform: scale(1.1);
              }
            }
            &-edit {
              color: $base-color;
            }
            &-delete {
              color: $color-red;
            }
        }
    }
</style>