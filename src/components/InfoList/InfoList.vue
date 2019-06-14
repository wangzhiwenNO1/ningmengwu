<template>
    <div class="info-box">
       <div class="info-list" v-for="(item,index) in 5" :key="index">
           <div class="time">2019-06-03 13:30</div>
           <div class="info">退房时间将临提醒：您的客房于14:00到时,如需 续住或延时请提前操作。</div>
       </div>
        <div class="info-list">
            <div class="time">2019-06-03 13:30</div>
            <div class="info">退房时间将临提醒：您的客房于14:00到时,如需 续住或延时请提前操作。</div>
        </div>
    </div>
</template>

<script>
    export default {
        name: 'InfoList',
        components: {
        }
    }
</script>
<style lang="less" scoped>

    .info-box{
        padding:15px;
        box-sizing:border-box;
        height:100%;
        background:rgba(245, 245, 245, 1);
        .info-list{
            background:rgba(255,255,255,1);
            box-shadow:0px 4px 8px 0px rgba(0,0,0,0.06);
            border-radius:5px;
            margin:10px 0;
            padding:5px 10px;
            .time{
                padding:10px 0 0;
                font-weight:400;
                color:rgba(162,162,162,1);
                line-height:17px;
                font-size:12px;
            }
            .info{
                text-align: left;
                padding:5px 0 10px;
                font-size:14px;
                color:rgba(70, 70, 70, 1);
            }
        }
    }
</style>
