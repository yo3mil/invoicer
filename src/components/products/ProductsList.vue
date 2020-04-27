<template>
  <li class="product" v-if="visible">
    <div v-if="!edit" class="product__container product">
      <h3 class="product__id">{{ curCode }}</h3>
      <h3 class="product__name">{{ curName }}</h3>
      <h3 class="product__size">{{ curSize }}</h3>
      <h3 class="product__price">£ {{ curPrice }}</h3>
      <h3 class="product__vat">£ {{ curVat }}</h3>
      <div class="product__console">
          <div @click="editFields()" class="product__console-edit"><i class="ion-edit"></i></div>
          <div @click="remove()" class="product__console-delete"><i class="ion-trash-a"></i></div>
      </div>
    </div>

    <div v-else class="product__container product bg-lighter">
      <input v-model="curCode" type="text" class="product__id  edit_input">
      <input v-model="curName" type="text" class="product__name edit_input">
      <input v-model="curSize" type="text" class="product__size edit_input">
      <input v-model="curPrice" type="text" class="product__price edit_input">
      <input v-model="curVat" type="text" class="product__vat edit_input">
      <div class="product__console">
          <div @click="approveEdit()" class="product__console-edit"><i class="ion-checkmark-round"></i></div>
      </div>
    </div>
  </li>
  
</template>

<script>
import { deleteProduct, updateProduct } from '../../database/firestore.js';

export default {
    props: {
      code: { type: String, required: true },
      name: { type: String,required: true },
      size: { type: String, required: true },
      price: { type: String, required: true},
      vat: { type: [String, Number], required: true }
      
    },
    data() {
      return {
        edit: false,
        visible: true,
        curCode: this.code, curName: this.name, curSize: this.size, curPrice: this.price, curVat: this.vat
      }
    },
    methods: {
      remove() {
        deleteProduct(this.$vnode.key);
        this.visible = false;
      },
      editFields() {
        this.edit = true;
      },
      approveEdit() {
        updateProduct(this.$vnode.key, this.curCode, this.curName, this.curSize, this.curPrice, this.curVat);
        this.edit = false;
      }
    }
}
</script>

<style lang="scss">
    @import "../../styles/_base.scss";
    .bg-lighter {
      background-color: $base-color-light;
    }
    .edit_input {
      margin-right: 1rem;
      color: $base-color;
      outline: none;
      border-radius: 100px;
      border: 2px solid $base-color-light;
      background-color: $base-color-lighter;
      
      padding-left: 6px ;
    }
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