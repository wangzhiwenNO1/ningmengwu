<template>
    <div class="home-body">
        <div class="banner">
            <el-carousel height="175px" arrow="hover" :autoplay="true">
                <el-carousel-item v-for="(item,index) in bannerList" :key="index">
                    <img :src="item" alt=""/>
                </el-carousel-item>
            </el-carousel>
        </div>

        <div class="house-floor">
            <div>
                <h4 v-if="isRecommend">推荐客房</h4>
                <h4 v-else>{{currentFloor}}楼</h4>
                <i class="xian"></i>
            </div>
            <div class="house-list">
                <ul class="standard" v-if="recommendList">
                    <li v-for="(item,index) in recommendList" :key="index" @click="jump(item.id)" >
                        <div class="roomType">{{item.name}}</div>
                        <img :src="item.img" alt="">
                        <div class="intro">
                            <p class="room-num">房号：{{item.number}}</p>
                            <p class="price">￥{{item.price}}</p>
                        </div>
                    </li>
                </ul>
                <div v-else>此楼层暂无房间</div>
            </div>
            <div class="floor ">
                <ul>
                    <li v-for="item in floor" :key="item" :class="item==1?'active':''" @click="changeFloor(item)">
                        {{item}}楼
                    </li>
                </ul>
            </div>

        </div>

    </div>
</template>

<script>
    // @ is an alias to /src
    import {mapActions} from 'vuex'

    export default {
        name: 'HomeListBody',
        data() {
            return {
                bannerList: [],
                recommendList:[],//推荐房间
                isRecommend:true,
                currentFloor:"",
                floor: "",
                minTime:"",//判断是否在零点之前
            }
        },
        computed: {},
        created() {
            this.getBanner();
            this.recommendFloor();

        },
        methods: {
            ...mapActions(['submitForm']),
            jump(id) {
                let roomInfo={};
                this.recommendList.forEach((item)=>{
                    if(item.id==id){
                        roomInfo=item;
                    }
                })
                this.$router.push({name: 'orderadd',params: {
                        minTime: this.minTime,
                        id:id,
                        roomInfo:roomInfo
                    }
                });
            },
            getBanner() {
                this.submitForm({
                    url: "room/banner", data: {hotel_id: "1"}, callback: (data) => {
                        console.log("banner",data);
                        if (data.error == 0) {
                            this.floor = data.data.floor;
                            this.bannerList = data.data.imgs;
                            this.minTime=data.data.lingchen;
                        }
                    }
                })
            },
            changeFloor(index) {
                console.log(index);
                this.isRecommend=false;
                this.currentFloor=index;
                this.recommendFloor(this.currentFloor)
            },
            recommendFloor(floor) {
                this.submitForm({
                    url: "room/lists", data: {hotel_id: "1",floor:floor}, callback: (data) => {
                        console.log(data);
                        if (data.error == 0) {
                            this.recommendList=data.data;
                        }
                    }
                })
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

    .el-carousel__item img {
        width: 100%;
        object-fit: contain;
    }

    .el-carousel__item:nth-child(2n) {
        background-color: #99a9bf;
    }

    .el-carousel__item:nth-child(2n+1) {
        background-color: #d3dce6;
    }

    .home-body {

        .house-floor {
            background: white;
            margin-bottom: 10px;
            padding-top: 15px;

            .xian {
                display: block;
                width: 34px;
                height: 2px;
                background: rgba(213, 176, 116, 1);
                border-radius: 1px;
                margin: 6px auto 6px;
            }
        }
    }

    .floor {

        ul {
            overflow-x: scroll;
            display: flex;
            box-sizing: content-box;
            padding-right: 15px;
            &::-webkit-scrollbar {display:none}

            li {
                margin: 2px 15px;
                width: 102px;
                height: 35px;
                background: rgba(213, 176, 116, 1);
                border-radius: 6px;
                flex-shrink: 0;
                line-height: 35px;
                color: white;
                font-size: 14px;
            }

            .active {
                border: 1px solid rgba(213, 176, 116, 1);
            }
        }
    }

    .house-list {
        .standard, .big-bed {
            padding: 7px;
            display: flex;
            flex-wrap: wrap;
            max-height:275px;
            overflow-y: auto;
            justify-content: space-between;
            /*&::-webkit-scrollbar {display:none}*/
            li {
                flex-shrink: 0;
                width: 48%;
                height: 120px;
                border-radius: 10px;
                overflow: hidden;
                position: relative;
                margin:5px 0;
                img {
                    display: block;
                    width: 100%;
                    height: 100%;
                    object-fit: cover;
                }
                .roomType{
                    position: absolute;
                    top: 0;
                    left: 0;
                    width:100%;
                    font-weight: bold;
                    font-size:1rem;
                    padding:0.3rem 0;
                }
                .intro {
                    position: absolute;
                    bottom: 0;
                    left: 0;
                    width: 100%;
                    height: 28px;
                    line-height: 28px;
                    display: flex;
                    justify-content: space-between;
                    color: rgba(255, 255, 255, 1);
                    background: rgba(0, 0, 0, 0.3);
                    border-radius: 0px 0px 5px 5px;

                    .room-num {
                        margin-left: 8px;
                    }

                    .price {
                        margin-right: 8px;
                    }
                }
            }
        }
    }
    .element, .outer-container {
        width: 100%;
        height: 100px;
    }

    .outer-container {
        border: 5px solid purple;
        position: relative;
        overflow: hidden;
    }

    .inner-container {
        position: absolute;
        left: 0;
        overflow-y: hidden;
        overflow-x: scroll;
    }

    .inner-container::-webkit-scrollbar {
        display: none;
    }
</style>
