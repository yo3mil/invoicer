<template>
  <div class="body_element">
      <div class="form_details">
          <div class="form_details-row">
              <div class="form_details-input short">
                  <label for="name">Company name</label>
                  <input v-model="customer.name" id="name" type="text">
              </div>
              <div class="form_details-input short">
                  <label for="contact">Contact Person</label>
                  <input v-model="customer.contact" id="contact" type="text">
              </div>
              <div class="form_details-input short">
                  <label for="email">Email</label>
                  <input v-model="customer.email" id="email" type="text">
              </div>
              <div class="form_details-input short">
                  <label for="phone">Phone</label>
                  <input v-model="customer.phone" id="phone" type="text">
              </div>
          </div>
          <div class="form_details-row">
            <div class="form_details-input short">
                <label for="payment">Payment method</label>
                <select v-model="customer.payment" id="payment" name="payments">
                    <option value="PayPal">PayPal</option>
                    <option value="Transfer">Bank Transfer</option>
                    <option value="Card">Debit/Credit Card</option>
                </select>
            </div>
            <div class="form_details-input long">
                <label for="biling">Biling address</label>
                <input v-model="customer.address" id="biling" type="text">
            </div>
            <div class="form_details-input long">
                <label for="shipping">Shipping Address</label>
                <input v-model="customer.delivery" id="shipping" type="text">
            </div>
          </div>
      </div>
  </div>
</template>

<script>
export default {
    data() {
        return {
            customer: {
                name: '',
                contact: '',
                phone: '',
                email: '',
                address: '',
                delivery: '',
                payment: ''
            }
        }
    }
}
</script>

<style lang="scss">
    @import "../../styles/_base.scss";

    
</style>