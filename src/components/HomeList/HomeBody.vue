<template>
    <div class="home-body">
        <div class="banner">
            <el-carousel height="175px" arrow="hover" :autoplay="true">
                <el-carousel-item v-for="item in 4" :key="item">
                    <img src="../../assets/img/4.jpg" alt=""/>
                </el-carousel-item>
            </el-carousel>
        </div>

        <div class="house-floor">
            <div>
                <h4>推荐客房</h4>
                <i class="xian"></i>
            </div>
            <div class="house-list">
                <h5>标准间</h5>
                <ul class="standard">
                    <li v-for="(item,index) in 5" :key="index" @click="jump">
                        <img src="../../assets/img/standard.png" alt="">
                        <div class="intro">
                            <p class="room-num">房号：202</p>
                            <p class="price">￥320</p>
                        </div>
                    </li>
                </ul>
                <h5>大床房</h5>
                <ul class="big-bed">
                    <li v-for="(item,index) in 5" :key="index" @click="jump">
                        <img src="../../assets/img/bigbed.png" alt="">
                        <div class="intro">
                            <p class="room-num">房号：202</p>
                            <p class="price">￥320</p>
                        </div>
                    </li>
                </ul>
            </div>
            <div class="floor">
                <ul>
                    <li v-for="item in 5" :key="item" :class="item==1?'active':''">
                        {{item}}楼
                    </li>
                </ul>
            </div>
        </div>

    </div>
</template>

<script>
    // @ is an alias to /src

    export default {
        name: 'HomeListBody',
        data () {
            return {

            }
        },
        computed: {

        },
        methods: {
            jump(){
                this.$router.push({ path:'/orderadd'})
            }
        }
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
    .home-body{

        .house-floor{
            background:white;
            margin-bottom:10px;
            padding-top:15px;
            .xian{
                display: block;
                width:34px;
                height:2px;
                background:rgba(213,176,116,1);
                border-radius:1px;
                margin:6px auto 14px;
            }
        }
    }
    .floor{

        ul{
            overflow-x: scroll;
            display:flex;
            box-sizing:content-box;
            padding-right:15px;
            li{
                margin:2px 15px;
                width:102px;
                height:35px;
                background:rgba(213,176,116,1);
                border-radius:6px;
                flex-shrink: 0;
                line-height: 35px;
                color:white;
                font-size:14px;
            }
            .active{
                border:1px solid rgba(213,176,116,1);
            }
        }
    }
    .house-list{
        .standard,.big-bed{
            padding:7px 3px;
            display: flex;
            overflow-x: auto;
            li{
                flex-shrink: 0;
                width:180px;
                height:120px;
                margin:0 10px;
                border-radius: 10px;
                overflow: hidden;
                position: relative;
                img{
                    display: block;
                    width:100%;
                    height:100%;
                    object-fit: contain;
                    background:pink;
                }
                .intro{
                    position: absolute;
                    bottom:0;
                    left:0;
                    width:100%;
                    height:28px;
                    line-height: 28px;
                    display: flex;
                    justify-content: space-between;
                    color:rgba(255, 255, 255, 1);
                    background:rgba(0,0,0,0.3);
                    border-radius:0px 0px 5px 5px;
                    .room-num{
                        margin-left:8px;
                    }
                    .price{
                        margin-right:8px;
                    }
                }
            }
        }
    }
</style>
