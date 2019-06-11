<template>
    <div class="home-top">
        <el-row class="site-box" type="flex"  justify="space-around">
            <el-col :span="5" class="site">
                <i class="icon"></i>
                <span class="territory">郑州</span>
            </el-col>
            <el-col :span="13" class="title">鹏程国家大酒店</el-col>
            <el-col :span="6" class="other-box">
                <div class="other">其他酒店</div>
            </el-col>
        </el-row>
    </div>
</template>

<script>
    // @ is an alias to /src

    export default {
        name: 'HomeListTop',

    }
</script>
<style lang="less" scoped>
    .home-top{
        height: 40px;
    }
    .site-box{
        padding:0 0 0 5px;
        font-size: 11pt;
        height:100%;
        color:rgba(70, 70, 70, .8);
        .site{
            display: flex;
            align-items: center;

            .icon{
                width:16pt;
                height:16pt;
                background:pink;
                display: inline-block;
                margin-right:5px;
            }
        }
        .title{
            font-size:20px;
            font-family:PingFangSC-Semibold;
            font-weight:600;
            color:rgba(51,51,51,1);
            line-height:26pt;
        }
        .other-box{
            display: flex;
            align-items: center;
            justify-content: center;
            .other{
                padding:1px 7px;
                border-radius:11px;
                border:1px solid rgba(178,178,178,1);
            }
        }

    }


</style>
