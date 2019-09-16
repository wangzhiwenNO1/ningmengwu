<template>
    <div class="">
        <div class="bgBox"></div>
        <ul class="infoList infinite-list info-box" v-infinite-scroll="load" >
            <li class="infinite-list-item" v-for="(item,index) in 15" :key="index" >
                <div class="info-list">
                    <div class="time">2019-06-03 13:30</div>
                    <div class="info">退房时间将临提醒：您的客房于14:00到时,如需 续住或延时请提前操作。</div>
                </div>
            </li>
        </ul>
        <p v-if="loading">加载中...</p>
        <p v-if="noMore">没有更多了</p>


<!--       <div class="info-list" v-for="(item,index) in 5" :key="index">-->
<!--           <div class="time">2019-06-03 13:30</div>-->
<!--           <div class="info">退房时间将临提醒：您的客房于14:00到时,如需 续住或延时请提前操作。</div>-->
<!--       </div>-->
<!--        <div class="info-list">-->
<!--            <div class="time">2019-06-03 13:30</div>-->
<!--            <div class="info">退房时间将临提醒：您的客房于14:00到时,如需 续住或延时请提前操作。</div>-->
<!--        </div>-->
    </div>
</template>

<script>
    export default {
        name: 'InfoList',
        components: {
        },
        data() {
            return {
                current_page:"",
                infoList:[],
                loading:false,
                last_page:"",
            }
        },
        computed: {
            noMore () {
                return this.current_page > this.last_page;
            },
            disabled () {
                return this.loading || this.noMore
            }
        },
        created(){

        },
        methods:{
            getInfoList(){
                this.submitForm({
                    url: "hotel/lists", data: {page:this.current_page}, callback: (data) => {
                        console.log("hotel/lists",data);
                        if (data.error == 0) {
                            if(data.data.current_page==1){
                                this.infoList=data.data.data;
                            }else{
                                this.infoList.push(data.data.data);
                            }
                            this.current_page=data.data.current_page;
                            this.last_page=data.data.last_page;
                        }
                    }
                })
            },
            load () {
                console.log(this.infoList);
                this.loading = true;

                if(this.current_page==this.last_page){
                    this.loading = false;
                }else{
                    this.current_page++;
                    this.getInfoList();
                }
            }
        }
    }
</script>
<style lang="less" scoped>
    .bgBox{
        position:fixed;
        width:100%;
        height:calc(100vh - 50px);
        background: #f5f5f5;
        z-index: -1000;
    }
    .info-box{
        padding:15px;
        box-sizing:border-box;
        height:100%;
        background:rgba(245, 245, 245, 1);
        .info-list{
            background:rgba(255,255,255,1);
            box-shadow:0px 4px 8px 0px rgba(0,0,0,0.06);
            border-radius:5px;
            margin-bottom:1rem;
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
