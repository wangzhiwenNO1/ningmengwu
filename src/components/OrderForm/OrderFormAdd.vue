<template>
    <div class="orderAdd">
        <div class="orderTop">
            <el-row type="flex">
                <el-col :span="5">
                    <div class="picture"><img src="../../assets/img/bigbed.png" alt=""/></div>
                </el-col>
                <el-col :span="11">
                    <div>
                        <h4>{{roomInfo.number}}{{roomInfo.name}}</h4>
                        <p class="housType">{{roomInfo.name}}</p>
                    </div>
                </el-col>
                <el-col :span="7">
                    <div class="hotel">{{roomInfo.hotel_name}}</div>
                </el-col>
            </el-row>
        </div>
        <TimeTwo @changeTimeTwo="changeTime" :over="overTime" :room_id="roomId"></TimeTwo>
<!--        <Time @timeIn="changeTimeIn" @timeOut="changeTimeOut"></Time>-->
        <div class="infoBox">
            <div class="title">
                <div :class="isReserve==1?'reserve action':'reserve'" @click="changeReserve(1)">自助</div>
                <div :class="isReserve==1?'reserve':'reserve action'" @click="changeReserve(2)">代订</div>
            </div>

            <h4>入住人信息<span>至少选择一人</span></h4>

            <div class="personBox">
                <el-row class="personInfo">
                    <el-col :span="6">
                        <label>姓名</label>
                    </el-col>
                    <el-col :span="18">
                        <div>
                            <input type="text" v-model="zhuName">
                        </div>
                    </el-col>
                </el-row>
                <el-row class="personInfo">
                    <el-col :span="6">
                        <label>手机号码</label>
                    </el-col>
                    <el-col :span="18">
                        <div>
                            <input type="text" v-model="zhuTel">
                        </div>
                    </el-col>
                </el-row>
                <el-row class="personInfo" v-if="isReserve==1">
                    <el-col :span="6">
                        <label>身份证</label>
                    </el-col>
                    <el-col :span="18">
                        <div>
                            <input type="text" v-model="zhuIdCard">
                        </div>
                    </el-col>
                </el-row>
                <div class="person" v-for="(item,index) in userArr" :key="index">
                    <el-row class="personInfo">
                        <el-col :span="6">
                            <label>姓名</label>
                        </el-col>
                        <el-col :span="18">
                            <div>
                                <input type="text" v-model="item.name">
                            </div>
                        </el-col>
                    </el-row>
                    <el-row class="personInfo">
                        <el-col :span="6">
                            <label>手机号码</label>
                        </el-col>
                        <el-col :span="18">
                            <div>
                                <input type="text" v-model="item.tel">
                            </div>
                        </el-col>
                    </el-row>
                    <el-row class="personInfo" v-if="isReserve==1">
                        <el-col :span="6">
                            <label>身份证</label>
                        </el-col>
                        <el-col :span="18">
                            <div>
                                <input type="text" v-model="item.idcard">
                            </div>
                        </el-col>
                    </el-row>
                </div>
                <div class="addBox">
                    <el-button v-if="userArr.length<=1" class="addPerson" @click="addUser">添加新房客</el-button>
                    <el-button v-if="userArr.length>0" class="addPerson" @click="delUser">删除新房客</el-button>
                </div>
            </div>

            <h4>费用<span> {{numPer}}人{{nightNum}}晚</span></h4>
            <div class="info">
                <div class="infoItem">
                    <div class="name">房费</div>
                    <i class="xian"></i>
                    <div class="information">均¥{{roomInfo.price}}*1间*{{nightNum}}晚</div>
                </div>
                <div class="infoItem">
                    <div class="name">押金</div>
                    <i class="xian"></i>
                    <div class="information">{{roomInfo.deposit?"￥"+roomInfo.deposit:"无"}}</div>
                </div>
                <div class="infoItem">
                    <div class="name">合计</div>
                    <i class="xian"></i>
                    <div class="information">¥{{price?price:0}}</div>
                </div>
            </div>
            <div class="explain">
                <div class="inform">订房须知：</div>
                <div class="text">请在提交订单后15分钟内完成支付 延时每小时20元，半小时内免费</div>
            </div>
            <div class="btnRow">
                <el-button class="add" @click="addPay">立即支付</el-button>
                <el-button class="cancel">取消</el-button>
            </div>
        </div>
        <div class="bgPay" v-if="false">
            <!-- v-if="pay"-->
            <div class="payBox">
                <div class="warning">根据公安机关要求，为避免给您带来麻烦，请 如实填写入住人数及入住人员信息</div>
                <div class="btnRow">
                    <el-button class="add" @click="ensure">确定</el-button>
                </div>
            </div>

        </div>
    </div>
