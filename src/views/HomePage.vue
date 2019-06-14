<template>
    <div class="">
        <HomePages></HomePages>
    </div>
</template>

<script>
    // @ is an alias to /src
    import HomePages from '@/components/HomePage/HomePages.vue'

    export default {
        name: 'Hotel',
        components: {
            HomePages
        }
    }
</script>
