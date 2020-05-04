<template>
    <div class="body_element">
        <div class="form_details">
            <div class="form_details-row">
                    
                <div class="form_details-input short">
                    <label for="Name">Company Name</label>
                    <input id="name" v-model="name" type="text">
                </div>
                <div class="form_details-input short">
                    <label for="contactname">Contact Name</label>
                    <input id="contactname" v-model="contactName" type="text">
                </div>
                <div class="inline short">
                    <div class="form_details-input short">
                        <label for="phone">Phone</label>
                        <input id="phone" v-model="phone" type="text">
                    </div>
                    <div class="form_details-input short mg">
                        <label for="email">email</label>
                        <input id="email" v-model="email" type="text">
                    </div>
                </div>
            </div>
            <div class="form_details-row">
                
                <div class="form_details-input long">
                <label for="address">Company Address</label>
                    <input id="address" v-model="address" type="text">
                </div>

                <div class="form_details-input long">
                    <label for="delivery">Delivery Address</label>
                    <input id="delivery" v-model="delivery" type="text">
                </div>
                
                
                <div class="form_details-input">
                    <label>Add this product ?</label>
                    <div class="form_details-console">
                        <div @click="exitPopup()" class="btn__simple"><i class="ion-close"></i></div>
                        <div @click="addCustomer()" class="btn__simple"><i class="ion-ios-download"></i></div>
                    </div>
                    
                </div>
            </div>
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
 

 .inline {
     display: flex;
     
     justify-content: space-between;
 }
 .mg {
     margin-left: 2rem;
 }
</style>