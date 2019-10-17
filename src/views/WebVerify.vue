<template>
    <div class="indent">
        <div class="modalBox" v-if="isShow">
            <div class="modal">
                <h4>提示</h4>
                <div class="text">是否上传房间信息</div>
                <div class="btnRow">
                    <Button @click="uploadInfo(1)">确定</Button>
                    <Button @click="uploadInfo(2)">取消</Button>
                </div>
            </div>
        </div>
        <ul class="infinite-list" v-infinite-scroll="load" >
            <li v-for="(item,index) in dataList" class="infinite-list-item infoBox" :key="index">
                <h3>{{item.number}}房间</h3>
                <ul>
                    <li><span>订单编号：</span>{{item.id+100000}}</li>
                    <li><span>身份证号：</span>{{item.idcard}}</li>
                    <li><span>创建时间：</span>{{item.create_time}}</li>
                    <li><span>入住时间：</span>{{item.begin_date}}</li>
                    <li><span>离店时间：</span>{{item.end_date}}</li>
                    <li><span>支付费用：</span>{{item.total}} (房费{{item.cost}} 押金:{{item.deposit}}元)</li>
                </ul>
                <div class="btnRow">
                    <el-button class="add" @click="changeVerify(item.id)">核实身份信息</el-button>
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

    export default {
        name: 'UnIndent',
        components: {},
        data() {
            return {
                dataList: [],//数据
                count: 10,//数据条数
                loading: false,//load
                current_page:"",//当前页数
                last_page:"",//最大页数
                loadModu: true,
                isShow:false,//提交信息遮罩
                order_id:"",//房间id
            };
        },
        created() {
            this.getList()
        },
        computed: {
            noMore() {
                return this.count >= 20
            },
            disabled() {
                return this.loading || this.noMore
            }
        },
        methods: {
            ...mapActions(['submitForm']),
            getList() {
                this.submitForm({
                    url: "operate/lists", data: {page:this.current_page}, callback: (data) => {
                        console.log("operate/lists", data.data);
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
                            this.current_page++;
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
                    this.getList();
                }
            },

            changeVerify(e){
                this.isShow=true;
                this.order_id=e;
            },
            uploadInfo(e){
                if(e==1){
                    this.submitForm({
                        url: "operate/checkin", data: {order_id:this.order_id}, callback: (data) => {
                            console.log("operate/checkin", data.data);
                            if (data.error == 0) {
                                this.$Message.success(data.data);
                                this.isShow=false;
                            }
                        }
                    })
                }else{
                    this.isShow=false;
                }
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
    .modalBox{
        position:fixed;
        width:100%;
        height:100vh;
        background:rgba(0,0,0,.2);
        display:flex;
        align-items: center;

        .modal{
            width:80%;
            height:10rem;
            background:white;
            margin:auto;
            border-radius: 1rem;
            text-align: center;

            h4{
                color:#d5b074;
                border-bottom: 1px solid #eeeeee;
                padding:0.6rem;
            }
            .text{
                height:3rem;
                line-height: 3rem;
            }
            .btnRow{
                display:flex;
                justify-content: space-around;
            }
        }
    }
    .indent {
        text-align: left;

        height: 100vh ;
        position: fixed;
        z-index: 999;
        width: 100%;

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
                font-size:0.9rem;

                .icon {
                    width: 9px;
                    height: 12px;
                    /*background: url("../../assets/img/more.png") no-repeat;*/
                    background-size: cover;
                    margin-left: 5px;
                }

                h3 {
                    font-size: 16px;
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
