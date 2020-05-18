<template>
  <div class="page__container bg-linear-red ">
    <div class="container">
      <div class="header">
        <!-- menu btn-->
        <router-link tag="div" class="header__menu" to="/menu">
          <div class="menu__icon"><div></div><div></div><div></div></div>
        </router-link>
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

import { customers } from "../database/firestore.js";
import CustomersHeader from "./customers/CustomersHeader.vue";
import CustomersList from "./customers/CustomersList.vue";
import CustomersAdd from "./customers/CustomersAdd.vue";
export default {
  data() {
    return {
      allCustomers: customers,
      searched: "",
      addPopup: false,
      
      //jw pagination
      pageOfItems: [],
      customLabels
    }
  },
  components: {
    CustomersHeader,
    CustomersList,
    CustomersAdd
  },
  watch: {
    searched() {
      if(this.searched === "") {
        this.allCustomers = customers;
      } else {
        this.allCustomers = [];
        this.updateSearch();
      }
    }
  },
  methods: {
    updateSearch() {
      for (let i = 0; i < customers.length; i++) {
        if(customers[i].name.toLowerCase().includes(this.searched.toLowerCase())
        || customers[i].contactName.toLowerCase().includes(this.searched.toLowerCase())) {
          this.allCustomers.push(customers[i])
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