<template>
    <div class="indent">
        <Modal v-model="modal6" :loading="loadModu" @on-ok="asyncOK">
            <p>房间信息上传？</p>
        </Modal>
        <ul class="infinite-list" v-infinite-scroll="load" >
            <li v-for="(item,index) in dataList" class="infinite-list-item infoBox">
                <h3>{{item.number}}房间</h3>
                <ul>
                    <li><span>订单编号：</span>{{item.id+100000}}</li>
                    <li><span>创建时间：</span>{{item.create_time}}</li>
                    <li><span>入住时间：</span>{{item.begin_date}}</li>
                    <li><span>离店时间：</span>{{item.end_date}}</li>
                    <li><span>支付费用：</span>{{item.total}} (房费{{item.cost}} 押金:{{item.deposit}}元)</li>
                </ul>

                <div class="btnRow">
                    <el-button class="add" @click="changeVerify">核实身份信息</el-button>
                </div>
            </li>
        </ul>
        <Spin fix v-if="spinShow">
            <Icon type="ios-loading" size=18 class="demo-spin-icon-load"></Icon>
            <div>Loading</div>
        </Spin>
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
                dataList: "",
                count: 10,
                loading: false,
                current_page:"",
                last_page:"",
                spinShow:false,
                modal6: false,
                loadModu: true
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
                            // data.data.data.forEach((item) => {
                            //     item.create_time = this.formatTime(item.create_time * 1000, 'Y-M-D h:m:s')
                            // });
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
                this.spinShow=true;
                if(this.current_page==this.last_page){
                    this.loading = false;
                    setTimeout(()=>{
                        this.spinShow=false;
                    },200)

                }else{
                    this.current_page++;
                    this.getList();
                    setTimeout(()=>{
                        this.spinShow=false;
                    },200)
                }
            },
            asyncOK () {
                setTimeout(() => {
                    this.modal6 = false;
                }, 2000);
            },
            changeVerify(){
                this.modal6 = true;

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
