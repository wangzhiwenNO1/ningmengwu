<template>
    <div class="xuZhu">
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
            <h4>入住费用</h4>
            <div class="info" v-if="checkOut">
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
            </div>
            <div class="info" v-else>
                <h4>您订房时间在30分钟之内可全款退房</h4>
                <p>如有疑问，请联系400-121-121</p>
            </div>
        </div>
        <div class="btnRow">
            <el-button class="add" @click="addPay">立即退房</el-button>
            <el-button class="cancel">取消</el-button>
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
                    <el-button class="add">立即退房</el-button>
                    <el-button class="cancel">取消</el-button>
                </div>
            </div>

        </div>
    </div>
</template>

<script>
    // @ is an alias to /src

    export default {
        name: 'TuiFang',
        components: {

        },
        data() {
            return {
                pay:false,
                checkOut:true
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
    .xuZhu{
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
