<template>
    <div class="body_element">
        <div class="form_details">
            <!--LEFT ROW-->
            <div class="form_details-row">
                <div class="form_details-input short margin-bottom">
                    <input id="name" v-model="name" type="text" placeholder="Company name">
                </div>
                <div class="form_details-input short margin-bottom">
                    <input id="contactname" v-model="contactName" type="text" placeholder="Contact name">
                </div>
                <div class="form_details-input short margin-bottom">
                    <input id="phone" v-model="phone" type="text" placeholder="Telephone">
                </div>
            </div>
            <!--RIGHT ROW-->
            <div class="form_details-row">
                <div class="form_details-input short margin-bottom">
                    <input id="email" v-model="email" type="email" placeholder="Email">
                </div>
                <div class="form_details-input long margin-bottom">
                    <input id="address" v-model="address" type="text" placeholder="Billing address">
                </div>
                <div class="form_details-input long margin-bottom">
                    <input id="delivery" v-model="delivery" type="text" placeholder="Shipping address">
                </div>
            </div>
        </div>
        <div class="btn_container">
            <div @click="exitPopup()" class="header__action"><p>Discard</p></div>
            <div @click="addCustomer()" class="header__action"><p>Add Customer</p></div>
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