<template>
    <div class="home-body">
        <div class="banner">
            <el-carousel height="175px" arrow="hover" :autoplay="true">
                <el-carousel-item v-for="item in 4" :key="item">
                    <img src="../../assets/img/4.jpg" alt=""/>
                </el-carousel-item>
            </el-carousel>
        </div>
        <div class="house-list">
            <div>
                <h4>推荐客房</h4>
                <i></i>
            </div>
            <div>
                <el-row>
                    <el-col span=""></el-col>
                </el-row>
            </div>
        </div>
    </div>
</template>

<script>
    // @ is an alias to /src

    export default {
        name: 'HomeListBody',

    }
</script>
<style lang="less" scoped>
    .el-carousel__item h3 {
        color: #475669;
        font-size: 14px;
        opacity: 0.75;
        line-height: 150px;
        margin: 0;
    }
    .el-carousel__item img{
        width:100%;
        object-fit: contain;
    }
    .el-carousel__item:nth-child(2n) {
        background-color: #99a9bf;
    }

    .el-carousel__item:nth-child(2n+1) {
        background-color: #d3dce6;
    }
</style>
