<template>
    <div class="body_element">
        
        <div class="form_details">
            <div class="form_details-row">
                
                <div class="form_details-input short margin-bottom">
                    <input id="name" v-model="name" class="add__popup-input" type="text" placeholder="Product name">
                </div>
                <div class="form_details-input short margin-bottom">
                    <input id="category" v-model="category" class="add__popup-input" type="text" placeholder="Category">
                </div>
                <div class="form_details-input short margin-bottom">
                    <input id="size" v-model="size" class="add__popup-input" type="text" placeholder="Size">
                </div>
                
            </div>
            <div class="form_details-row">
                <div class="form_details-input short margin-bottom">
                    <input id="price" v-model="price"  class="add__popup-input" type="text" placeholder="Price (excl. VAT)">
                </div>
                
                <div class="form_details-input short margin-bottom">
                    
                    <select id="typeof" name="typeoffood" v-model="type">
                        <option value="D">Drink</option>
                        <option value="F">Frozen</option>
                        <option value="S">Snacks</option>
                        <option value="N">Noodles</option>
                        <option value="E">Other</option>
                        <option value="Z">Single</option>
                    </select>
                </div>

                <div class="form_details-input margin-bottom">
                    <label for="vat">CALCULATE VAT ?</label>
                    <input class="vat_checkbox" id="vat" type="checkbox" v-model="includeVat">
                </div>
            </div>
           
        </div>
        <div class="btn_container">
            <div @click="exitPopup" class="header__action"><p>Discard</p></div>
            <div @click="addProduct" class="header__action"><p>Add Product</p></div>
        </div>
        
        
    </div>
  
</template>

<script>
import { saveProduct, products } from "../../database/firestore.js";

export default {
    data() {
        return {
            name: '',
            size: '',
            price: '',
            vat: 0,
            includeVat: false,
            type: '',
            code: '',
            category: ''
        }
    },
    methods: {
        exitPopup() {
            this.$emit('popupClosed', false);
        },
        addProduct() {
            this.generateCode();
            if(this.includeVat) {
                this.vat = (this.price * 0.2).toFixed(2);
            } else {
                this.vat = 0;
            }
            saveProduct(this.name, this.size, this.price, this.vat, this.code, this.category);
            this.exitPopup();
            this.clearFields();
        },
        clearFields() {
            this.name = "";
            this.size = "";
            this.price = "";
            this.includeVat = false;
            this.category = "";
            this.type = "";
        },
        generateCode() {
            // function creates next number in the category
            let codeArr = [];
            let largest;
            for(let i = 0; i < products.length; i++){
                if(products[i].code.toLowerCase().includes(this.type.toLowerCase())){
                    codeArr.push(products[i].code.substring(1));
                } 
            }
            // in case there was no match:
            codeArr.push('0001')
            // find the largest
            largest = Math.max.apply(Math, codeArr);
            // creates zeros before the main generatet number
            largest = largest + 10001;
            this.code = this.type + (largest.toString().substring(1));
            console.log(this.code)
        }
    }
}
</script>

<style lang="scss">
@import "../../styles/_base.scss";
    
    
 .vat_checkbox {
     margin-right: auto;
 }


</style>