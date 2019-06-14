<template>
    <div class="invoice-box">
        <div class="invoice">
            <el-row>
                <el-col :span="8">发票单位名称：</el-col>
                <el-col :span="16">
                    <div><input type="text" v-model="name"></div>
                </el-col>
            </el-row>
            <el-row>
                <el-col :span="8">发票单位税号：</el-col>
                <el-col :span="16">
                    <div><input type="text" v-model="num"></div>
                </el-col>
            </el-row>
        </div>
        <div class="btn-row">
            <el-button class="add">立即添加</el-button>
            <el-button class="cancel">取消</el-button>
        </div>

    </div>

</template>

<script>

    export default {
        name: 'InvoiceAdd',
        components: {
        },
        data(){
            return{
                name:'',
                num:''
            }
        }
    }
</script>
<style lang="less" scoped>
    .invoice-box{
        padding:15px;
        height:100%;
        color:rgba(70, 70, 70, 1);
        font-size:14px;
        .invoice{
            background:rgba(255,255,255,1);
            box-shadow:0px 4px 8px 0px rgba(0,0,0,0.06);
            border-radius:5px;
            padding:20px 5px;
            line-height: 25px;
            margin-bottom:25px;
            input{
                width:90%;
                height:25px;
                border-radius:4px;
                border:1px solid rgba(224,224,224,1);
                outline: none;
                padding:0 5px;
            }
            .el-row {
                margin-bottom: 20px;
                &:last-child {
                    margin-bottom: 0;
                }
            }
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
