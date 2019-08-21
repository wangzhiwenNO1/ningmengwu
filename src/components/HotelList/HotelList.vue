<template>
    <div>
        <div class="bgColor"></div>
        <div class="siteBox">
            <el-row>
                <el-col :span="18">
                    <div class="input-box">
                        <input type="text"/>
                        <i class="icon"></i>
                    </div>
                </el-col>
                <el-col :span="6" class="place">
                    <i class="icon"></i>离我最近
                </el-col>
            </el-row>
        </div>
        <ul class="hotellist">
            <li v-for="(item,index) in hotelList" :key="index" @click="changeClick">
                <el-row :gutter="20" :data-id="item.id">
                    <el-col :span="5">
                        <div class="picture"><img :src="item.img" alt=""/></div>
                    </el-col>
                    <el-col :span="14">
                        <div>
                            <h4>郑州云土酒店</h4>
                            <p class="site">距离您4.2km</p>
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
    </div>
</template>

<script>
    // @ is an alias to /src
    import {mapActions} from 'vuex'

    export default {
        name: 'HotelListCom',
        data() {
            return {
                input2: '',
                current_page:"",
                hotelList:[],
            }
        },
        created() {
            this.getHotel();
        },
        methods: {
            ...mapActions(['submitForm']),
            changeClick() {
                this.$router.push({path: '/'});
            },
            getHotel() {
                this.submitForm({
                    url: "hotel/lists", data: {}, callback: (data) => {
                        console.log(data);
                        if (data.error == 0) {
                            this.current_page=data.data.current_page;
                            this.hotelList=data.data.data;
                        }
                    }
                })
            }
        }
    }
</script>
<style lang="less" scoped>
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
                font-size: 12px;
                margin: 5px 0;
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
