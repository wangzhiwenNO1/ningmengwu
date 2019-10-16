<template>
    <div class="indent">
        <ul class="infinite-list" v-infinite-scroll="load" >
            <li v-for="(item,index) in dataList" class="infinite-list-item infoBox">
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
                    <el-button class="cancel" @click="cancelOrder(item.id)">取消</el-button>
                </div>
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
        name: 'UnIndent',
        components: {},
        props:[],
        data() {
            return {
                dataList: "",
                count: 10,
                loading: false,
                current_page:"",
                last_page:"",
                spinShow:false
            };
        },
        created() {
            this.getList(0);
            this.submitForm({
                url: "home/option", data: {url:`/#/indent`}, callback: (datas) => {
                    wx.config(datas.data);
                }
            });
        },
        computed: {
            noMore() {
                return this.current_page==this.last_page;
            },
            disabled() {
                return this.loading || this.noMore
            }
        },
        methods: {
            ...mapActions(['submitForm']),

            getList(status) {
                this.submitForm({
                    url: "order/lists", data: {status: status,page:this.current_page}, callback: (data) => {
                        console.log("order/lists", data.data);
                        if (data.error == 0) {
                            data.data.data.forEach((item) => {
                                item.create_time = this.formatTime(item.create_time * 1000, 'Y-M-D h:m:s')
                            });
                            if(data.data.current_page==1){
                                this.dataList = data.data.data;
                            }else{
                                data.data.data.forEach((i)=>{
                                    this.dataList.push(i);
                                })
                            }

                            this.current_page=data.data.current_page;
                            this.last_page=data.data.last_page;
                        }
                    }
                })
            },
            load() {
                this.loading = true;

                if(this.current_page==this.last_page){
                    this.loading = false;
                }else{
                    this.current_page++;
                    this.getList(0);
                }
            },
            continues(id) {
                this.submitForm({
                    url: "wxpay/notice", data: {order_id: id}, callback: (data) => {
                        console.log("wxpay/notice",data);
                        // if (data.error == 0) {
                        //     this.$emit("changePart",2);
                        //
                        // }
                        if (data.error == 0) {
                            wx.chooseWXPay({
                                timestamp:d.timestamp, // 支付签名时间戳，注意微信jssdk中的所有使用timestamp字段均为小写。但最新版的支付后台生成签名使用的timeStamp字段名需大写其中的S字符
                                nonceStr: d.nonceStr, // 支付签名随机串，不长于 32 位
                                package: d.package, // 统一支付接口返回的prepay_id参数值，提交格式如：prepay_id=\*\*\*）
                                signType: d.signType, // 签名方式，默认为'SHA1'，使用新版支付需传入'MD5'
                                paySign: d.paySign, // 支付签名
                                success: function (res) {
                                    // 支付成功后的回调函数
                                    this.$Message.info("成功");
                                    this.$router.push({path: 'homepage'})
                                }
                            });

                            // this.$router.push({path: 'homepage'});
                        }else{
                            this.$Message.info(data.message);
                        }
                    }
                })
            },
            cancelOrder(id){//取消订单

                // this.submitForm({
                //     url: "room/banner", data: {hotel_id: "1"}, callback: (data) => {
                //         console.log("banner",data);
                //         if (data.error == 0) {
                //             this.floor = data.data.floor;
                //             this.bannerList = data.data.imgs;
                //             this.minTime=data.data.lingchen;
                //         }
                //     }
                // })

            },
            // 格式化日期，如月、日、时、分、秒保证为2位数
            formatNumber(n) {
                n = n.toString()
                return n[1] ? n : '0' + n;
            },
            // 参数number为毫秒时间戳，format为需要转换成的日期格式
            formatTime(number, format) {
                let time = new Date(number);
                let newArr = [];
                let formatArr = ['Y', 'M', 'D', 'h', 'm', 's'];
                newArr.push(time.getFullYear());
                newArr.push(this.formatNumber(time.getMonth() + 1));
                newArr.push(this.formatNumber(time.getDate()));

                newArr.push(this.formatNumber(time.getHours()));
                newArr.push(this.formatNumber(time.getMinutes()));
                newArr.push(this.formatNumber(time.getSeconds()));

                for (let i in newArr) {
                    format = format.replace(formatArr[i], newArr[i])
                }
                return format;
            }
        }
    }
</script>
<style lang="less" scoped>
    .demo-spin-icon-load{
        animation: ani-demo-spin 1s linear infinite;
    }
    @keyframes ani-demo-spin {
        from { transform: rotate(0deg);}
        50%  { transform: rotate(180deg);}
        to   { transform: rotate(360deg);}
    }
    .demo-spin-col{
        height: 100px;
        position: relative;
        border: 1px solid #eee;
    }
    .indent {
        text-align: left;

        height: calc(100vh - 95px) ;

        .infinite-list {
            height: 100%;
            background: #F5F5F5;
            overflow:auto;
        }

        .infoBox {
            padding: 14px;
            background: rgba(255, 255, 255, 1);
            border-radius: 8px;
            width:95%;
            margin:1rem auto 0;

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
