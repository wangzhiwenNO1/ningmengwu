<template>
    <div class="orderAdd">
        <Time @timeIn="changeTimeIn" @timeOut="changeTimeOut"></Time>
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
                                <input type="text" v-model="zhuIdCard">
                            </div>
                        </el-col>
                    </el-row>
                </div>
                <div class="addBox">
                    <el-button v-if="userArr.length<=1" class="addPerson" @click="addUser">添加新房客</el-button>
                    <el-button v-if="userArr.length>0" class="addPerson" @click="delUser">删除新房客</el-button>
                </div>
            </div>

            <h4>费用<span> 2人3晚</span></h4>
            <div class="info">
                <div class="infoItem">
                    <div class="name">房费</div>
                    <i class="xian"></i>
                    <div class="information">均¥320*1间*3晚</div>
                </div>
                <div class="infoItem">
                    <div class="name">押金</div>
                    <i class="xian"></i>
                    <div class="information">无(续住房只需续交房费即可)</div>
                </div>
                <div class="infoItem">
                    <div class="name">合计</div>
                    <i class="xian"></i>
                    <div class="information">¥320</div>
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
    import DateTime from 'vue-date-time-m'
    import Time from '../Time.vue'
    import qs from 'qs'
    import {mapActions} from 'vuex'

    export default {
        name: 'XuZhu',
        components: {
            DateTime,
            Time
        },
        data() {
            return {
                pay: true,
                inDate: '',//入店日期
                outDate: '',//离店日期
                inWeek: '',//入店星期
                outWeek: "",//离店星期
                time: "",//当前时间
                isReserve: 1,//是否自己住
                userArr: [],//添加用户
                minTime: "",//当前时间
                zhuName: "张三",//名字
                zhuTel: "1215456456",//电话
                zhuIdCard: "4564213245465",//主住的身份证
                roomId: "",//房间id
            };
        },
        created() {
            this.roomId = this.$route.params.id;
            this.minTime = this.$route.params.minTime;

            let times = new Date();
            this.changeWeek(times);

            if (this.minTime > 24) {
                times.setTime(times.getTime() + 24 * 60 * 60 * 1000);
            } else {
                times.setTime(times.getTime() - 24 * 60 * 60 * 1000);
            }
            this.time = times.toLocaleDateString();
        },
        methods: {
            ...mapActions(['submitForm']),
            changeTimeIn(e){
                this.inDate=e;
            },
            changeTimeOut(e){
                this.outDate=e;
            },
            addPay() {
                if (this.zhuName != "" && this.zhuTel != "") {
                    if (this.isReserve == 1 && this.zhuIdCard != "") {
                        // this.$router.push({path: 'homelist', params: {type: 2}});
                        let time=new Date();
                        let begin_date=time.getFullYear()+"-"+this.inDate.split("月")[0]+"-"+this.inDate.split("月")[1].split("日")[0];
                        let end_date=time.getFullYear()+"-"+this.outDate.split("月")[0]+"-"+this.outDate.split("月")[1].split("日")[0];

                        let data={
                            room_id: this.roomId,
                            begin_date:begin_date,
                            end_date:end_date,
                            name:this.zhuName,
                            mobile:this.zhuTel,
                            idcard:this.zhuIdCard,
                            more:this.userArr,
                            type:this.isReserve
                        };

                        this.submitForm({
                            url: "order/add", 
                            data: data,
                            callback: (data) => {
                                console.log("userAdd",data);
                                if (data.error == 0) {

                                }else{
                                    this.$Message.info(data.message);
                                }
                            }
                        })

                    }else if(this.isReserve==2){
                        // this.$router.push({path: 'homelist', params: {type: 2}});
                        this.$Message.info('请填写完整信息');
                    }

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
            changeIn(val) {
                let arr = val.toString().split("/");
                this.inDate = arr[1] + "月" + arr[2] + "日";
            },
            changeOut(val) {
                let arr = val.toString().split("/");
                this.outDate = arr[1] + "月" + arr[2] + "日";
            },
            changeWeek(times) {
                let time = times;
                this.inDate = "0"+(time.getMonth() + 1 )+ "月" + "0"+time.getDate() + "日";
                this.outDate ="0"+ (time.getMonth() + 1 )+ "月" + "0"+(time.getDate() + 1 + "日");
                let day = time.getDay();
                this.inWeek = "周" + "日一二三四五六".charAt(day);

                time.setTime(time.getTime() + 24 * 60 * 60 * 1000);
                this.outWeek = "周" + "日一二三四五六".charAt(time.getDay());
            },
            addUser() {
                this.userArr.push({name: "李四", tel: "5125465456"});
            },
            delUser() {
                this.userArr.pop();
            },
            changeReserve(e) {
                this.isReserve = e;
            },
        }
    }
</script>
<style lang="less" scoped>
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
        padding-top: 1rem;
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
