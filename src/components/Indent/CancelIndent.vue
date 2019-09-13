<template>
    <div class="indent">
        <ul class="infinite-list" v-infinite-scroll="load" style="overflow:auto">
            <li v-for="(item,index) in dataList" class="infinite-list-item infoBox">
                <div class="title">
                    <h3>{{item.hotel_name}}<i class="icon"></i></h3>
                    <p>已取消</p>
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
            </li>
        </ul>

    </div>
</template>

<script>
    // @ is an alias to /src
    import {mapActions} from 'vuex'

    export default {
        name: 'UnIndent',
        components: {

        },

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
        created(){
            console.log(123);
            this.getList(-1);
        },
        methods:{
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
            load () {
                this.loading = true;
                if(this.current_page==this.last_page){
                    this.loading = false;
                }else{
                    this.current_page++;
                    this.getList(-1);
                }
            },
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
            },
            formatNumber(n) {
                n = n.toString()
                return n[1] ? n : '0' + n;
            },
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
            padding-bottom: 0.2rem;
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
