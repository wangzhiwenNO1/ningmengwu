<template>
    <div class="home-list">
        <HomeTop :hotelInfo="hotel"></HomeTop>
        <HomeBody></HomeBody>
    </div>
</template>

<script>
    // @ is an alias to /src
    import HomeTop from '@/components/HomeList/HomeTop.vue'
    import HomeBody from '@/components/HomeList/HomeBody.vue'

    export default {
        name: 'Homelist',
        components: {
            HomeTop,
            HomeBody,
        },
        data(){
            return {
                part:1,
                hotel:"",
            }
        },
        created() {
            if(this.$route.query){
                this.hotel=this.$route.query.hotel;
            }
        }
    }
</script>
