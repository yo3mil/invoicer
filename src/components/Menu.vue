<template>
  <div class="page__container container">
      <div class=" menu">
          <div class="menu__header">
            <div class="menu__header-title">
                invoicing
            </div>
            <div @click="logout" class="menu__header-logout" >
                LOG OUT
            </div>
          </div>
          <ul class="menu__list">
              <router-link  tag="li" to="/invoicer" class="menu__element">
                <div @click="resetStore()" class="menu__element-icon bg-green">
                    <i class="ion-compose"></i>
                </div>
                <h2>new invoice</h2>
              </router-link>
              <router-link tag="li" to="/customers" class="menu__element">
                <div class="menu__element-icon bg-red">
                    <i class="ion-ios-people"></i>
                </div>
                <h2>customers</h2>
              </router-link>
              <router-link tag="li" to="/products" class="menu__element">
                <div class="menu__element-icon bg-blue">
                    <i class="ion-grid"></i>
                </div>
                <h2>products</h2>
              </router-link>
              <router-link tag="li" to="/history" class="menu__element">
                <div class="menu__element-icon bg-yellow">
                    <i class="ion-document-text"></i>
                </div>
                <h2>history</h2>
              </router-link>
          </ul>
            
      </div>
      <div class="credentials">
          <h3>Copyright &copy; EmilWojcik.com 2020</h3>
          <h3>All rights reserved.</h3>
      </div>
  </div>
</template>

<script>

    export default {
        computed: {
            
        },
        methods: {
            logout() {
                auth.signOut()
                .then(() => {
                    this.$router.push('/');
                });
            },
            resetStore() {
                this.$store.commit('resetState');
                console.log('hello')
            }
        }
    }
</script>

<style lang="scss" scoped>
    @import "../styles/_base.scss";
    
    .menu {
        height: 75vh;
        width: 70vw;
        display: flex;
        flex-direction: column;
        &__header {
            width: 100%;
            display: flex;
            align-items: center;
            justify-content: space-between;
            flex: 0 0 10%;
            &-title {
                font-size: 2.5rem;
                font-weight: 500;
                text-transform: uppercase;
            }
            &-logout {
                font-size: 1rem;
                font-weight: 500;
                border-bottom: 1px solid $font-color;
                cursor: pointer;
                transition: all .5s;
                &:hover {
                    opacity: .6;
                }
                &:active {
                    transform: scale(.9);
                }
            }
            
        }
        &__list {
            display: flex;
            flex: 1;
            justify-content: center;
            align-items: center;
            margin: auto 2rem;
        }
        &__element {
            width: 25%;
            height: 100%;
            display: flex;
            flex-direction: column;
            justify-content: center;
            align-items: center;
            
            &-icon {
               
               border-radius: 50%; 
               height: 200px;
               width: 200px;
               display: flex;
               justify-content: center;
               align-items: center;
               font-size: 150px;
               color: $color-white;
               margin-bottom: 1rem;
               cursor: pointer;
               &:hover {
                   animation: bounce 1.2s;
               }
               
               
               & i {
                   margin-bottom: 1rem;
               }
            }
            & h2 {
                font-size: 1.5rem;
            }
        }
    }
    .credentials {
        text-align: center;
        opacity: .6;
    }
</style>