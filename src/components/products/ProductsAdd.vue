<template>
    <div class="add__popup">
        <div class="product__popup-header">
            <h1>Add a product</h1>
        </div>
        <div class="product__popup-input">
            <input v-model="name" placeholder="ENTER NAME" class="product__popup-input_area" type="text">
            <input v-model="size" placeholder="ENTER SIZE" class="product__popup-input_area" type="text">
            <input v-model="price" placeholder="ENTER PRICE" class="product__popup-input_area" type="text">
            <div class="product__popup-checkbox">
                <h2>CALCULATE VAT</h2>
                <input type="checkbox" v-model="includeVat">
            </div>
        </div>
        <div class="product__popup-btn">
            <div @click="exitPopup" class="btn__simple"><i class="ion-close"></i></div>
            <div 
            @click="addProduct" class="btn__simple"
            ><i class="ion-ios-download"></i></div>
        </div>
      </div>
  
</template>

<script>
import { saveProduct } from "../../database/firestore.js";
export default {
    data() {
        return {
            name: '',
            size: '',
            price: '',
            vat: 0,
            includeVat: false
        }
    },
    methods: {
        exitPopup() {
            this.$emit('popupClosed', false);
        },
        addProduct() {
            if(this.includeVat) {
                this.vat = (this.price * 0.2).toFixed(2);
            } else {
                this.vat = 0;
            }
            saveProduct(this.name, this.size, this.price, this.vat);
            this.exitPopup();
            this.clearFields();
        },
        clearFields() {
            this.name = "";
            this.size = "";
            this.price = "";
        }
    }
}
</script>

<style lang="scss">
@import "../../styles/_base.scss";
 .product__popup {
     &-header {
        flex: 0 0 20%;
        display: flex;
        justify-content: center;
        align-items: center;
        color: $base-color;
        text-transform: uppercase;
    }
    &-input {
        flex: 1;
        display: flex;
        flex-direction: column;
        justify-content: space-evenly;
        align-items: center;

        
        &_area {
            width: 60%;
            height: 2rem;
            border-radius: 25px;
            color: $base-color;
            border-radius: 100px;
            border: 2px solid $base-color-light;
            background-color: $base-color-lighter;
            transition: all .5s;
            padding-left: 25%;
            font-weight: 600;
            
        }
    }
    &-btn {
        
        flex: 0 0 15%;
        display: flex;
        justify-content: center;
        align-items: center;  
        margin-bottom: 2rem;
        & i {
            color: $base-color;
        }
    }
 }

 
</style>