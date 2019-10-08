<template>
    <div class="mainBox">
        <div class="viewTop">
            <img src="" alt="">
        </div>
        <div class="main">
            <div class="title">前台系统</div>
            <div class="formBox">
                <div class="flexBox">
                    <label class="account ">账号:</label>
                    <Input class="inp" v-model="name" />
                </div>
                <div class="flexBox">
                    <label class="account " >密码:</label>
                    <Input class="inp" v-model="password" />
                </div>
                <div>
                    <Button class="sumbit">登录</Button>
                </div>
            </div>

        </div>

    </div>

</template>
<script>
    export default {
        data () {
            return {
                password: '',
                name:''

            }
        }
    }
</script>
<style lang="less" scoped>
    .mainBox{
        font-family: "微软雅黑";
        background: #323232;
        color:white;
        height:calc(100vh - 50px) ;
    }
    .viewTop{
        width:100%;
        background:#F0D19A;
        height:15rem;
    }
    .title{
        padding:1rem 0.9rem;
        background:#F0D19A;
        width:10rem;
        margin:1rem auto;
        border-radius: 0.3rem;
        font-size:1.2rem;
    }
    .formBox{
        width:80%;
        background:white;
        margin:0 auto;
        border-radius: 1rem;
    }
    .flexBox{
        display:flex;
        align-items: center;
        padding:1rem 0;
        color:black;
    }
    .account {
        width:4rem;
    }
    .inp{
        width:70%;
    }
    .sumbit{
        width:50%;
        margin:0 auto 1rem;
        background:#F0D19A;
        box-shadow: none;
        color: white;
        border:none;
    }
    .ivu-btn:focus{
        box-shadow: none;
        color: white;
        border:none;
    }
</style>
