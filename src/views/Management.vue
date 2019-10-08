<template>
    <div class="mainBox">
        <div class="viewTop">
            <img src="" alt="">
        </div>
        <div class="main">
            <div class="title">楼层登录</div>
            <div class="formBox">
                <div class="flexBox">
                    <label class="account ">账号:</label>
                    <Input class="inp" v-model="name" />
                </div>
                <div class="flexBox">
                    <label class="account " >密码:</label>
                    <Input class="inp" v-model="password" />
                </div>
                <Alert type="error" class="prompt" v-if="isLogin">账号或密码错误</Alert>
                <div>
                    <Button class="sumbit" @click="login">登录</Button>
                </div>

            </div>

        </div>

    </div>

</template>
<script>
    import {mapActions} from 'vuex'
    export default {
        data () {
            return {
                password: '123456',
                name:'ceshilouceng',
                isLogin:false
            }
        },
        methods:{
            ...mapActions(['submitForm']),
            login(){
                this.submitForm({
                    url: "login/signin", data: {username:this.name,password:this.password}, callback: (data) => {
                        console.log("login",data);
                        if (data.error == 0) {
                            this.$Message.success('登录成功');
                            this.$router.push({ path:'/rounds'});
                        }else{
                            this.isLogin=true;
                        }
                    }
                })
            }
        }
    }
</script>
<style lang="less" scoped>
    .prompt{
        width:80%;
        margin:0 auto 0.5rem;
        padding:8px;
    }
    .mainBox{
        font-family: "微软雅黑";
        background: #323232;
        color:white;
        height:100vh ;
        width:100%;
        position: absolute;
        top:0;
        z-index: 999;
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
