<template>
    <div>
        <OrderFormAdd></OrderFormAdd>
    </div>
</template>

<script>
    // @ is an alias to /src
    import OrderFormTop from '@/components/OrderForm/OrderFormTop.vue'
    import OrderFormAdd from '@/components/OrderForm/OrderFormAdd.vue'


    export default {
        name: 'OrderAdd',
        components: {
            OrderFormTop,
            OrderFormAdd
        },
        data(){
            return{
                part:1
            }
        },
        created() {

        }
    }
</script>
