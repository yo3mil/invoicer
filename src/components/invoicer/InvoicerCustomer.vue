<template>
  <div class="body_element">
      <div class="form_details">
          <div class="form_details-row">
              <div class="form_details-input short">
                  <input v-model="customer.name" id="name" type="text" placeholder="Company">
              </div>
              <div class="form_details-input short">
                  <input v-model="customer.contact" id="contact" type="text" placeholder="Contact person">
              </div>
              <div class="form_details-input short">
                  <input v-model="customer.email" id="email" type="email" placeholder="Email">
              </div>
              <div class="form_details-input short">
                  <input v-model="customer.phone" id="phone" type="text" placeholder="Telephone">
              </div>
          </div>
          <div class="form_details-row">
            <div class="form_details-input short">
                <select v-model="customer.payment" id="payment" name="payments" required>
                    <option value="" disabled selected>Payment Method</option>
                    <option>PayPal</option>
                    <option>Bank Transfer</option>
                    <option>Debit/Credit Card</option>
                </select>
            </div>
            <div class="form_details-input long">
                
                <input v-model="customer.address" id="biling" type="text" placeholder="Billing Address">
            </div>
            
            <div class="form_details-input long">
                
                <input v-model="customer.delivery" id="shipping" type="text" :disabled="deliveryAddress" placeholder="Delivery Address">
                <div class="same_address">
                    <input v-model="deliveryAddress" id="addresscheckbox" type="checkbox" @change="copyAddress()" >
                    <label for="addresscheckbox">Same as billing address</label>
                </div>
            </div>
            
          </div>
      </div>
  </div>
</template>

<script>
export default {
    data() {
        return {
            deliveryAddress: false,
        }
    },
    computed: {
        customer() {
            return this.$store.state.customer;
        }
    },
    methods: {
        copyAddress() {
            if(this.deliveryAddress) {
                this.customer.delivery = this.customer.address;
            } else {
                this.customer.delivery = "";
            }
        }
    }
        
}
</script>

<style lang="scss" scoped>
    @import "../../styles/_base.scss";

    .same_address {
        height: 1.5rem;
        display: flex;
        justify-content: flex-start;
        align-items: center;
        & label {
            font-size: 90%;
            margin-top: .3rem;
            margin-left: .3rem;
        }
    }
    
</style>