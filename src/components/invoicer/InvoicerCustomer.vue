<template>
  <div class="body_element">
      <div class="form_details">
          <div class="form_details-row">
              <div class="form_details-input short">
                  <label for="name">Company name</label>
                  <input id="name" type="text">
              </div>
              <div class="form_details-input short">
                  <label for="contact">Contact Person</label>
                  <input id="contact" type="text">
              </div>
              <div class="form_details-input short">
                  <label for="email">Email</label>
                  <input id="email" type="text">
              </div>
              <div class="form_details-input short">
                  <label for="phone">Phone</label>
                  <input id="phone" type="text">
              </div>
          </div>
          <div class="form_details-row">
            <div class="form_details-input short">
                <label for="payment">Payment method</label>
                <select id="payment" name="payments">
                    <option value="paypal">PayPal</option>
                    <option value="transfer">Bank Transfer</option>
                    <option value="card">Debit/Credit Card</option>
                </select>
            </div>
            <div class="form_details-input long">
                <label for="biling">Biling address</label>
                <input id="biling" type="text">
            </div>
            <div class="form_details-input long">
                <label for="shipping">Shipping Address</label>
                <input id="shipping" type="text">
            </div>
          </div>
      </div>
  </div>
</template>

<script>
export default {

}
</script>

<style lang="scss">
    @import "../../styles/_base.scss";

    
</style>