<template>
    <div class="xuZhu">
        <div class="orderTop">
            <el-row type="flex">
                <el-col :span="5">
                    <div class="picture"><img :src="roomInfo.img" alt=""/></div>
                </el-col>
                <el-col :span="11">
                    <div>
                        <h4>202{{roomInfo.room_name}}</h4>
                        <p class="housType">{{roomInfo.room_name}}</p>
                    </div>
                </el-col>
                <el-col :span="7">
                    <div class="hotel">{{roomInfo.hotel_name}}</div>
                </el-col>
            </el-row>
        </div>
        <el-row type="flex" class="TimeBox">
            <el-col :span="10">
                <div class="status">入住</div>
                <div class="time">{{outTime}}<span class="week">{{inWeek}}</span></div>
            </el-col>
            <el-col :span="4" class="dayBox"><p class="dayNum">{{nightNum}}晚</p></el-col>
            <el-col :span="10">
                <div class="status">离店</div>
                <div class="time">{{endTime}}<span class="week">{{outWeek}}</span></div>
            </el-col>
        </el-row>
        <div class="infoBoxs">
            <h4>入住费用</h4>
            <div class="info" v-if="checkOut">
                <div class="infoItem">
                    <div class="name">房费</div>
                    <i class="xian"></i>
                    <div class="information">均¥{{orderInfo.cost}}*1间*3晚</div>
                </div>
                <div class="infoItem">
                    <div class="name">押金</div>
                    <i class="xian"></i>
                    <div class="information">{{orderInfo.deposit?"￥"+orderInfo.deposit:"无"}}</div>
                </div>
            </div>
            <div class="info" v-else>
                <h4>您订房时间在30分钟之内可全款退房</h4>
                <p>如有疑问，请联系400-121-121</p>
            </div>
        </div>
        <div class="BtnRow">
            <el-button class="add" @click="addPay">立即退房</el-button>
            <el-button class="cancel" @click="cancel">取消</el-button>
        </div>
        <div class="bgPay" v-if="pay" @click="addPay">
            <div class="payBox">
                <h4>订单详情</h4>
                <ul>
                    <li><span>订单编号：</span>{{orderInfo.id}}</li>
                    <li><span>入住时间：</span>{{orderInfo.begin_date}}至{{orderInfo.end_date}}</li>
                    <li><span>姓名：</span>{{orderInfo.name}}</li>
                    <li><span>手机号：</span>{{orderInfo.mobile}}</li>
                    <li><span>身份证号：</span>{{orderInfo.idcard}}</li>
                    <li><span>支付金额：</span>{{orderInfo.total}}元</li>
                </ul>
                <div class="BtnRow">
                    <el-button class="add" @click.stop="outRoom">立即退房</el-button>
                    <el-button class="cancel">取消</el-button>
                </div>
            </div>

        </div>
    </div>
</template>

<script>
    // @ is an alias to /src
    import {mapActions} from 'vuex'
    import moment from "moment"
    moment.locale('zh-cn');
    export default {
        name: 'TuiFang',
        components: {

        },
        data() {
            return {
                pay:false,
                checkOut:true,
                orderId:"",
                orderInfo:'',//订单详情
                roomInfo:"",//房间详情
            };
        },
        computed:{
            outTime(){
                if(this.orderInfo.begin_date){
                    let timeArr=this.orderInfo.begin_date.split("-");
                    let time=timeArr[1]+"月"+timeArr[2]+"日";
                    return time;
                }
            },
            endTime(){
                if(this.orderInfo.end_date){
                    let timeArr=this.orderInfo.end_date.split("-");
                    let time=timeArr[1]+"月"+timeArr[2]+"日";
                    return time;
                }
            },
            nightNum(){
                if(this.orderInfo){
                    let startTime=new Date(this.orderInfo.end_date);
                    let endTime=new Date(this.orderInfo.begin_date);

                    let nightNum=(startTime.getTime()- endTime.getTime())/86400000;
                    return nightNum;
                }
            },
            inWeek(){
                if(this.orderInfo){
                    let start=new Date(this.orderInfo.begin_date);

                    let inWeek="周" + "日一二三四五六".charAt(start.getDay());
                    return inWeek;
                }

            },
            outWeek(){
                if(this.orderInfo){
                    let end=new Date(this.orderInfo.end_date);
                    let endWeek="周" + "日一二三四五六".charAt(end.getDay());
                    return endWeek;
                }

            }
        },
        created(){

            if(this.$route.query){
                this.orderId=this.$route.query.order_id;

                this.roomInfo=this.$route.query.roomInfo;
                this.getInfo();
            }
        },
        methods:{
            ...mapActions(['submitForm']),
            addPay(){
                this.pay=!this.pay;
            },
            outRoom(){//立即退房
                this.submitForm({
                    url: "orderaction/checkout",
                    data: {order_id:this.orderId},
                    callback: (data) => {

                        if (data.error == 0) {
                            this.pay=false;
                            this.$Message.info("请等待客房查房！");
                        }else{
                            this.$Message.info(data.message);
                        }
                    }
                })
            },
            cancel(){
                this.$router.push({path: '/homepage'});
            },
            getInfo(){

                this.submitForm({
                    url: "orderaction/info",
                    data: {order_id:this.orderId},
                    callback: (data) => {

                        if (data.error == 0) {
                            if(data.data){
                                data.data.idcard=data.data.idcard.replace(/^(.{6})(?:\w+)(.{4})$/, "$1****$2");
                                this.orderInfo=data.data;
                            }
                        }else{
                            this.$Message.info(data.message);
                        }
                    }
                })

                // this.submitForm({
                //     url: "order/check",
                //     data: {room_id:this.orderId},
                //     callback: (data) => {
                //         console.log("order/check",data.data);
                //         if (data.error == 0) {
                //             if(data.data){
                //                 this.orderInfo=data.data;
                //             }
                //         }else{
                //             this.$Message.info(data.message);
                //         }
                //     }
                // })
            },
        }
    }
