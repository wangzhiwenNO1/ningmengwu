<template>
    <div>
        <OrderFormTop></OrderFormTop>
        <XuZhu v-if="part==1"></XuZhu>
        <YanShi v-if="part==2"></YanShi>
        <TuiFang v-if="part==3"></TuiFang>
    </div>
</template>

<script>
    // @ is an alias to /src
    import OrderFormTop from '@/components/OrderForm/OrderFormTop.vue'
    import XuZhu from '@/components/OrderForm/XuZhu.vue'
    import YanShi from '@/components/OrderForm/YanShi.vue'
    import TuiFang from '@/components/OrderForm/TuiFang.vue'

    export default {
        name: 'OrderForm',
        components: {
            OrderFormTop,
            XuZhu,
            YanShi,
            TuiFang
        },
        data(){
            return{
                part:3
            }
        }
    }
</script>
