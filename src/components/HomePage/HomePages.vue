<template>
    <div class="homepage">
        <div class="head">
            <h2>张先生，您好</h2>
            <div class="text">您已经超过退房时间暂无法开锁 请办理续住或者延时后开锁</div>
        </div>
        <div class="action">
            <el-row type="flex">
                <el-col :span="8">
                    <i class="icon xuzhu" @click="changeClick(1)"></i>
                    <div>续住</div>
                </el-col>
                <el-col :span="8">
                    <i class="icon yanshi" @click="changeClick(2)"></i>
                    <div>延时</div>
                </el-col>
                <el-col :span="8">
                    <i class="icon tuifang" @click="changeClick(3)"></i>
                    <div>退房</div>
                </el-col>
            </el-row>
        </div>
        <swiper :options="swiperOption" ref="mySwiper" @someSwiperEvent="callback">
            <!-- slides -->
            <swiper-slide v-for="(item,index) in dataList" :key="index">
                <div class="card">
                    <h1>8012</h1>
                    <i class="xian"></i>
                    <h4>WELCOME</h4>
                    <div>自然开房，就是这么方便！</div>
                    <i class="yuan"></i>
                </div>
            </swiper-slide>

            <!-- Optional controls -->
            <div class="swiper-pagination" slot="pagination"></div>
        </swiper>

        <div class="lockBox" @click="handleClose" v-if="!locking">
            <div class="lock">
                <img src="../../assets/img/homepage/kai.png" alt="">
            </div>
            <div class="lockText">已入住</div>
        </div>

        <div class="lockBox blankBox" @click="handleClose" v-else>
            <div class="lock">
                <img src="../../assets/img/homepage/suo.png" alt="">
            </div>
            <div class="lockText">已锁定</div>
        </div>
        <div class="messageBox " v-if="message" @click="handleClose">
            <div class="message">
                <i class="icon"></i>
                <div class="messageText">
                    您已经超过退房时间暂无法开锁 请办理续住或者延时后开锁
                </div>
            </div>
        </div>
    </div>

</template>

<script>
    import {mapActions} from 'vuex'
    import {swiper, swiperSlide} from 'vue-awesome-swiper'

    export default {
        name: 'HomePages',
        components: {
            swiper,
            swiperSlide
        },
        data() {
            return {
                dataList:[],
                roomInfo:"",
                endDate:"",//离店日期
                order_id:"",//订单id
                message: false,
                locking:false,//锁定
                swiperOption: {
                    // some swiper options/callbacks
                    // 所有的参数同 swiper 官方 api 参数
                    // ...
                    centeredSlides: true,
                    autoplay: false,
                    pagination: {
                        el: '.swiper-pagination',
                        type: 'fraction',
                    },
                    on: {
                        slideChangeTransitionStart: function(){
                            console.log(this.activeIndex);
                        },
                    },
                }
            }
        },
        computed: {
            swiper() {
                return this.$refs.mySwiper.swiper
            }
        },
        mounted() {
            // current swiper instance
            // 然后你就可以使用当前上下文内的swiper对象去做你想做的事了
            this.swiper.slideTo(3, 1000, false);
            this.getList();

        },
        methods: {
            ...mapActions(['submitForm']),
            handleClose() {
                if(this.locking){
                    this.message = !this.message;
                }
            },
            changeClick(idx) {
                console.log(this.roomInfo);
                switch (idx) {
                    case 1:
                        this.$router.push({path: '/order', query: {type: 1,order_id:this.roomInfo.id,roomId:this.roomInfo.room_id}});
                        break;
                    case 2:
                        this.$router.push({path: '/order', query: {type: 2,order_id:this.roomInfo.id,roomId:this.roomInfo.room_id}});
                        break;
                    case 3:
                        this.$router.push({path: '/order', query: {type: 3,order_id:this.roomInfo.id,roomInfo:this.roomInfo,roomId:this.roomInfo.room_id}});
                        break;
                    default:
                        break;
                }
            },
            callback(e) {
                console.log(e);
                this.roomInfo=this.dataList[e];
            },
            getList() {
                this.submitForm({
                    url: "order/lists", data: {status: 2,page:this.current_page}, callback: (data) => {
                        console.log("order/lists/2", data.data);
                        if (data.error == 0) {
                            this.dataList = data.data.data;
                            if(this.dataList.length>0){
                                this.endDate=new Date(this.dataList[0].end_date);
                                this.isLocking(this.endDate);
                                this.roomInfo=this.dataList[data.data.data.length-1];
                            }
                        }
                    }
                })
            },
            isLocking(endDate){
                let time=new Date();
                if(time.getTime()-endDate.getTime()>43200000){
                    console.log("超时");
                    this.locking=true;
                }
            }
        }
    }
