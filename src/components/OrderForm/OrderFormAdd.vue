<template>
    <div class="orderAdd">
        <el-row type="flex" class="checkIn">
            <el-col :span="10">
                <div class="status">入住</div>
                <div class="time">06月03日<span class="week">周一</span></div>
            </el-col>
            <el-col :span="4" class="dayBox"><p class="dayNum">3晚</p></el-col>
            <el-col :span="10">
                <div class="status">离店</div>
                <div class="time">06月03日<span class="week">周一</span></div>
            </el-col>
        </el-row>
        <div class="infoBox">
            <div class="title">
                <div class="reserve action">自助</div>
                <div class="reserve">代订</div>
            </div>
            <h4>入住人信息<span>至少选择一人</span></h4>

            <div class="personBox">
                <div class="person">
                    <el-row class="personInfo">
                        <el-col :span="6">
                            <label>姓名</label>
                        </el-col>
                        <el-col :span="18">
                            <div>
                                <input type="text" value="张三">
                            </div>
                        </el-col>
                    </el-row>
                    <el-row class="personInfo">
                        <el-col :span="6">
                            <label>手机号码</label>
                        </el-col>
                        <el-col :span="18">
                            <div>
                                <input type="text" value="18377628874">
                            </div>
                        </el-col>
                    </el-row>
                </div>
                <div class="addBox"><el-button class="addPerson">添加新房客</el-button></div>
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
        <div class="bgPay" v-if="pay">
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

    export default {
        name: 'XuZhu',
        components: {

        },
        data() {
            return {
                pay:true
            };
        },
        methods:{
            addPay(){
                this.$router.push({ path:'/homelist',query: {type: 2}});
            },
            ensure(){
                this.pay=false;
            }
        }
    }
</script>
<style lang="less" scoped>
    .checkIn{
        background:white;
        height:79px;
        background:rgba(255,255,255,1);
        padding:19px 25px;
        text-align: left;
        align-items: center;
        .dayBox{
            align-self: flex-end;
            display: flex;
            align-items: flex-end;
        }
    }
    .orderAdd{
        margin-top:13px;
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
        .infoBox{
            background:white;
            margin-top:16px;
            text-align: left;
            padding:25px;
            margin-bottom:20px;
            font-size:14px;
            h4{
                padding:10px 0;
                font-size:16px;
                span{
                    color:#7A7A7A;
                    font-size:16px;
                    margin-left:8px;
                    font-weight: normal;
                }
            }
            .personBox{
                padding:10px;
                background:rgba(251,251,251,1);
                .personInfo{
                    display: flex;
                    align-items: center;
                    box-shadow:0px 1px 0px 0px rgba(0,0,0,0.06);
                    .el-col{
                        label{
                            height:40px;
                            display: block;
                            line-height: 40px;
                        }
                        input{
                            width:100%;
                            height:35px;
                            border:none;
                            outline: none;
                            background:rgba(251,251,251,1);
                        }
                    }
                }
            }
            .info{
                height:122px;
                background:rgba(251,251,251,1);
                padding:10px;
                display: flex;
                justify-content: center;
                flex-direction: column;
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
                .infoItemBox{
                    position: relative;
                    height:50px;
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
                    .icon{
                        display: block;
                        position: absolute;
                        top:20px;
                        width:100%;
                        height:2px;
                        z-index: 10;
                        border-bottom:2px dashed  #E7E7E7;
                    }
                }
            }
            .title{
                display:flex;
                justify-content: space-around;
                padding:0 25px;
                margin-bottom:10px;
                .reserve{
                    padding:10px;
                    font-size:14px;
                    color:#7A7A7A;
                }
                .action{
                    color:#D5B074;
                    border-bottom:3px solid #D5B074;
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
        .addBox{
            padding:10px 0;
            display: flex;
            justify-content: center;
            .addPerson{
                width:142px;
                height:35px;
                background:rgba(213,176,116,1);
                border-radius:6px;
                padding:0;
                color:white;
            }
        }

        .cancel{
            background:rgba(223,223,223,1);
        }


        .explain{
            font-size:12px;
            text-align: left;
            color:#7A7A7A;
            line-height:14px;
            display: flex;
            margin:15px 0;
            width:244px;
            .inform{
                flex-shrink: 0;
                color:rgba(51,51,51,1);
            }
            .text{

            }
            span{
                color:rgba(51,51,51,1);
                font-weight:900;
            }
        }
        .btnRow{
            display:flex;
            justify-content: center;
            align-items: center;
        }
        .bgPay{
            width:100%;
            height: 100vh;
            position:fixed;
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
            height:167px;
            background:rgba(255,255,255,1);
            border-radius:8px;
            padding:20px;
            box-sizing: border-box;
            font-size:13px;
            color:#464646;
            .warning{
                font-size:13px;
                font-weight:400;
                color:rgba(70,70,70,1);
                line-height:25px;
                margin-bottom:15px;
                text-align: center;
            }
        }
    }
</style>
