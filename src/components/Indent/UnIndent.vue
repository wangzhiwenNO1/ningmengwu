<template>

    <div class="indent infinite-list-wrapper">
        <ul class="list" v-infinite-scroll="load" infinite-scroll-disabled="disabled">
            <li  v-for="(item,index) in dataList" class="list-item infoBox" :key="index">
                <div class="title">
                    <h3>{{item.hotel_name}}<i class="icon"></i></h3>
                    <p>待支付</p>
                </div>
                <el-row>
                    <el-col :span="5">
                        <div class="imgBox"><img :src="item.img" alt=""></div>
                    </el-col>
                    <el-col :span="19" class="info">
                        <h3>{{item.number}}房间</h3>
                        <ul>
                            <li><span>订单编号：</span>{{item.id+100000}}</li>
                            <li><span>创建时间：</span>{{item.create_time}}</li>
                            <li><span>入住时间：</span>{{item.begin_date}}</li>
                            <li><span>离店时间：</span>{{item.end_date}}</li>
                            <li><span>支付费用：</span>{{item.total}} (房费{{item.cost}} 押金:{{item.deposit}}元)</li>
                        </ul>
                    </el-col>
                </el-row>
                <div class="btnRow">
                    <el-button class="add" @click="continues(item.id)">继续支付</el-button>
                    <el-button class="cancel">取消</el-button>
                </div>
            </li>
        </ul>
        <p v-if="loading">加载中...</p>
        <p v-if="noMore">没有更多了</p>

    </div>
<!--        <div class="infoBox" v-for="(item,index) in dataList" :key="index">-->
<!--            <div class="title">-->
<!--                <h3>{{item.hotel_name}}<i class="icon"></i></h3>-->
<!--                <p>待支付</p>-->
<!--            </div>-->
<!--            <el-row>-->
<!--                <el-col :span="5">-->
<!--                    <div class="imgBox"><img :src="item.img" alt=""></div>-->
<!--                </el-col>-->
<!--                <el-col :span="19" class="info">-->
<!--                    <h3>{{item.number}}房间</h3>-->
<!--                    <ul>-->
<!--                        <li><span>订单编号：</span>{{item.id+100000}}</li>-->
<!--                        <li><span>创建时间：</span>{{item.create_time}}</li>-->
<!--                        <li><span>入住时间：</span>{{item.begin_date}}</li>-->
<!--                        <li><span>离店时间：</span>{{item.end_date}}</li>-->
<!--                        <li><span>支付费用：</span>{{item.total}} (房费{{item.cost}} 押金:{{item.deposit}}元)</li>-->
<!--                    </ul>-->
<!--                </el-col>-->
<!--            </el-row>-->
<!--            <div class="btnRow">-->
<!--                <el-button class="add" @click="continues(item.id)">继续支付</el-button>-->
<!--                <el-button class="cancel">取消</el-button>-->
<!--            </div>-->
<!--        </div>-->

</template>

<script>
    // @ is an alias to /src
    import {mapActions} from 'vuex'

    export default {
        name: 'UnIndent',
        components: {},
        data() {
            return {

                dataList: "",
                count: 10,
                loading: false
            };
        },
        created() {
            console.log(123);
            this.getList()
        },
        computed: {
            noMore () {
                return this.count >= 20
            },
            disabled () {
                return this.loading || this.noMore
            }
        },
        methods: {
            ...mapActions(['submitForm']),
            getList() {
                this.submitForm({
                    url: "order/lists", data: {status: 0}, callback: (data) => {
                        console.log("order/lists", data.data);
                        if (data.error == 0) {
                            data.data.data.forEach((item) => {
                                item.create_time = this.formatTime(item.create_time * 1000, 'Y-M-D h:m:s')
                            });
                            this.dataList = data.data.data;
                        }
                    }
                })
            },
            load () {
                this.loading = true
                setTimeout(() => {
                    this.count += 2
                    this.loading = false
                }, 2000)
            },
            continues() {

            },
            // 格式化日期，如月、日、时、分、秒保证为2位数
            formatNumber(n) {
                n = n.toString()
                return n[1] ? n : '0' + n;
            },
            // 参数number为毫秒时间戳，format为需要转换成的日期格式
            formatTime(number, format) {
                let time = new Date(number)
                let newArr = []
                let formatArr = ['Y', 'M', 'D', 'h', 'm', 's']
                newArr.push(time.getFullYear())
                newArr.push(this.formatNumber(time.getMonth() + 1))
                newArr.push(this.formatNumber(time.getDate()))

                newArr.push(this.formatNumber(time.getHours()))
                newArr.push(this.formatNumber(time.getMinutes()))
                newArr.push(this.formatNumber(time.getSeconds()))

                for (let i in newArr) {
                    format = format.replace(formatArr[i], newArr[i])
                }
                return format;
            }
        }
    }
</script>
<style lang="less" scoped>
    .indent {
        text-align: left;
        padding: 0 15px;

        .infoBox {
            padding: 14px;
            background: rgba(255, 255, 255, 1);
            border-radius: 8px;
            margin-top: 13px;

            .title {
                display: flex;
                justify-content: space-between;
                align-items: center;
                padding: 3px 0 10px;

                .icon {
                    width: 9px;
                    height: 12px;
                    background: url("../../assets/img/more.png") no-repeat;
                    background-size: cover;
                    margin-left: 5px;
                }

                h3 {
                    font-size: 14px;
                    font-weight: 400;
                    color: rgba(70, 70, 70, 1);
                    line-height: 16px;
                    display: flex;
                    justify-content: space-between;
                    align-items: center;
                }

                p {
                    font-weight: 400;
                    color: rgba(122, 122, 122, 1);
                    line-height: 17px;
                    font-size: 12px;
                }
            }

            .imgBox {
                width: 55px;
                height: 65px;

                img {
                    width: 100%;
                    height: 100%;
                    object-fit: cover;
                }
            }

            .info {
                font-size: 12px;
                color: rgba(122, 122, 122, 1);
                line-height: 10px;

                h3 {
                    font-size: 16px;
                    font-weight: 600;
                    color: rgba(51, 51, 51, 1);
                    line-height: 16px;
                    padding: 0px 0 4px;
                }

                ul {
                    li {
                        padding: 5px 0;
                    }
                }
            }
        }

        .btnRow {
            display: flex;
            justify-content: center;
            margin-top: 15px;
        }

        .add, .cancel {
            width: 120px;
            padding: 0;
            height: 35px;
            font-size: 14px;
            border-radius: 6px;
            color: white;
        }

        .add {
            background: rgba(213, 176, 116, 1);
            margin-right: 10px;
        }

        .cancel {
            background: rgba(223, 223, 223, 1);
        }
    }
</style>
