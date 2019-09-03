<template>
    <div class="indent">
        <ul class="infinite-list" v-infinite-scroll="load" style="overflow:auto">
            <li v-for="i in count" class="infinite-list-item infoBox">
                <div class="title">
                    <h3>鹏程国家大酒店<i class="icon"></i></h3>
                    <p>已取消</p>
                </div>
                <el-row>
                    <el-col :span="5">
                        <div class="imgBox"><img src="../../assets/img/4.jpg" alt=""></div>
                    </el-col>
                    <el-col :span="19" class="info">
                        <h3>202房间</h3>
                        <ul>
                            <li><span>订单编号：</span>54984657987</li>
                            <li><span>创建时间：</span>2019-05-24 12:30:09</li>
                            <li><span>入住时间：</span>2019-05-24</li>
                            <li><span>离店时间：</span>2019-05-24</li>
                            <li><span>支付费用：</span>0.02 (房费0.01 押金:0.01元)</li>
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
                count: 0
            };
        },
        created(){
            console.log(123);
            this.submitForm({
                url: "order/lists", data: {status: 2}, callback: (data) => {
                    console.log("order/lists",data);
                    if (data.error == 0) {

                    }
                }
            })
        },
        methods:{
            ...mapActions(['submitForm']),
            load () {
                this.count += 2
            }
        }
    }
</script>
<style lang="less" scoped>
    .infinite-list{
        height: calc(100vh - 100px) ;
    }
    .indent{
        text-align: left;
        padding:0 15px;
        .infoBox{
            padding:14px;
            background:rgba(255,255,255,1);
            border-radius:8px;
            margin-top:13px;
            .title{
                display: flex;
                justify-content: space-between;
                align-items: center;
                padding:3px 0 10px;
                .icon{
                    width:9px;
                    height:12px;
                    background: url("../../assets/img/more.png") no-repeat;
                    background-size:cover;
                    margin-left:5px;
                }
                h3{
                    font-size:14px;
                    font-weight:400;
                    color:rgba(70,70,70,1);
                    line-height:16px;
                    display: flex;
                    justify-content: space-between;
                    align-items: center;
                }
                p{
                    font-weight:400;
                    color:rgba(122,122,122,1);
                    line-height:17px;
                    font-size:12px;
                }
            }
            .imgBox{
                width:55px;
                height:65px;
                img{
                    width:100%;
                    height:100%;
                    object-fit: cover;
                }
            }
            .info{
                font-size:12px;
                color:rgba(122,122,122,1);
                line-height:10px;
                h3{
                    font-size:16px;
                    font-weight:600;
                    color:rgba(51,51,51,1);
                    line-height:16px;
                    padding:0px 0 4px;
                }
                ul{
                    li{
                        padding:5px 0;
                    }
                }
            }
        }
        .btnRow{
            display: flex;
            justify-content: center;
            margin-top:15px;
        }
        .add,.cancel{
            width:120px;
            padding:0;
            height:35px;
            font-size:14px;
            border-radius:6px;
            color:white;
        }
        .add{
            background:rgba(213,176,116,1);
            margin-right: 10px;
        }
        .cancel{
            background:rgba(223,223,223,1);
        }
    }
</style>
