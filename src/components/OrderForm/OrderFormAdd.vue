<template>
    <div class="orderAdd">
        <el-row type="flex">
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

            <div class="info">

            </div>

            <h4>入住人信息<span>至少选择一人</span></h4>
            <div class="info">
                <div class="infoItem">
                    <div class="name">房费</div>
                    <div>均¥320*1间*3晚</div>
                </div>
                <div class="infoItem">
                    <div class="name">押金</div>
                    <div>无(续住房只需续交房费即可)</div>
                </div>
                <div class="infoItem">
                    <div class="name">合计</div>
                    <div>¥320</div>
                </div>
            </div>
            <p class="explain"><span>订房须知：</span>请在提交订单后15分钟内完成支付 延时每小时20元，半小时内免费</p>
            <div class="btnRow">
                <el-button class="add" @click="addPay">立即支付</el-button>
                <el-button class="cancel">取消</el-button>
            </div>
        </div>

        <div class="bgPay" v-if="pay" @click="addPay">
            <div class="payBox">
                <h4>订单详情</h4>
                <ul>
                    <li><span>订单编号：</span>2345677895434231</li>
                    <li><span>入住时间：</span>2019-06-03至2019-06-07</li>
                    <li><span>姓名：</span>张三</li>
                    <li><span>手机号：</span>13523465211</li>
                    <li><span>身份证号：</span>4103061999***0099</li>
                    <li><span>支付金额：</span>320元</li>
                </ul>
                <div class="btnRow">
                    <el-button class="add">继续支付</el-button>
                    <el-button class="cancel">取消</el-button>
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
                pay:false
            };
        },
        methods:{
            addPay(){
                this.pay=!this.pay;
            }
        }
    }
</script>
<style lang="less" scoped>
    .el-row{
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
            margin: auto;
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
                    border-bottom:1px solid #D5B074;
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
        .explain{
            font-size:12px;
            text-align: left;
            color:#7A7A7A;
            line-height:14px;

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
    }
</style>
