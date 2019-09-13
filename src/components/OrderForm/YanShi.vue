<template>
    <div class="yanShi">
        <div class="orderTop">
            <el-row type="flex">
                <el-col :span="5">
                    <div class="picture"><img src="../../assets/img/bigbed.png" alt=""/></div>
                </el-col>
                <el-col :span="11">
                    <div>
                        <h4>202精致大床房</h4>
                        <p class="housType">大床房</p>
                    </div>
                </el-col>
                <el-col :span="7">
                    <div class="hotel">鹏程国家大酒店</div>
                </el-col>
            </el-row>
        </div>

        <div class="bgBox">
            <el-row type="flex " class="delay">
                <el-col :span="15">
                    <div class="status">延时</div>
                    <div class="time">06月03日<span class="week">周一</span></div>
                </el-col>
                <el-col :span="9"><p class="dayNum">3晚</p></el-col>
            </el-row>
        </div>
        <div class="infoBoxs">
            <h4>延时费用</h4>
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
        </div>
        <p class="explain"><span>延时说明：</span>每小时20元，半小时内免费</p>
        <div class="btnRow">
            <el-button class="add" @click="addPay">提交订单</el-button>
            <el-button class="cancel">取消</el-button>
        </div>

    </div>
</template>

<script>
    // @ is an alias to /src

    export default {
        name: 'YanShi',
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
    .el-row{
        background:white;
        background:rgba(255,255,255,1);
        text-align: left;
        align-items: center;
    }
    .bgBox{
        padding:1.25rem 0;
        background:#eee;
    }
    .delay{
        padding:1.5rem;
        display: flex;
        align-items: flex-end;
    }
    .yanShi{

        .time{
            color:#333333;
            font-size:22px;
        }
        .dayNum{
            width:120px;
            height:30px;
            border-radius:15px;
            border:1px solid rgba(236,236,236,1);
            text-align: center;
            color:#333333;
            line-height: 30px;
            font-size:16px;
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
            padding:1rem 1.25rem;
            margin-bottom:20px;
            font-size:14px;
            h4{
                padding:10px 0;
                font-size:16px;
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
            padding-left:25px;
            span{
                color:rgba(51,51,51,1);
                font-weight:900;
            }
        }
        .btnRow{
            margin-top:15px;
        }
    }
</style>
