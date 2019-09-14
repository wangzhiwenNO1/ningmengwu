<template>
    <div class="tab-bars">
        <el-row>
            <el-col :span="8" @click="changeStatus(1)">
                <router-link to="/">
                    <div class="grid-content bg-purple-dark icon-box">
                        <img src="../assets/img/Ahome.png" alt="" v-if="status==1"/>
                        <img src="../assets/img/home.png" alt="" v-else/>
                    </div>
                    <span :class="status==1?'icon-title active':'icon-title'">首页</span>
                </router-link>

            </el-col>
            <el-col :span="8" @click="changeStatus(2)">
                <router-link to="/indent" >
                    <div class="grid-content bg-purple-dark icon-box">
                        <img src="../assets/img/Aorder.png" alt="" v-if="status==2"/>
                        <img src="../assets/img/order.png" alt="" v-else/>
                    </div>
                    <span :class="status==2?'icon-title active':'icon-title'">订单</span>
                </router-link>

            </el-col>
            <el-col :span="8" @click="changeStatus(3)">
                <router-link to="/me">
                    <div class="grid-content bg-purple-dark icon-box">
                        <img src="../assets/img/Apersonal.png" alt="" v-if="status==3"/>
                        <img src="../assets/img/personal.png" alt="" v-else/>
                    </div>
                    <span :class="status==3?'icon-title active':'icon-title'">我的</span>
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
            status:1,
        }
    },
    methods:{
        changeStatus(e){
            console.log(e);
            this.status=e;
        }
    }
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