</script>
<style lang="less" scoped>
    .el-row{
        background:white;
        height:79px;
        background:rgba(255,255,255,1);
        text-align: left;
        align-items: center;
        .dayBox{
            align-self: flex-end;
            display: flex;
            align-items: flex-end;
        }
    }
    .TimeBox{
        padding:1.25rem;
        margin:1rem 0;
    }
    .BtnRow{
        padding-top:1rem;
        background: white;
    }
    .xuZhu{
        background: #eee;

        .orderTop{
            height:105px;
            background:rgba(255,255,255,1);
            padding:20px 10px 20px 20px;
            box-sizing: border-box;
            .el-row{
                align-items: center;
                .el-col{
                    text-align: left;
                    h4{
                        font-size:16px;
                    }
                }
            }
            .picture{
                width:55px;
                height:65px;
                img{
                    width:100%;
                    height:100%;
                    object-fit: cover;
                }
            }
            .hotel{
                color:rgba(70, 70, 70, 1);
                margin-bottom:15px;
                font-size:14px;
                font-weight:400;
            }
            .housType{
                font-size:14px;
                font-weight:400;
                color:rgba(122,122,122,1);
                line-height:14px;
                margin-top:3px;
            }

        }

        .time{
            color:#333333;
            font-size:22px;
        }
        .dayNum{
            width:42px;
            height:20px;
            border-radius:10px;
            border:1px solid rgba(236,236,236,1);
            text-align: center;
            color:#464646;
            line-height: 20px;
            font-size:12px;
        }
        .status{
            font-size:12px;
            color:rgba(162,162,162,1);
            line-height:14px;
        }
        .week{
            font-size:12px;
            color:rgba(70,70,70,1);
            line-height:16px;
            padding-left: 8px;
        }
        .infoBoxs{
            background:white;
            text-align: left;
            padding:25px;
            font-size:14px;
            h4{
                padding:10px 0;
                font-size:16px;
            }
            .info{
                height:94px;
                background:rgba(251,251,251,1);
                padding:10px;
                display: flex;
                justify-content: center;
                flex-direction: column;
                h4{
                    padding:5px 0;
                    color:#464646;
                    font-size:14px;
                }
                p{
                    font-size:12px;
                    font-weight:400;
                    color:rgba(122,122,122,1);
                    line-height:14px;
                    margin-bottom:20px;
                }
                .infoItem{
                    display: flex;
                    padding:7px 0;
                    justify-content: space-between;
                    align-items: center;
                    .name{
                        flex-shrink: 0;
                    }
                    .information{
                        flex-shrink: 0;
                    }
                    .xian{
                        display: block;
                        width:100%;
                        border-bottom:1px dashed  #E7E7E7;
                    }
                }
            }
        }
        .add,.cancel{
            width:120px;
            padding:0;
            height:35px;
            font-size:14px;
            border-radius:6px;
            color:white;
        }
        .add{
            background:rgba(213,176,116,1);
            margin-right: 10px;
        }
        .cancel{
            background:rgba(223,223,223,1);
        }
        .bgPay{
            width:100%;
            height: 100vh;
            position:absolute;
            top:0;
            left:0;
            background:rgba(0,0,0,0.5);
            z-index:1000;
            display: flex;
            align-items: center;
            justify-content: center;
            flex-direction: column;
            text-align: left;

        }
        .payBox{
            width:310px;
            height:286px;
            background:rgba(255,255,255,1);
            border-radius:8px;
            padding:20px;
            box-sizing: border-box;
            font-size:13px;
            color:#464646;
            h4{
                font-weight: bold;
                font-size:16px;
                padding:5px 0;
            }
            ul{
                margin-bottom:20px;
                li{
                    padding:3px 0;
                }
            }
        }
    }
</style>
