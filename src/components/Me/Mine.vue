<template>
    <div class="me">
        <div class="head">
            <div class="avater"><img src="../../assets/img/4.jpg" alt=""></div>
            <div class="name">张三</div>
        </div>
        <div class="card">
            <ul>
                <li>
                    <el-row>
                        <el-col :span="2"><i class="icon icon-ding"></i></el-col>
                        <el-col :span="21">我的订单</el-col>
                        <el-col :span="1"><i class="icon arrow"></i></el-col>
                    </el-row>
                </li>
                <li>
                    <el-row>
                        <el-col :span="2"><i class="icon icon-xiao"></i></el-col>
                        <el-col :span="21">我的消息</el-col>
                        <el-col :span="1"><i class="icon arrow"></i></el-col>
                    </el-row>
                </li>
                <li>
                    <el-row>
                        <el-col :span="2"><i class="icon icon-fa"></i></el-col>
                        <el-col :span="21">发票助手</el-col>
                        <el-col :span="1"><i class="icon arrow"></i></el-col>
                    </el-row>
                </li>
                <li>
                    <el-row>
                        <el-col :span="2"><i class="icon icon-ke"></i></el-col>
                        <el-col :span="21">联系我们</el-col>
                        <el-col :span="1"><i class="icon arrow"></i></el-col>
                    </el-row>
                </li>
            </ul>
        </div>

    </div>
</template>

<script>

    export default {
        name: 'Mine',
        components: {
        }
    }
</script>
<style lang="less" scoped>
    .me{
        position: relative;
    }
    .head{
        width:100%;
        height:183px;
        background:linear-gradient(45deg,rgba(0,0,0,0.89) 0%,rgba(85,85,85,1) 100%);
        font-size:20px;
        color:rgba(255, 255, 255, 1);
        display: flex;
        align-items: center;
        justify-content: center;
        flex-direction: column;

        .avater{
            width:62px;
            height:62px;
            border-radius: 50%;
            overflow: hidden;

            img{
                width:100%;
                height:100%;
                object-fit: cover;
            }
        }
        .name{
            margin-bottom:15px;
        }
    }
    .card{
        width:90%;
        height:175px;
        box-sizing:border-box;
        padding:20px;
        position: absolute;
        top:165px;
        left:5%;
        background:rgba(255,255,255,1);
        box-shadow:0px 4px 8px 0px rgba(0,0,0,0.06);
        border-radius:6px;
        text-align: left;
        font-size:14px;
        line-height: 17px;
        .icon{
            width:16px;
            height:16px;
            background-size:cover;
        }
        .arrow{
            background-image:url("../../assets/img/me/icon_more.png");
        }
        .icon-ding{
            background-image:url("../../assets/img/me/dingdan.png");
        }
        .icon-xiao{
            background-image:url("../../assets/img/me/xiaoxi.png");
        }
        .icon-fa{
            background-image:url("../../assets/img/me/fapiao.png");
        }
        .icon-ke{
            background-image:url("../../assets/img/me/kefu.png");
        }
        ul{
            li{
                padding:7px 0;
            }
        }
    }
</style>
