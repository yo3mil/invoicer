<template>
    <div class="add__popup">
        <div class="product__popup-header">
            <h1>Add a customer</h1>
        </div>
        <div class="product__popup-input">
            <input v-model="name" placeholder="ENTER NAME" class="product__popup-input_area" type="text">
            <input v-model="contactName" placeholder="ENTER contact name" class="product__popup-input_area" type="text">
            <input v-model="address" placeholder="ENTER address" class="product__popup-input_area" type="text">
            <input v-model="delivery" placeholder="ENTER delivery address" class="product__popup-input_area" type="text">
            <input v-model="phone" placeholder="ENTER phone " class="product__popup-input_area" type="text">
            <input v-model="email" placeholder="ENTER email" class="product__popup-input_area" type="text">

           
        </div>
        <div class="product__popup-btn">
            <div @click="exitPopup()" class="btn__simple"><i class="ion-close"></i></div>
            <div @click="addCustomer()" class="btn__simple"><i class="ion-ios-download"></i></div>
        </div>
      </div>
  
</template>

<script>
import { saveCustomer } from "../../database/firestore.js";
export default {
    data() {
        return {
            name: '',
            contactName: '',
            address: '',
            delivery: '',
            phone: '',
            email: '',
            sameAddress: false
        }
    },
    methods: {
        exitPopup() {
            this.$emit('popupClosed', false);
        },
        addCustomer() {
            if(this.sameAddress) {
                this.delivery = this.address
            }
            saveCustomer(this.name, this.contactName, this.address, this.delivery, this.phone, this.email);
            this.exitPopup();
            this.clearFields();
        },
        clearFields() {
            this.name = "";
            this.contactName = "";
            this.address = "";
            this.delivery = "";
            this.phone = "";
            this.email = "";
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