</template>

<script>
    // @ is an alias to /src

    // import Time from '../Time.vue'
    import TimeTwo from '../TimeTwo.vue'
    import {mapActions} from 'vuex'
    import wx from 'weixin-js-sdk'

    export default {
        name: 'XuZhu',
        components: {
            // Time,
            TimeTwo
        },
        data() {
            return {
                pay: true,
                inDate: '',//入店日期
                outDate: '',//离店日期
                isReserve: 1,//是否自己住
                userArr: [],//添加用户
                zhuName: "张三",//名字
                zhuTel: "15713134646",//电话
                zhuIdCard: "412829199012300013",//主住的身份证
                roomId: "",//房间id
                overTime:'',//当前是否超过24时
                roomInfo:{},//房间信息
                nightNum:1,//几夜
                numPer:1,//几人
            };
        },
        computed:{
            price(){
                return this.roomInfo.price*this.nightNum+this.roomInfo.deposit
            }
        },
        created() {

            this.submitForm({
                url: "home/option", data: {url:"/#/orderadd"}, callback: (datas) => {

                    wx.config(datas.data);

                }
            });


            this.roomId = this.$route.params.id;
            console.log(this.$route.params);
            if(this.$route.params){
                // this.roomInfo=this.$route.params.roomInfo;
                this.overTime = this.$route.params.minTime;
            }
            this.getInfo();

        },
        methods: {
            ...mapActions(['submitForm']),
            addPay() {
                if (this.zhuName != "" && this.zhuTel != "") {

                    let data={
                        room_id: this.roomId,
                        begin_date: this.inDate,
                        end_date: this.outDate,
                        name:this.zhuName,
                        mobile:this.zhuTel,
                        more:this.userArr,
                        type:this.isReserve,
                        url:"/#/orderadd/"
                    };

                    if (this.isReserve == 1 && this.zhuIdCard != "") {
                        // this.$router.push({path: 'homelist', params: {type: 2}});
                        data.idcard=this.zhuIdCard;
                    }else if(this.isReserve==2){
                        data.idcard="";
                        // this.$router.push({path: 'homelist', params: {type: 2}});
                        this.$Message.info('请填写完整信息');
                    }



                    this.submitForm({
                        url: "order/add",
                        data: data,
                        callback: (data) => {

                            let d=data.data;
                            console.log("order/add",parseInt(d.timestamp));

                            if (data.error == 0) {
                                wx.chooseWXPay({
                                    timestamp:d.timestamp, // 支付签名时间戳，注意微信jssdk中的所有使用timestamp字段均为小写。但最新版的支付后台生成签名使用的timeStamp字段名需大写其中的S字符
                                    nonceStr: d.nonceStr, // 支付签名随机串，不长于 32 位
                                    package: d.package, // 统一支付接口返回的prepay_id参数值，提交格式如：prepay_id=\*\*\*）
                                    signType: d.signType, // 签名方式，默认为'SHA1'，使用新版支付需传入'MD5'
                                    paySign: d.paySign, // 支付签名
                                    success: function (res) {
                                        // 支付成功后的回调函数
                                        console.log(res);
                                        this.$Message.info("成功");
                                        this.$router.push({path: 'homepage'})
                                    }
                                });

                                // this.$router.push({path: 'homepage'});
                            }else{
                                this.$Message.info(data.message);
                            }
                        }
                    });

                    if (this.userArr.length > 0) {
                        let isNull = false;
                        this.userArr.forEach((item) => {
                            if (item.name == "" || item.tel == "") {
                            }
                        })
                    }


                } else {
                    this.$Message.info('请填写完整信息');
                }

            },
            ensure() {
                this.pay = false;
            },
            show(e) {
                if(e==1){
                    this.$refs.dateTimeIn.show()
                }else{
                    this.$refs.dateTimeOut.show()
                }

            },
            // 日期组件回调
            changeTime(e){
                this.inDate=e.start.split("/").join("-");
                this.outDate=e.end.split("/").join("-");
                this.nightNum=e.nightNum;
            },
            addUser() {
                this.userArr.push({name: "李四", tel: "13112354658",idcard: "412829199012300015"});
                this.numPer+=1;
            },
            delUser() {
                this.userArr.pop();
                this.numPer-=1;
            },
            changeReserve(e) {
                this.isReserve = e;
            },
            getInfo(){
                this.submitForm({
                    url: "order/check",
                    data: {room_id:this.roomId},
                    callback: (data) => {
                        console.log("order/check",data.data);
                        if (data.error == 0) {
                            if(data.data){
                                this.roomInfo=data.data;
                            }
                        }else{
                            this.$Message.info(data.message);
                        }
                    }
                })
            }
        }
    }
