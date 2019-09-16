<template>
    <div>
        <OrderFormAdd></OrderFormAdd>
    </div>
</template>

<script>
    // @ is an alias to /src

    import OrderFormAdd from '@/components/OrderForm/OrderFormAdd.vue'


    export default {
        name: 'OrderAdd',
        components: {

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
