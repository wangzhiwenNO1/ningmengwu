<template>
    <div class="timeBox">
        <div class="backplane">
            <el-row type="flex" class="checkIn">
                <el-col :span="10">
                    <div class="status">入住</div>
                    <div class="date-time-item">
                        <div class="date-time-input" >
                            <div class="time">{{inDate}}<span class="week">{{inWeek}}</span></div>
                        </div>
                    </div>
                </el-col>
                <el-col :span="4" class="dayBox"><p class="dayNum">{{nightNum}}晚</p></el-col>
                <el-col :span="10">
                    <div class="status">离店</div>
                    <div class="date-time-input">
                        <div class="time">{{outDate}}<span class="week">{{outWeek}}</span></div>
                    </div>
                </el-col>
            </el-row>
        </div>
        <div class="datepicker">
            <VueHotelDatepicker
                    format="YYYY-MM-DD"
                    :weekList="weekList"
                    :monthList="monthList"
                    confirmText="确认"
                    resetText="重设"
                    fromText="从"
                    toText="到"
                    :disabledDates="disabledDates"
                    @update="upDate"
                    @confirm="confirmTime">
            </VueHotelDatepicker>
        </div>
    </div>
</template>

<script>
    // @ is an alias to /src
    import VueHotelDatepicker from '@northwalker/vue-hotel-datepicker'
    // import '../assets/css/hotel-datepicker.css'
    import {mapActions} from 'vuex'

    export default {
        name: 'Time',
        props:["over","room_id"],
        components: {
            VueHotelDatepicker
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
                initDateOut:"",//初始选择离店时间，
                weekList:['周一', '周二', '周三', '周四', '周五', '周六', '周日'],
                monthList:['一月', '二月', '三月', '四月', '五月', '六月', '七月', '八月', '九月', '十月', '十一月', '十二月'],
                disabledDates:[],//禁止选择日期
                nightNum:1,//住几晚
                roomInfo:"",//房间信息
            };
        },
        created() {
            this.initDate();

            this.submitForm({
                url: "order/check",
                data: {room_id:this.room_id},
                callback: (data) => {
                    console.log("order/check",data.data);
                    if (data.error == 0) {
                        if(data.data){
                            this.disabledDates=data.data.saled;
                            this.roomInfo=data.data;
                        }
                    }else{
                        this.$Message.info(data.message);
                    }
                }
            })
        },
        mounted(){

        },
        methods: {
            ...mapActions(['submitForm']),
            changeWeek(times) {//修改星期
                let time = times;
                this.inDate = "0"+(time.getMonth() + 1 )+ "月" +time.getDate() + "日";
                this.outDate ="0"+ (time.getMonth() + 1 )+ "月" +(time.getDate() + 1 + "日");
                let day = time.getDay();
                this.inWeek = "周" + "日一二三四五六".charAt(day);

                time.setTime(time.getTime() + 24 * 60 * 60 * 1000);
                this.outWeek = "周" + "日一二三四五六".charAt(time.getDay());
            },
            upDate(e){
                let disDate=this.disabledDates;
            },
            confirmTime(e){

                let nightNum=e.end.split("-")[2]- e.start.split("-")[2];
                this.nightNum=nightNum==0?1:nightNum;
                e.nightNum=this.nightNum;

                for(let i=0;i<this.disabledDates.length;i++){
                    let disabledDate=this.disabledDates[i];
                    let startArr=e.start.split("-");

                    for(let j=0;j<nightNum+1;j++){

                        if(startArr.join("-")==disabledDate){
                            this.$Message.info("请重新选择日期,日期不能有间隔!");
                            return ;
                        }
                        startArr[2]=parseInt(startArr[2])+1;
                    }

                }

                this.initDateIn=e.start;
                this.initDateOut=e.end;
                this.inDate=this.changeRiQi(e.start);
                let start=new Date(e.start);
                this.inWeek = "周" + "一二三四五六日".charAt(start.getDay());

                if(e.start==e.end){
                    let endTimeArr= e.end.split("-");
                    endTimeArr[2]=parseInt(endTimeArr[2])+1;
                    this.outDate=this.changeRiQi(endTimeArr.join("-"));
                    let end=new Date(endTimeArr.join("-"));
                    this.outWeek = "周" + "一二三四五六日".charAt(end.getDay());
                    e.end=endTimeArr.join("-");
                }else{
                    this.outDate=this.changeRiQi(e.end);
                    let end=new Date(e.end);
                    this.outWeek = "周" + "一二三四五六日".charAt(end.getDay());
                }

                e.roomInfo=this.roomInfo;
                console.log(e);
                this.$emit("changeTimeTwo",e);

            },
            changeRiQi(e){
                let arr = e.toString().split("-");
                let str=arr[1] + "月" + arr[2] + "日";
                return str;
            },
            initDate(){
                let times = new Date();
                if (this.over > 24) {
                    times.setTime(times.getTime() + 24 * 60 * 60 * 1000);
                } else {
                    times.setTime(times.getTime() - 24 * 60 * 60 * 1000);
                }
                this.changeWeek(times);
                this.time = times.toLocaleDateString();
            },
        }
    }
</script>
<style lang="less" >
    .backplane{
        padding:0.8rem 0;
        background:#eee;
    }
    .time{
        font-size:1.375rem;
    }
    .week{
        font-size:0.8rem;
    }
    .timeBox{
        height: 80px;
        position: relative;
    }
    .datepicker{
        position: absolute;
        top:0;
        width:100%;
        height:100%;
        z-index:999;
    }
    .vhd-container{
        width:80%;
        height:100%;
        margin:0 auto;
        .vhd-input{
            opacity: 0;
            width:100%;
            height:100%;
        }
        .vhd-picker{
            position: fixed !important;
            min-height: 400px !important;
            left:calc((100% - 300px)/2) !important;
            top:calc((100% - 400px)/2) !important;
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

</style>
