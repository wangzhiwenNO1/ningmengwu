<template>
    <div class="xuZhu">
        <div class="orderTop">
            <el-row type="flex">
                <el-col :span="5">
                    <div class="picture"><img src="../../assets/img/bigbed.png" alt=""/></div>
                </el-col>
                <el-col :span="11">
                    <div>
                        <h4>202{{roomInfo.name}}</h4>
                        <p class="housType">{{roomInfo.name}}</p>
                    </div>
                </el-col>
                <el-col :span="7">
                    <div class="hotel">{{roomInfo.hotel_name}}</div>
                </el-col>
            </el-row>
        </div>
        <TimeTwo @changeTimeTwo="changeTime" :over="overTime" :room_id="order_id" :startDate="endDate"></TimeTwo>
        <div class="infoBox">
            <h4>续住费用</h4>
            <div class="info">
                <div class="infoItem">
                    <div class="name">房费</div>
                    <i class="xian"></i>
                    <div class="information">均¥{{roomInfo.price}}*1间*{{nightNum}}晚</div>
                </div>
                <div class="infoItem">
                    <div class="name">押金</div>
                    <i class="xian"></i>
                    <div class="information">无(续住房只需续交房费即可)</div>
                </div>
                <div class="infoItem">
                    <div class="name">合计</div>
                    <i class="xian"></i>
                    <div class="information">¥{{roomInfo.price}}</div>
                </div>
            </div>
        </div>
        <div class="btnRow">
            <el-button class="add" @click="addPay">立即添加</el-button>
            <el-button class="cancel">取消</el-button>
        </div>
        <div class="bgPay" v-if="pay" @click="addPay">
            <div class="payBox">
                <h4>订单详情</h4>
                <ul>
                    <li><span>订单编号：</span>{{roomInfo.id*10000}}</li>
                    <li><span>入住时间：</span>{{roomInfo.begin_date}}至{{roomInfo.end_date}}</li>
                    <li><span>姓名：</span>{{roomInfo.name}}</li>
                    <li><span>手机号：</span>{{roomInfo.mobile}}</li>
                    <li><span>身份证号：</span>{{roomInfo.idcard}}</li>
                    <li><span>支付金额：</span>320元</li>
                </ul>
                <div class="btnRow">
                    <el-button class="add" @click.stop="defray">继续支付</el-button>
                    <el-button class="cancel">取消</el-button>
                </div>
            </div>

        </div>
    </div>
</template>

<script>
    // @ is an alias to /src
    import TimeTwo from '../TimeTwo.vue'
    import {mapActions} from 'vuex'

    export default {
        name: 'XuZhu',
        components: {
            TimeTwo
        },
        data() {
            return {
                pay: false,
                overTime: "",//入住时间是否超过零时
                order_id:"",
                roomInfo:"",
                nightNum:1,
                inDate:"",
                outDate:'',
                endDate:"",
            };
        },
        computed:{
            price(){
                return this.roomInfo.price*this.nightNum+this.roomInfo.deposit
            }
        },
        created(){
            if(this.$route.query){
                this.order_id=this.$route.query.order_id;
                this.getInfo();
            }

        },
        methods: {
            ...mapActions(['submitForm']),
            addPay() {
                this.pay = !this.pay;
            },
            changeTime(e) {
                this.inDate = e.start.split("/").join("-");
                this.outDate = e.end.split("/").join("-");
                this.nightNum = e.nightNum;
            },
            getInfo(){

                //订单详情
                this.submitForm({
                    url: "orderaction/info",
                    data: {order_id:this.order_id},
                    callback: (data) => {
                        console.log("orderaction/info",data.data);
                        if (data.error == 0) {
                            if(data.data){
                                data.data.idcard=data.data.idcard.replace(/^(.{6})(?:\w+)(.{4})$/, "$1****$2");
                                this.roomInfo=data.data;
                            }
                        }else{
                            this.$Message.info(data.message);
                        }
                    }
                })
            },
            defray(){
                console.log(123);
            }
        }
    }
</script>
<style lang="less" scoped>
    .el-row {
        background: white;
        height: 79px;
        background: rgba(255, 255, 255, 1);
        text-align: left;
        align-items: center;

        .dayBox {
            align-self: flex-end;
            display: flex;
            align-items: flex-end;
        }
    }
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

    .xuZhu {
        .time {
            color: #333333;
            font-size: 22px;
        }

        .dayNum {
            width: 42px;
            height: 20px;
            border-radius: 10px;
            border: 1px solid rgba(236, 236, 236, 1);
            text-align: center;
            color: #464646;
            line-height: 20px;
            font-size: 12px;
            margin: auto;
        }

        .status {
            font-size: 12px;
            color: rgba(162, 162, 162, 1);
            line-height: 14px;
        }

        .week {
            font-size: 12px;
            color: rgba(70, 70, 70, 1);
            line-height: 16px;
            padding-left: 8px;
        }

        .infoBox {
            background: white;
            margin-top: 16px;
            text-align: left;
            padding: 25px;
            margin-bottom: 20px;
            font-size: 14px;

            h4 {
                padding: 10px 0;
                font-size: 16px;
            }

            .info {
                height: 122px;
                background: rgba(251, 251, 251, 1);
                padding: 10px;
                display: flex;
                justify-content: center;
                flex-direction: column;

                .infoItem {
                    display: flex;
                    padding: 7px 0;
                    justify-content: space-between;
                    align-items: center;

                    .name {
                        flex-shrink: 0;
                    }

                    .information {
                        flex-shrink: 0;
                    }

                    .xian {
                        display: block;
                        width: 100%;
                        border-bottom: 1px dashed #E7E7E7;
                    }
                }
            }
        }

        .add, .cancel {
            width: 120px;
            padding: 0;
            height: 35px;
            font-size: 14px;
            border-radius: 6px;
            color: white;
        }

        .add {
            background: rgba(213, 176, 116, 1);
            margin-right: 10px;
        }

        .cancel {
            background: rgba(223, 223, 223, 1);
        }

        .bgPay {
            width: 100%;
            height: 100vh;
            position: absolute;
            top: 0;
            left: 0;
            background: rgba(0, 0, 0, 0.5);
            z-index: 1000;
            display: flex;
            align-items: center;
            justify-content: center;
            flex-direction: column;
            text-align: left;

        }

        .payBox {
            width: 310px;
            height: 286px;
            background: rgba(255, 255, 255, 1);
            border-radius: 8px;
            padding: 20px;
            box-sizing: border-box;
            font-size: 13px;
            color: #464646;

            h4 {
                font-weight: bold;
                font-size: 16px;
                padding: 5px 0;
            }

            ul {
                margin-bottom: 20px;

                li {
                    padding: 3px 0;
                }
            }
        }
    }
</style>
