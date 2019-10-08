<template>
    <div class="mainBox">
        <div class="viewTop">
            <img src="" alt="">
        </div>
        <div class="main">
            <div class="title">领取房卡</div>
            <div class="formBox">
                <div class="flexBox">
                    <label class="account">手机号:</label>
                    <Input class="inp" v-model="mobile"/>
                </div>
                <div class="flexBox">
                    <label class="account">验证码:</label>
                    <Input class="code" v-model="code"/>
                    <div class="codeImg" @click="getCode">验证码</div>
                </div>
                <Alert type="error" class="prompt" v-if="isLogin">账号或密码错误</Alert>
                <div>
                    <Button class="sumbit" @click="login">确定</Button>
                </div>

            </div>

        </div>

    </div>

</template>
<script>
    import {mapActions} from 'vuex'

    export default {
        data() {
            return {
                code: '',
                mobile:"",
                isLogin: false
            }
        },
        methods: {
            ...mapActions(['submitForm']),
            login() {
                if(this.code&&this.mobile){
                    this.$Message.success('请输入手机号或者验证码');
                    return;
                }
                this.submitForm({
                    url: "login/reserve", data: {code: this.code, mobile: this.mobile}, callback: (data) => {
                        console.log("login/reserve", data);
                        if (data.error == 0) {
                            this.$Message.success('登录成功');
                            this.$router.push({ path:'/chargepage'});
                        } else {
                            this.$Message.success('验证码不正确');
                        }
                    }
                })
            },
            getCode(){
                this.submitForm({
                    url: "login/sendsms", data: {mobile: this.mobile}, callback: (data) => {
                        console.log("login/sendsms", data);
                        if (data.error == 0) {
                            this.$Message.success('发送成功');
                        } else {

                        }
                    }
                })
            },
        }
    }
</script>
<style lang="less" scoped>
    .prompt {
        width: 80%;
        margin: 0 auto 0.5rem;
        padding: 8px;
    }

    .mainBox {
        font-family: "微软雅黑";
        background: #323232;
        color: white;
        height: 100vh;
        width: 100%;
        position: absolute;
        top: 0;
        z-index: 999;
    }

    .viewTop {
        width: 100%;
        background: #F0D19A;
        height: 15rem;
    }

    .title {
        padding: 1rem 0.9rem;
        background: #F0D19A;
        width: 10rem;
        margin: 1rem auto;
        border-radius: 0.3rem;
        font-size: 1.2rem;
    }

    .formBox {
        width: 80%;
        background: white;
        margin: 0 auto;
        border-radius: 1rem;
    }

    .flexBox {
        display: flex;
        align-items: center;
        padding: 1rem 0;
        color: black;
    }

    .account {
        width: 4rem;
        font-size: 0.8rem;
    }

    .inp {
        width: 70%;
    }

    .code {
        /*width: 50%;*/
        flex:3;
    }
    .codeImg{
        flex:2;
        height:2rem;
        line-height: 2rem;
        background: #eeeeee;
        margin:0 0.3rem;
        border-radius: 1rem;
    }
    .sumbit {
        width: 50%;
        margin: 0 auto 1rem;
        background: #F0D19A;
        box-shadow: none;
        color: white;
        border: none;
    }

    .ivu-btn:focus {
        box-shadow: none;
        color: white;
        border: none;
    }
</style>
