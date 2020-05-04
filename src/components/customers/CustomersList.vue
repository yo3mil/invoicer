<template>
  <li class="customer" v-if="visible">
    <!--Customer-->
    <div v-if="!edit" class="customer__container customer">
      <div class="customer__name">
        <h3>{{ curName }}</h3>
        <h3>{{ curContactName }}</h3>
      </div>
      <h3 class="customer__address">{{ curAddress }}</h3>
      <h3 class="customer__address">{{ curDelivery }}</h3>
      <div class="customer__contact">
        <h3>{{ curPhone }}</h3>
        <h3>{{ curEmail }}</h3>
      </div>
     
    
      <!--Main Console-->
      <div class="customer__console" v-if="subConsole">
        <div @click="post()" class="customer__console-invoice"><i class="ion-printer"></i></div>
        <div @click="editFields()" class="customer__console-edit"><i class="ion-edit"></i></div>
        <div @click="subConsole = false" class="customer__console-delete"><i class="ion-trash-a"></i></div>
      </div>
      <!-- Y/N console after clicking del-->
      <div class="customer__console" v-else>
        <div @click="remove()" class="customer__console-yes"><i class="ion-checkmark"></i></div>
        <div @click="subConsole = true" class="customer__console-no"><i class="ion-close"></i></div>
      </div>
    </div>

    <!--EDIT-->
    <div v-else class="customer__container customer bg-lighter">
      <div class="customer__name">
        <input v-model="curName" type="text" class="edit_input">
        <input v-model="curContactName" type="text" class="edit_input">
      </div>
      <input v-model="curAddress" type="text" class="customer__address edit_input">
      <input v-model="curDelivery" type="text" class="customer__address edit_input">
      <div class="customer__contact">
        <input v-model="curPhone" type="text" class="edit_input">
        <input v-model="curEmail" type="text" class="edit_input">
      </div>
      <div class="customer__console">
          <div @click="approveEdit()" class="customer__console-edit"><i class="ion-checkmark-round"></i></div>
      </div>
    </div>
  </li>
  
</template>

<script>
import { deleteCustomer, updateCustomer } from '../../database/firestore.js';

export default {
    props: {
      name: { type: String, required: true },
      contactName: { type: String,required: true },
      email: { type: String, required: true },
      phone: { type: String, required: true},
      address: { type: String, required: true },
      delivery: { type: String, required: true }
      
    },
    data() {
      return {
        edit: false,
        visible: true,
        curName: this.name, 
        curContactName: this.contactName, 
        curAddress: this.address,
        curDelivery: this.delivery,
        curPhone: this.phone,
        curEmail: this.email, 
        subConsole: true
      }
    },
    methods: {
      remove() {
        deleteCustomer(this.$vnode.key);
        this.visible = false;
      },
      editFields() {
        this.edit = true;
      },
      approveEdit() {
        updateCustomer(this.$vnode.key, this.curName, this.curContactName, this.curAddress, this.curDelivery, this.curPhone, this.curEmail);
        this.edit = false;
      },
      post() {
        this.$store.state.customer.name = this.curName;
        this.$store.state.customer.contact = this.curContactName;
        this.$store.state.customer.address = this.curAddress;
        this.$store.state.customer.delivery = this.curDelivery;
        this.$store.state.customer.phone = this.curPhone;
        this.$store.state.customer.email = this.curEmail;
        this.$router.push({ path: '/invoicer' })
      }
    }
}
</script>

<style lang="scss">
    @import "../../styles/_base.scss";
    
    
    .customer {
        display: flex;
        width: 100%;
        height: 100%;
        max-height: 4.6rem;
        align-items: center;
        transition: all .1s;
        
        &:hover {
            background-color: $base-color-light;
        }
        &__name {
          width: 19%;
        }
        &__address {
          width: 40%;
        }
        &__contact {
          width: 18%;
        }
        // console style
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
          &-delete,
          &-invoice,
          &-yes,
          &-no {
            
            height: 100%;
            display: flex;
            justify-content: center;
            align-items: center;
            &:hover {
              transform: scale(1.1);
            }
          }
          &-edit,
          &-delete,
          &-invoice {
            width: 33%;
          }
          &-yes,
          &-no {
            width: 50%;
          }


          &-edit {
            color: $base-color;
          }
          &-delete {
            color: $color-red;
          }
          &-yes {
            color: $color-warning;
            
          }
          &-no {
            color: $color-ok;
          }
        }
    }
</style>