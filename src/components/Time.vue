<template>
    <el-row type="flex" class="checkIn">
        <el-col :span="10">
            <div class="status">入住</div>
            <div class="date-time-item">
                <div class="date-time-input" @click="show(1)">
                    <div class="time">{{inDate}}<span class="week">{{inWeek}}</span></div>
                </div>
                <date-time ref="dateTimeIn" :min="time" type="date" @confirm="changeIn"></date-time>
            </div>
        </el-col>
        <el-col :span="4" class="dayBox"><p class="dayNum">3晚</p></el-col>
        <el-col :span="10">
            <div class="status">离店</div>
            <div class="date-time-input" @click="show(2)">
                <div class="time">{{outDate}}<span class="week">{{outWeek}}</span></div>
            </div>
            <date-time ref="dateTimeOut" type="date" :min="outTime==''?time:outTime" @confirm="changeOut"></date-time>
        </el-col>
    </el-row>
</template>

<script>
    // @ is an alias to /src
    import DateTime from 'vue-date-time-m'
    import qs from 'qs'
    import {mapActions} from 'vuex'

    export default {
        name: 'Time',
        components: {
            DateTime
        },
        data() {
            return {
                inDate: '',//入店日期
                outDate: '',//离店日期
                inWeek: '',//入店星期
                outWeek: "",//离店星期
                time: "",//当前时间
                minTime: "",//当前时间
                outTime:"",//选择入住日期后的离店日期的最小时间
                initDateIn:"",//初始选择入店时间
                initDateOut:"",//初始选择离店时间
            };
        },
        created() {

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

            show(e) {
                if(e==1){
                    this.$refs.dateTimeIn.show()
                }else{
                    this.$refs.dateTimeOut.show()
                }

            },
            // 日期组件回调
            changeIn(val) {
                this.initDateIn=val;
                let arr = val.toString().split("/");
                this.inDate = arr[1] + "月" + arr[2] + "日";
                arr[2]=parseInt(arr[2])+1;
                this.outTime=arr.join("/");
                this.calculation(val,this.initDateOut);
                this.$emit("timeIn",this.inDate)
            },
            changeOut(val) {
                this.initDateOut=val;
                let arr = val.toString().split("/");
                this.outDate = arr[1] + "月" + arr[2] + "日";
                this.calculation(this.initDateIn,val);
                this.$emit("timeOut",this.outDate)
            },
            changeWeek(times) {//修改星期
                let time = times;
                this.inDate = "0"+(time.getMonth() + 1 )+ "月" +time.getDate() + "日";
                this.outDate ="0"+ (time.getMonth() + 1 )+ "月" +(time.getDate() + 1 + "日");
                let day = time.getDay();
                this.inWeek = "周" + "日一二三四五六".charAt(day);

                time.setTime(time.getTime() + 24 * 60 * 60 * 1000);
                this.outWeek = "周" + "日一二三四五六".charAt(time.getDay());
            },
            calculation(inDate,outDate){
                console.log(inDate,outDate);
            }
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
        margin-top: 13px;

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
