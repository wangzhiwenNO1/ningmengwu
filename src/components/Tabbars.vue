<template>
    <div class="tab-bars">
        <el-row>
            <el-col :span="8">
                <router-link to="/">
                    <div class="grid-content bg-purple-dark icon-box">
                        <img src="../assets/img/Ahome.png" alt=""/>
                    </div>
                    <span class="icon-title active">首页</span>
                </router-link>

            </el-col>
            <el-col :span="8">
                <router-link to="/">
                    <div class="grid-content bg-purple-dark icon-box">
                        <img src="../assets/img/order.png" alt=""/>
                    </div>
                    <span class="icon-title">订单</span>
                </router-link>

            </el-col>
            <el-col :span="8">
                <router-link to="/">
                    <div class="grid-content bg-purple-dark icon-box">
                        <img src="../assets/img/personal.png" alt=""/>
                    </div>
                    <span class="icon-title">我的</span>
                </router-link>

            </el-col>
        </el-row>
    </div>

</template>

<script>
export default {
    name:"tabbars",
    data(){
        return{

        }
    },
}
</script>

<style lang="less" scoped>
.tab-bars{
    position:fixed;
    bottom:0;
    left:0;
    width:100%;
    height:45pt;
    text-align: center;
    border-top:1px solid #ddd;

    .icon-box{
        width:30pt;
        height:30pt;
        margin:0 auto;
        img{
            width:100%;
            height:100%;
        }
    }
    .icon-title{
        font-size:10pt;
        color:rgba(196, 196, 196, 1);
    }
    .active{
        color:rgba(199, 159, 97, 1);
    }
}
</style>
