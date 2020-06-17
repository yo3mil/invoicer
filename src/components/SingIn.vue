<template>
  <div class="signin bg-linear-login">
      <div class="container login">
        <div class="login__header mg">
            <h1>Invoicing</h1>
            <h3>made simple.</h3>
        </div>
        <div class="login__console">
            <div class="form_details-input mg">
                <input v-on:keyup.enter="login" v-model="email" id="signin-login" type="email" placeholder="Login">
            </div>
            <div class="form_details-input mg">
                <input v-on:keyup.enter="login" v-model="password" id="signin-password" type="password" placeholder="Password">
            </div>
            <div @click="login"  class="login__console-btn" >
               <h3>Log-in</h3> 
            </div>
        </div>
      </div>
  </div>
</template>
<script>
import { auth } from "../database/firestore.js";
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

<style lang="scss" scoped>
    @import "../styles/_base.scss";
    .signin {
        width: 100%;
        height: 100vh;
        display: flex;
        
    }
    .login {
        align-self: center;
        justify-self: center;
        height: 16rem;
        display: flex;
        flex-direction: column;
        justify-content: space-between;
        align-items: center;
        &__header {
            color: $color-white;
            display: flex;
            flex-direction: column;
            justify-content: center;
            align-items: center;
            font-size: 150%;
            & h3 {
                font-size: 90%;
            }
        }
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
                color: $color-white;
                background-color: $color-blue;
                width: 4rem;
                height: 5rem;
                padding: .5rem;
                text-align: center;
                
                cursor: pointer;
                &:hover {
                    transform: scale(1.1);

                }
                &:active {
                    transform: scale(1);
                }
            }
        }
    }
    .mg {
        margin-bottom: 2rem;
    }
</style>