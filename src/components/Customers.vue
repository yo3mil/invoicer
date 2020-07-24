<template>
  <div class="page__container bg-linear-red ">
    <div class="container">
      <div class="header">
        <!-- menu btn-->
        <div class="header__menu">
          <router-link tag="div" to="/invoicer" class="header__menu-circle header__menu-circle-1 bg-green"><i class="ion-compose"></i></router-link>
          <router-link tag="div" to="/products" class="header__menu-circle header__menu-circle-2 bg-blue"><i class="ion-grid"></i></router-link>
          <router-link tag="div" to="/history" class="header__menu-circle header__menu-circle-3 bg-yellow"><i class="ion-document-text"></i></router-link>
          <router-link tag="div" to="/menu" class="header__menu-circle header__menu-circle-4"><i class="ion-ios-home"></i></router-link>
        </div>
        <div class="header__title-container">
          <h1 class="header__title">Customers</h1>
        </div>
        
      </div>
      <div class="body" v-show="!addPopup">
        <!--Header with Search Element-->
        <customers-header @inputChange="searched = $event"></customers-header>
        <!--List With all Customers-->
        <ul class="list">
          <customers-list 
            v-for="customer in pageOfItems"
            :key="customer.id"
            :name="customer.name"
            :contactName="customer.contactName"
            :email="customer.email"
            :phone="customer.phone"
            :address="customer.address"
            :delivery="customer.deliveryAddress"
          ></customers-list>
        </ul>
        <!--Footer with pagination-->
        <div class="footer">
          
          <jw-pagination :items="allCustomers" 
            :pageSize="6" 
            @changePage="onChangePage"
            :disableDefaultStyles="true"
            :labels="customLabels"
          ></jw-pagination>
        </div>
        <div class="header__action header__action-right" @click="addPopup = true" v-show="!addPopup">
          <p>Add New</p>
        </div>
      </div>

      <!--Add a Customer Component-->
      <div class="body" v-show="addPopup">
        <customers-add  @popupClosed="addPopup = $event"></customers-add>
      </div>
    </div>
  </div>
</template>

<script>
// js pagination
const customLabels = {first: '<<',last: '>>',previous: '<',next: '>'};

import { customerCollection } from "../database/firestore.js";
import CustomersHeader from "./customers/CustomersHeader.vue";
import CustomersList from "./customers/CustomersList.vue";
import CustomersAdd from "./customers/CustomersAdd.vue";

export default {
  data() {
    return {
      customers: [],
      allCustomers: [],
      searched: "",
      addPopup: false,
      
      //jw pagination
      pageOfItems: [],
      customLabels
    }
  },
  mounted() {
    this.allCustomers = this.customers;
  },
  firestore: {
    customers: customerCollection
  },
  components: {
    CustomersHeader,
    CustomersList,
    CustomersAdd
  },
  watch: {
    searched() {
      if(this.searched === "") {
        this.allCustomers = this.customers;
      } else {
        this.allCustomers = [];
        this.updateSearch();
      }
    }
  },
  methods: {
    updateSearch() {
      for (let i = 0; i < this.customers.length; i++) {
        if(this.customers[i].name.toLowerCase().includes(this.searched.toLowerCase())
        || this.customers[i].contactName.toLowerCase().includes(this.searched.toLowerCase())) {
          this.allCustomers.push(this.customers[i])
        }
      }
    },
    //pagination setup
    onChangePage(pageOfitems) {
      this.pageOfItems = pageOfitems;
    }
    
  }
}
</script>

<style lang="scss">
  @import "../styles/_base.scss";
  .products__list {
    grid-row: 2 / -1;
    grid-column: center-start / center-end;
  }
</style>