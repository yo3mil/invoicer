<template>
  <div class="print_container">
    <div class="print" >
      <div class="print__header">
        <div class="print__header-logo">
          <img :src="logo" alt="oriental logo">
        </div>
        <div class="print__header-contact">
          <h3>6-8 Heathcoat Street, Nottingham NG1 3AA</h3>
          <h3>0115 950 6615</h3>
          <h3>sales@orientalmart.co.uk</h3>
          <h3>www.orientalmart.co.uk</h3>
        </div>
      </div>
      <hr>
      <!-- Invoice TYPE AND ORDER NUMBER -->
      <div class="print__title">
        <h2>
          <span v-if="customer.info.orderType === 'invoice'">Invoice For Order: </span>
          <span v-if="customer.info.orderType === 'credit'">Credit Note For Order: </span>
          <span v-if="customer.info.orderType === 'quote'">Quotation For </span>
          {{ customer.info.orderNumber}}
        </h2>
        <h3>Date: {{ customer.info.orderDate }}</h3>
      </div>

      <!-- Invoice CUSTOMER DETAILS -->
      <div class="print__details">
        <div class="print__details-customer">
          <div class="print__list-title">
            <h3>Your Details</h3>
          </div>
          <div class="print__details-line">
            <h3 class="print__details-line-1">Company:</h3><h3>{{customer.name}}</h3>
          </div>
          <div class="print__details-line">
            <h3 class="print__details-line-1">Telephone:</h3><h3>{{customer.phone}}</h3>
          </div>
          <div class="print__details-line">
            <h3 class="print__details-line-1">Email:</h3><h3>{{customer.email}}</h3>
          </div>
          <div class="print__details-line">
            <h3 class="print__details-line-1">Contact Person:</h3><h3>{{customer.contact}}</h3>
          </div>
          <div class="print__details-line">
            <h3 class="print__details-line-1">Billing Address:</h3><h3>{{customer.address}}</h3>
          </div>
          <div class="print__details-line">
            <h3 class="print__details-line-1">Delivery Address:</h3><h3>{{customer.delivery}}</h3>
          </div>
          <div class="print__details-line">
            <h3 class="print__details-line-1">Payment Method:</h3><h3>{{customer.payment}}</h3>
          </div>
          <div class="print__details-line">
            <h3 class="print__details-line-1">Note:</h3><h3>{{customer.notes}}</h3>
          </div>
        </div>
        
      </div>

       <!-- Invoice LIST of items -->
      <div class="print__list">
        <div class="print__list-title">
          <h3 class="print__list-title-1">Item</h3><h3>Size</h3><h3 class="qty">Qty</h3><h3>Price</h3><h3>Tax</h3><h3>Total</h3>
        </div>
        <ul class="print__list-list">
          <li class="print__list-list_element"
              v-for="item in basket"
              :key="item.id"
          >
          <h3 class="print__list-list_element-1">{{item.product}}</h3>
          <h3>{{item.size}}</h3><h3 class="qty">{{item.quantity}}</h3>
          <h3>£{{twoDecimals(item.priceNoVat)}}</h3>
          <h3>£{{twoDecimals(item.vat)}}</h3>
          <!-- in invoice total is without vat, in quote with-->
          <h3 v-if="customer.info.orderType != 'quote'">£{{twoDecimals(item.quantity * item.priceNoVat)}}</h3>
          <h3 v-else>£{{ twoDecimals(item.quantity * (Number(item.priceNoVat) + Number(item.vat))) }}</h3>
        </li>
        </ul>

        <!-- Invoice summary -->
        <div class="print__list-summary" v-if="customer.info.orderType != 'quote'">
          <div class="print__list-list_element">
            <h3 class="print__list-list_element-1"></h3><h3></h3><h3></h3>
            <h3 class="bold">Subtotal:</h3>
            <h3>£{{ twoDecimals(totalPrice) }}</h3>
          </div>
          <div class="print__list-list_element">
            <h3 class="print__list-list_element-1"></h3><h3></h3><h3></h3>
            <h3 class="bold">Shipping:</h3>
            <h3>£{{ twoDecimals(customer.info.shipping) }}</h3>
          </div>
          <div class="print__list-list_element">
            <h3 class="print__list-list_element-1"></h3><h3></h3><h3></h3>
            <h3 class="bold">Tax:</h3>
            <h3>£{{ twoDecimals(totalVat + (vatCalculator(customer.info.shipping) - customer.info.shipping)) }}</h3>
          </div>
          <div class="print__list-list_element" v-if="customer.info.discount > 0">
            <h3 class="print__list-list_element-1"></h3><h3></h3><h3></h3>
            <h3 class="bold">Discount*:</h3>
            <h3>{{ customer.info.discount }}%</h3>
          </div>
          <div class="print__list-list_element">
            <h3 class="print__list-list_element-1"></h3><h3></h3><h3></h3>
            <h3 class="bold">Total:</h3>
            <h3>£{{twoDecimals(total)}}</h3>
          </div>
        </div>
        <p v-if="customer.info.discount > 0">*Discount does not apply to shipping.</p>
      </div>
      
      <hr>
      <div class="print__footer">
        <h4>Oriental Mart - 6-8 Heathcoat Street, Nottingham, NG1 3AA</h4>
        <h4>VAT Registration Number: 934 6629 96 - Company Registered in England & Wales: 6443285</h4>
      </div>
    </div>
      
  </div>
