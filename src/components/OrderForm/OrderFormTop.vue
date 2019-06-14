<template>
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
</template>

<script>
    // @ is an alias to /src

    export default {
        name: 'OrderFormTop',
        components: {

        }
    }
</script>
<style scoped lang="less">
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
</style>
