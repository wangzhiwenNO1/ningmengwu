<template>
    <div class="rounds">
        <div class="modalBox" v-if="isShow">
            <div class="modal">
                <h4>提示</h4>
                <div class="text"></div>
                <div class="btnRow">
                    <Button @click="uploadInfo(1)">确定</Button>
                    <Button @click="uploadInfo(2)">取消</Button>
                </div>
            </div>
        </div>
        <ul class="infinite-list" v-infinite-scroll="load" >
            <li v-for="(item,index) in dataList" class="infinite-list-item infoBox" :key="index">
                <div>
                    <span>退房客房</span><span>{{item.number}}{{item.name}}</span>
                </div>
                <div>
                    <span>退房时间</span><span>{{item.checkout_time}}</span>
                </div>
                <div><span>消费明细</span></div>
                <div v-for="(goos,idx) in item.goodsList" :key="idx">
                    <label>{{goos.name}}</label>
                    <RadioGroup v-model="goos.number" @on-change="(e)=>changeGoods(e,item.id,goos.price)">
                        <Radio  v-for="gos in goos.num" :key="gos" :label="gos" ></Radio>
                    </RadioGroup>
                </div>
                <div class="RowBtn">
                    <Button @click="confirm(item.id)">查房确认</Button>
<!--                    <Button>已清扫确认</Button>-->
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
        name: 'Rounds',
        components: {},
        data() {
            return {
                dataList: [],//数据
                goodsList:[],//商品数据
                count: 10,//数据条数
                loading: false,//load
                current_page:1,//当前页数
                last_page:"",//最大页数
                loadModu: true,
                isShow:false,//提交信息遮罩
                order_id:"",//房间id

                phone:'',
                animal:''
            };
        },
        created() {
            this.getList();


        },
        computed: {
            noMore() {
                return this.current_page=this.last_page;
            },
            disabled() {
                return this.loading || this.noMore
            }
        },
        methods: {
            ...mapActions(['submitForm']),
            getList() {

                //获取商品类型
                this.submitForm({
                    url: "operate/goods", data: {}, callback: (data) => {
                        console.log("operate/goods", data.data);
                        if (data.error == 0) {
                            data.data.forEach(item=>{
                                item.number=0;
                            });

                            this.goodsList=data.data;
                            this.submitForm({
                                url: "operate/lists", data: {page:this.current_page}, callback: (data) => {
                                    console.log("operate/lists", data.data);
                                    if (data.error == 0) {
                                        data.data.data.forEach((item) => {
                                            item.checkout_time = this.formatTime(item.checkout_time * 1000, 'Y-M-D h:m:s');
                                            item.goodsList=this.goodsList
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
                            });
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
            changeGoods(id,num,price){
                console.log("id,num",id,num,price);
                console.log(this.dataList);
                this.dataList.forEach(item=>{
                    if(item.id==id){
                        item.goodsPrice+=price*num;
                        console.log(item);
                    }
                })

            },
            confirm(id){
                let sum=0;
                let arr=[];
                this.dataList.forEach(item=>{
                    if(item.id==id){
                        item.goodsList.forEach(it=>{
                            sum+=(it.number)*(it.price);
                            console.log(it);
                            arr.push({id:it.id,num:it.number});
                        });
                        console.log(sum);
                    }
                });


                this.submitForm({
                    url: "operate/checkout", data: {order_id:this.order_id,goods:arr}, callback: (data) => {
                        console.log("operate/checkout", data.data);
                        if (data.error == 0) {
                            this.$Message.success(data.data);
                            this.isShow=false;
                        }
                    }
                })

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
    .RowBtn{
        display:flex;
        justify-content: space-around;
        padding:0.8rem;
    }
    .ivu-radio-wrapper{
        font-size:0.9rem;
    }
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
        padding-bottom: 1rem;

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
    .rounds {
        text-align: left;

        height: 100vh ;
        position: fixed;
        z-index: 999;
        width: 100%;


        .infinite-list {
            height: 100%;
            background: #F5F5F5;
            overflow:auto;
            padding-bottom: 1rem;

            span{
                padding:0.3rem;
                display: inline-block;
            }
            label{
                padding:0.3rem;
                font-size:0.8rem;
                display: inline-block;
            }
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
                    /*background: url("../../assets/img/more.png") no-repeat;*/
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
