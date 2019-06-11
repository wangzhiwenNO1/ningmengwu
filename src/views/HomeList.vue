<template>
    <div class="home-list">
        <HomeTop></HomeTop>
        <HomeBody></HomeBody>
    </div>
</template>

<script>
    // @ is an alias to /src
    import HomeTop from '@/components/HomeList/HomeTop.vue'
    import HomeBody from '@/components/HomeList/HomeBody.vue'

    export default {
        name: 'home',
        components: {
            HomeTop,
            HomeBody
        }
    }
</script>
