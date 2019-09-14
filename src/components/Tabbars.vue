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
                <router-link to="/indent">
                    <div class="grid-content bg-purple-dark icon-box">
                        <img src="../assets/img/order.png" alt=""/>
                    </div>
                    <span class="icon-title">订单</span>
                </router-link>

            </el-col>
            <el-col :span="8">
                <router-link to="/me">
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
    height:50px;
    text-align: center;
    box-shadow:0px -4px 8px 0px rgba(0,0,0,0.03);
    background:white;

    .icon-box{
        width:30px;
        height:30px;
        margin:0 auto;
        img{
            width:100%;
            height:100%;
        }
    }
    .icon-title{
        font-size:12px;
        color:rgba(196, 196, 196, 1);
    }
    .active{
        color:rgba(199, 159, 97, 1);
    }
}
</style>
