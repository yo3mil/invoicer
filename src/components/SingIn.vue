<template>
  <div class="page__container">
      <div class="container login">
          <div class="login__console">
              <div class="form_details-input">
                
                <input v-model="email" id="signin-login" type="email">
                <label for="signin-login">Login</label>
              </div>
              <div class="form_details-input">
                
                <input v-model="password" id="signin-password" type="password">
                <label for="signin-password">password</label>
              </div>
              <div @click="login" class="login__console-btn" >
                  LOG IN
              </div>
              
            </div>
      </div>
  </div>
</template>

<script>
    export default {
        data() {
            return {
                email: '',
                password: ''
            }
        },
        methods: {
            login() {
                const data = auth.signInWithEmailAndPassword(this.email, this.password)
                .then(
                    user => {
                        alert(`Loged in as: ${user.user.email}`)
                        this.$router.replace({path: '/menu'})
                    },
                    err => {
                        alert(err.message);
                    }
                )
            }
        }
    }
</script>

<style lang="scss">
    @import "../styles/_base.scss";

    .login {
        height: 100vh;
        display: flex;
        justify-content: center;
        align-items: center;
        &__console {
            width: 12rem;
            height: 8rem;
            display: flex;
            justify-content: center;
            align-items: center;
            flex-direction: column;
            &-user,
            &-password {
                width: 100%;
                display: flex;
                justify-content: center;
                align-items: center;
                flex-direction: column;
                text-transform: uppercase;
            }
            &-btn {
                background-color: #fff;
                width: 3rem;
                text-align: center;
                margin-top: 1rem;
                cursor: pointer;
            }
        }
    }
</style>