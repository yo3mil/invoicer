<template>
    <div class="add__popup">
        <div class="add__popup-header">
            <h1>Add a product</h1>
        </div>
        <div class="add__popup-body">
            <label for="name" class="add__popup-label">Name</label>
            <input id="name" v-model="name" placeholder="Name" class="add__popup-input" type="text">
            
            <label for="size" class="add__popup-label">Size</label>
            <input id="size" v-model="size" placeholder="Size" class="add__popup-input" type="text">
            
            <label for="price" class="add__popup-label">Price</label>
            <input id="price" v-model="price" placeholder="Price" class="add__popup-input" type="text">
           
           <div class="add__popup-checkbox">
                <label for="vat" class="add__popup-label">CALCULATE VAT</label>
                <input id="vat" type="checkbox" v-model="includeVat">
            </div>
        </div>
        <div class="add__popup-console">
            <div @click="exitPopup" class="btn__simple"><i class="ion-close"></i></div>
            <div @click="addProduct" class="btn__simple"><i class="ion-ios-download"></i></div>
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

    .add__popup {
        grid-column: center-start / center-end;
        grid-row: 1 / -1;
        &-header {

        }
        &-body {
            position: relative;
            padding: 15px 0 0;
            margin-top: 10px;
            width: 50%;
        }
        &-checkbox {

        }
        &-console {

        }
    }   
 
</style>