</script>
<style lang="less" scoped>

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
    .checkIn {
        background: white;
        height: 79px;
        background: rgba(255, 255, 255, 1);
        padding: 19px 25px;
        text-align: left;
        align-items: center;

        .dayBox {
            align-self: flex-end;
            display: flex;
            align-items: flex-end;
        }
    }

    .orderAdd {
        background:#eee;

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

                span {
                    color: #7A7A7A;
                    font-size: 16px;
                    margin-left: 8px;
                    font-weight: normal;
                }
            }

            .personBox {
                padding: 10px;
                background: rgba(251, 251, 251, 1);
                .person{
                    padding:1rem 0;
                }

                .personInfo {
                    display: flex;
                    align-items: center;
                    box-shadow: 0px 1px 0px 0px rgba(0, 0, 0, 0.06);

                    .el-col {
                        label {
                            height: 40px;
                            display: block;
                            line-height: 40px;
                        }

                        input {
                            width: 100%;
                            height: 35px;
                            border: none;
                            outline: none;
                            background: rgba(251, 251, 251, 1);
                        }
                    }
                }
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

                .infoItemBox {
                    position: relative;
                    height: 50px;

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

                    .icon {
                        display: block;
                        position: absolute;
                        top: 20px;
                        width: 100%;
                        height: 2px;
                        z-index: 10;
                        border-bottom: 2px dashed #E7E7E7;
                    }
                }
            }

            .title {
                display: flex;
                justify-content: space-around;
                padding: 0 25px;
                margin-bottom: 10px;

                .reserve {
                    padding: 10px;
                    font-size: 14px;
                    color: #7A7A7A;
                }

                .action {
                    color: #D5B074;
                    border-bottom: 3px solid #D5B074;
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

        .addBox {
            padding: 10px 0;
            display: flex;
            justify-content: center;

            .addPerson {
                width: 142px;
                height: 35px;
                background: rgba(213, 176, 116, 1);
                border-radius: 6px;
                padding: 0;
                color: white;
            }
        }

        .cancel {
            background: rgba(223, 223, 223, 1);
        }


        .explain {
            font-size: 12px;
            text-align: left;
            color: #7A7A7A;
            line-height: 14px;
            display: flex;
            margin: 15px 0;
            width: 244px;

            .inform {
                flex-shrink: 0;
                color: rgba(51, 51, 51, 1);
            }

            .text {

            }

            span {
                color: rgba(51, 51, 51, 1);
                font-weight: 900;
            }
        }

        .btnRow {
            display: flex;
            justify-content: center;
            align-items: center;
        }

        .bgPay {
            width: 100%;
            height: 100vh;
            position: fixed;
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
            height: 167px;
            background: rgba(255, 255, 255, 1);
            border-radius: 8px;
            padding: 20px;
            box-sizing: border-box;
            font-size: 13px;
            color: #464646;

            .warning {
                font-size: 13px;
                font-weight: 400;
                color: rgba(70, 70, 70, 1);
                line-height: 25px;
                margin-bottom: 15px;
                text-align: center;
            }
        }
    }
</style>
