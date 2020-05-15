<template>
  <div class="page__container bg-linear-yellow ">
    <div class="container">
      <div class="header">
        <!-- menu btn-->
        <router-link tag="div" class="header__menu" to="/menu">
          <div class="menu__icon"><div></div><div></div><div></div></div>
        </router-link>
        <div class="header__title-container">
          <h1 class="header__title">history</h1>
        </div>
        
      </div>
      <div class="body" v-show="!addPopup">
        
        <!--List With all Customers-->
        <ul class="list">
          
        </ul>

        <!--Footer with pagination-->
        <div class="footer">
          
          <!-- <jw-pagination :items="allCustomers" 
            :pageSize="6" 
            @changePage="onChangePage"
            :disableDefaultStyles="true"
            :labels="customLabels"
          ></jw-pagination> -->
        </div>
        
      </div>

      
    </div>
  </div>
</template>

<script>
export default {

}
</script>

<style>

</style>