</script>
<style lang="less" scoped>
    .swiper-pagination{
        color:white;
    }

    .homepage {
        height: calc(100vh - 45px);
        background: white;
        text-align: left;

        .head {
            width: 100%;
            height: 168px;
            color: rgba(255, 255, 255, 1);
            padding: 20px;
            box-sizing: border-box;
            background: linear-gradient(45deg, rgba(0, 0, 0, 0.89) 0%, rgba(85, 85, 85, 1) 100%);
            border-radius: 0px 0px 14px 14px;

            .text {
                width: 168px;
                line-height: 1.0rem;
                font-size: 0.7rem;
                color: rgba(255, 255, 255, .8);
                font-family: PingFangSC-Regular;
                margin-top: 10px;
            }
        }

        .action {
            text-align: center;
            padding: 0 20px;
            position: relative;
            top: -40px;

            .el-row {
                height: 90px;
                background: rgba(255, 255, 255, 1);
                box-shadow: 0px 4px 8px 0px rgba(0, 0, 0, 0.06);
                border-radius: 8px;
                align-items: center;
                color: rgba(51, 51, 51, 1);
                font-size: 12px;
            }

            .icon {
                width: 32px;
                height: 32px;
                background-size: cover;
                display: inline-block;
            }

            .xuzhu {
                background-image: url("../../assets/img/homepage/xuzhu.png");
            }

            .yanshi {
                background-image: url("../../assets/img/homepage/yanshi.png");
            }

            .tuifang {
                background-image: url("../../assets/img/homepage/tuifang.png");
            }
        }

        .card {
            width: 308px;
            height: 188px;
            background: linear-gradient(90deg, rgba(199, 159, 97, 1) 0%, rgba(240, 209, 154, 1) 100%);
            box-shadow: 0px 2px 6px 0px rgba(0, 0, 0, 0.18);
            border-radius: 8px;
            margin: 0 auto;
            position: relative;
            padding: 20px;
            box-sizing: border-box;
            color: white;

            h1 {
                padding: 0 0 10px;
                font-weight: normal;
            }

            .xian {
                display: block;
                width: 29px;
                height: 4px;
                background: rgba(255, 255, 255, 1);
                margin: 8px 0 18px;
            }

            h4 {
                padding: 15px 0 5px;
                font-weight: normal;
            }

            div {
                font-size: 12px;
            }

            .yuan {
                display: block;
                width: 91px;
                height: 93px;
                position: absolute;
                top: 0;
                right: 0;
                background: url("../../assets/img/homepage/yuan.png") no-repeat;
                background-size: cover;
            }
        }

        .lockBox {
            width: 80px;
            height: 80px;
            background: rgba(194, 194, 194, 0.82);
            border-radius: 50%;
            position: absolute;
            bottom: 76px;
            right: 15px;
            display: flex;
            justify-content: center;
            align-items: center;
            flex-direction: column;
            z-index: 99999;

            .lock {
                width: 40px;
                height: 40px;

                img {
                    width: 100%;
                    height: 100%;
                    object-fit: cover;
                }
            }

            .lockText {
                font-size: 11px;
                color: rgba(255, 255, 255, 1);
                line-height: 16px;
            }
        }

        .blankBox{
            background:linear-gradient(66deg,rgba(0,0,0,0.89) 0%,rgba(85,85,85,1) 100%);
        }
        .messageBox {
            width: 100%;
            position: absolute;
            top: 0;
            left: 0;
            height: 100vh;
            background: rgba(0, 0, 0, 0.6);
            z-index: 1000;
            display: flex;
            align-items: center;
            justify-content: center;

            .message {
                width: 280px;
                height: 209px;
                background: rgba(255, 255, 255, 1);
                border-radius: 8px;
                display: flex;
                align-items: center;
                justify-content: center;
                flex-direction: column;

                .icon {
                    width: 84px;
                    height: 84px;
                    background: url("../../assets/img/homepage/close.png") no-repeat;
                    background-size: cover;
                    margin-bottom: 15px;
                    display: inline-block;
                }

                .messageText {
                    text-align: center;
                    width: 168px;
                    height: 34px;
                    font-size: 12px;
                    color: rgba(133, 133, 133, .9);
                    line-height: 17px;
                }
            }
        }
    }

</style>
