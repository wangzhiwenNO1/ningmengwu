<template>
    <div class="">
        <HotelList></HotelList>
    </div>
</template>

<script>
    // @ is an alias to /src
    import HotelList from '@/components/HotelList/HotelList.vue'

    export default {
        name: 'Hotel',
        components: {
            HotelList
        }
    }
</script>