</template>

<script>

import { mapGetters } from 'vuex';
import { calculators } from '../../../mixins/mixins.js'
export default {
  data() {
    return {
      logo: "http://ominvoicing.online/dist/logo.png"
    }
  },
  created() {
    setTimeout(()=> {window.print();}, 1000);
    setTimeout(() => {this.$router.replace({path: '/menu'})}, 1100);
  },
  mixins: [ calculators ],
  computed: {
    ...mapGetters([
        'totalPrice', 'totalVat', 'subTotal','basket','customer'
      ]),
      total() {
        return (this.discountCalculator(this.totalPrice, this.customer.info.discount) + Number(this.customer.info.shipping) + this.totalVatIncludingShipping);
      },
      totalVatIncludingShipping() {
        return this.discountCalculator(this.totalVat, this.customer.info.discount) + Number(this.customer.info.shipping * 0.2)
      }
  }
}
</script>

<style lang="scss" scoped>
  @import "../../../styles/_base.scss";
  .print_container {
    height: 100%;
    
    width: 100%;
    display: flex;
    justify-content: center;
    align-items: center;
    background-color: gray;
  }
  .print {
    width: 21cm;
    height: 90%;
    min-height: 100vh;
    background-color: white;
    padding: .5cm .5cm;
    &__details-customer {
      margin-bottom: 1.3rem;
    }
    &__details-line {
      display: flex;
      margin-bottom: .2rem;
      &-1 {
        width: 20%;
        font-weight: bold;
        
      }
    }
    &__header {
      width: 100%;
      height: 3cm;
      display: flex;
      &-logo {
        flex: 0 0 65%;
        height: 100%;
        //background-image: url('../../../assets/logo.png');
        background-position: cover;
        background-repeat: no-repeat;
      }
      &-contact {
        height: 80%;
        flex: 1;
        display: flex;
        flex-direction: column;
        justify-content: space-between;
        align-items: flex-end;
      }
    }
    &__title {
      height: 2cm;
      & h2 {
        font-weight: bold;
        margin-top: 20px;
        margin-bottom: 15px;
      }
    }
    &__list {
      width: 100%;
      display: flex;
      flex-direction: column;
      margin-bottom: 20px;
      &-title {
        background-color: rgb(240, 240, 240) ;
      }
      &-title,
      &-list_element {
        border-bottom: 1px dotted rgb(201, 199, 199);
        display: flex;
        width: 100%;
        height: 25px;
        align-items: center;
        &-1 {
          width: 60%;
        }
        & h3:not(:first-child) {
            width: 10%
        }
        
      }
      
      &-summary {
          background-color: rgb(240, 240, 240) ;
          width: 100%;
        &-element {
          
          display: flex;
          width: 10%;
        }
      }
    }

    
    &__footer {
      display: flex;
      flex-direction: column;
      justify-content: center;
      align-items: center;
      height: 2cm;
      
    }

  }
  .qty {
    text-align: center;
    width: 10%;
    margin-right: .7rem;
  }
  .bold {
    font-weight: bold;
  }

</style>