<template>
    <div>
        <div class="bgColor"></div>
        <div class="siteBox">
            <el-row>
                <el-col :span="18">
                    <div class="input-box">
                        <input type="text" v-model="keyWord"/>
                        <i class="icon" @click="changeInput"></i>
                    </div>
                </el-col>
                <el-col :span="6" class="place" @click="changeDistance">
                    <i class="icon"></i>离我最近
                </el-col>
            </el-row>
        </div>
        <ul class="hotellist infinite-list" v-infinite-scroll="load" >
            <li class="infinite-list-item" v-for="(item,index) in hotelList" :key="index" @click="changeClick(item)">
                <el-row :gutter="20" :data-id="item.id" class="rowList">
                    <el-col :span="5">
                        <div class="picture"><img :src="item.img" alt=""/></div>
                    </el-col>
                    <el-col :span="14" class="rowInfoBox">
                        <div class="rowInfo">
                            <h4>{{item.name}}</h4>
                            <p class="site" v-if="item.distance">距离您{{item.distance}}km</p>
                            <div class="housType">
                                <span v-for="(room,ide) in item.room_name" :key="ide">
                                    {{room.name}}
                                    <span v-if="ide!=item.room_name.length-1">|</span>
                                </span>
                            </div>
                        </div>
                    </el-col>
                    <el-col :span="5" style="padding:0;">
                        <div class="price">￥<span>{{item.min_price}}</span>起</div>
                    </el-col>
                </el-row>
            </li>
        </ul>
        <p v-if="loading">加载中...</p>
        <p v-if="noMore">没有更多了</p>
    </div>
</template>

<script>
    // @ is an alias to /src
    import {mapActions} from 'vuex'
    import wx from 'weixin-js-sdk'

    export default {
        name: 'HotelListCom',
        data() {
            return {
                input2: '',
                current_page:"",
                hotelList:[],
                count:'',
                loading:false,
                latitudes:'',
                longitudes:'',
                sort:'',
                keyWord:'',
            }
        },
        computed: {
            noMore () {
                return this.count >= 20
            },
            disabled () {
                return this.loading || this.noMore
            }
        },
        created() {
            this.getWxInfo();
            // console.log(localStorage.getItem("PHPSESSID"));
        },
        mounted(){

        },
        methods: {
            ...mapActions(['submitForm']),
            changeClick(item) {
                this.$router.push({path: '/homelist',query:{hotel:item}});
            },
            getHotel() {
                let that=this;
                this.submitForm({
                    url: "hotel/lists", data: {
                        latitude:this.latitudes,
                        longitude:this.longitudes,
                        page:this.current_page,
                        sort:this.sort,
                        key:this.keyWord
                    },
                    callback: (data) => {
                        if (data.error == 0) {
                            console.log(data);
                            if(this.current_page==1){
                                this.current_page=data.data.current_page;
                                this.hotelList=data.data.data;
                            }else{
                                data.data.data.forEach(item=>{
                                    that.hotelList.push(item)
                                })
                            }

                            this.current_page++;
                        }
                    }
                })
            },
            getWxInfo() {
                let that=this;
                this.submitForm({
                    url: "home/option", data: {url:"/#/"}, callback: (data) => {
                        console.log("home/option",data);

                        wx.config(data.data);
                        that.getHotel();
                        if(that.latitudes){
                            that.getHotel();
                        }else{
                            wx.ready(function(){
                                // config信息验证后会执行ready方法，所有接口调用都必须在config接口获得结果之后，config是一个客户端的异步操作，所以如果需要在页面加载时就调用相关接口，则须把相关接口放在ready函数中调用来确保正确执行。对于用户触发时才调用的接口，则可以直接调用，不需要放在ready函数中。
                                wx.getLocation({
                                    type: 'wgs84', // 默认为wgs84的gps坐标，如果要返回直接给openLocation用的火星坐标，可传入'gcj02'
                                    success: function (res) {
                                        that.latitudes = res.latitude; // 纬度，浮点数，范围为90 ~ -90
                                        that.longitudes = res.longitude; // 经度，浮点数，范围为180 ~ -180。
                                        // var speed = res.speed; // 速度，以米/每秒计
                                        // var accuracy = res.accuracy; // 位置精度
                                        console.log(res);
                                        that.getHotel();
                                        alert(res)
                                    }
                                });
                            });
                        }
                    }
                })
            },
            changeDistance(){
                this.current_page=1;
                this.sort=1;
                console.log(this.sort);
                this.getHotel();
            },
            changeInput(){
                this.getHotel();
            },
            load () {

            }
        }
    }
</script>
<style lang="less" scoped>
    .rowList{
        height:100%;
        .rowInfoBox{
            height:100%;
        }
        .rowInfo{
            height:100%;
            display:flex;
            flex-direction: column;
            justify-content: space-between;
        }
    }
    .el-col el-col-5{
        padding:0;
    }
    .bgColor {
        background: white;
        height: 100vh;
        width: 100%;
        position: fixed;
        z-index: -1;
    }

    .siteBox {
        background: white;
    }

    .input-box {
        width: 260px;
        height: 30px;
        background: rgba(245, 245, 245, 1);
        border-radius: 15px;
        margin: 10px auto 0;
        position: relative;
        overflow: hidden;

        .icon {
            width: 13px;
            height: 13px;
            position: absolute;
            top: 25%;
            right: 15px;
            background-image: url("../../assets/img/search.png");
            background-size: cover;
        }

        input {
            width: 100%;
            height: 100%;
            border: none;
            background: rgba(245, 245, 245, 1);
            outline: medium;
            padding: 0 35px 0 15px;
            box-sizing: border-box;
        }
    }

    .place {
        height: 45px;
        display: flex;
        align-items: center;
        justify-content: center;
        font-size: 13px;
        color: rgba(70, 70, 70, 1);

        .icon {
            display: inline-block;
            width: 12px;
            height: 14px;
            background: url("../../assets/img/site.png") no-repeat;
            background-size: cover;
            margin-right: 3px;
        }
    }

    .hotellist {
        li {
            width: 100%;
            height: 105px;
            border-bottom: 1px solid rgba(0, 0, 0, 0.1);
            box-sizing: border-box;
            padding: 20px 15px;
            text-align: left;
            background: white;

            .picture {
                width: 55px;
                height: 65px;

                img {
                    width: 100%;
                    height: 100%;
                    object-fit: cover;
                }
            }

            .site {
                color: rgba(122, 122, 122, 1);
                font-size: 0.8rem;
                margin: 0.5rem 0;
            }

            .housType {
                font-size: 14px;
            }

            .price {
                position: absolute;
                bottom: 0;

            }


            .price {
                font-size: 12px;
                font-weight: 400;
                color: rgba(213, 176, 116, 1);
                line-height: 14px;

                span {
                    font-size: 20px;
                }
            }
        }
    }


</style>
