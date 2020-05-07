<template>
    <li class="store_product">
        <h3 class="store_product-1">{{ code }}</h3>
        <h3 class="store_product-2">{{ name }}</h3>
        <h3 class="store_product-1">{{ size }}</h3>
        <h3 class="store_product-1">£{{ price }}</h3>
        <input v-if="!mode" v-model="itemQuantity" class="store_product-quantity" type="number" min="1">
        <div v-if="mode" @click="addProduct()" class="store_product-add"><i class="ion-android-add-circle"></i></div>
        <div v-if="!mode" @click="deleteProduct()" class="store_product-delete"><i class="ion-trash-a"></i></div>
    </li>
</template>

<script>
    import { products } from '../../../database/firestore';
    export default {
        props: {
            code: { type: String, required: true },
            name: { type: String,required: true },
            size: { type: String, required: true },
            price: { type: String, required: true},
            //if true its a product || false its a basket
            mode: { type: Boolean }
        },
        data() {
            return {
                itemQuantity: 1
            }
        },
        computed: {
            basket() {
                return this.$store.state.productsOrder;
            }
        },
        methods: {
            addProduct() {
                for(let i = 0; i < this.basket.length; i++) {
                    if(this.basket[i].id === this.$vnode.key) {
                        alert('This item is already in the basket');
                        return;
                    } 
                }
                for (let i = 0; i < products.length; i++) {
                    if(products[i].id === this.$vnode.key) {
                        
                        this.basket.push(products[i]);
                    }
                }
            },
            deleteProduct() {
                for (let i = 0; i < this.basket.length; i++) {
                    if(this.basket[i].id === this.$vnode.key) {
                        this.basket.splice(i,1);
                    }
                }
            }
        }
    }
</script>

<style lang="scss" scoped> 
    @import "../../../styles/_base.scss";

    .store_product {
        display: flex;
        width: 100%;
        height: 2rem;
        transition: all .1s;
        
        &:hover {
            background-color: $base-color-light;
        }
        &-1 {
            width: 25%;
            height: 100%;
            display: flex;
            align-items: center;
            justify-content: flex-start;
        }
        &-2 {
            width: 50%;
            display: flex;
            align-items: center;
            justify-content: flex-start;
        }

        &-add,
        &-delete {
            width: 25%;
            height: 100%;
            display: flex;
            align-items: center;
            justify-content: center;
            font-size: .9rem;
             cursor: pointer;
            &:hover {
                transform: scale(1.1);
            }
        }
        &-add {
            color: $base-color;
        }
        &-delete {
            color: $color-red;
        }
        &-quantity {
            border: 0;
            width: 12%;
            background-color: transparent;
        }
    }

</style>