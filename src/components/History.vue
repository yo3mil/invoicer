<template>
  <div class="page__container bg-linear-yellow ">
    <div class="container">
      <div class="header">
        <!-- menu btn-->
        <div class="header__menu">
          <router-link tag="div" to="/invoicer" class="header__menu-circle header__menu-circle-1 bg-green"><i class="ion-compose"></i></router-link>
          <router-link tag="div" to="/customers" class="header__menu-circle header__menu-circle-2 bg-red"><i class="ion-ios-people"></i></router-link>
          <router-link tag="div" to="/products" class="header__menu-circle header__menu-circle-3 bg-blue"><i class="ion-grid"></i></router-link>
          <router-link tag="div" to="/menu" class="header__menu-circle header__menu-circle-4"><i class="ion-ios-home"></i></router-link>
        </div>
        <div class="header__title-container">
          <h1 class="header__title">history</h1>
        </div>
        
      </div>
      <div class="body">
      <div class="products">
        <div class="products__search">
          <input v-model="searched" class="products__search-input" type="text" placeholder="Search...">
          
        </div>
        <div class="products__header header-mg">
          <h2 class="customer__header-name">Number/Date</h2>
          <h2 class="customer__header-address">Company</h2>
          <h2 class="customer__header-address">Delivery Address</h2>
          <h2 class="customer__header-contact">Value</h2>
        </div>
        <div class="products__line">
          <hr class="products__line">
        </div>
      </div>
        <!--List With History-->
        <ul class="list">
          <history-list 
            v-for="entry in pageOfItems"
            :key="entry.id"
            :order="entry.products"
            :customer="entry.customer"
          ></history-list>
        </ul>

        <!--Footer with pagination-->
        <div class="footer">
          
          <jw-pagination :items="historyList" 
            :pageSize="7" 
            @changePage="onChangePage"
            :disableDefaultStyles="true"
            :labels="customLabels"
          ></jw-pagination>
        </div>
        
      </div>

      
    </div>
  </div>
</template>

<script>
const customLabels = {first: '<<',last: '>>',previous: '<',next: '>'};
import { historyCollection } from "../database/firestore.js";
import HistoryList from "./history/HistoryList.vue";
export default {
  components: {
    HistoryList
  },
  data() {
    return {
      history: [],
      historyList: [],
      searched: "",
      //jw pagination
      pageOfItems: [],
      customLabels
    }
  },
  mounted() {
    this.historyList = this.history;
  },
  firestore: {
    history: historyCollection
  },
  watch: {
    searched() {
      if(this.searched === "") {
        this.historyList = this.history;
      } else {
        this.historyList = [];
        this.updateSearch();
      }
    }
  },
  methods: {
    updateSearch() {
      for (let i = 0; i < this.history.length; i++) {
        if(this.history[i].customer.contact.toLowerCase().includes(this.searched.toLowerCase())
        || this.history[i].customer.info.orderNumber.toLowerCase().includes(this.searched.toLowerCase())) {
          this.historyList.push(this.history[i])
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
  .customer__header {
    &-name {
      width: 19%;
    }
    &-address {
      width: 40%;
    }
    &-contact {
      width: 29%;
    }
  }
</style>