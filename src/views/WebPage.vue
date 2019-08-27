<template>
    <div class="mainBox">
        <div class="viewTop">
            <img src="" alt="">
        </div>
        <div class="main">
            <div class="title">前台系统</div>
            <div class="formBox">
                <div>
                    <label>账号:</label>
                    <Input v-model="name" />
                </div>
                <div>
                    <label>密码:</label>
                    <Input v-model="password" />
                </div>
                <div>
                    <Button>Default</Button>
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

    }
</style>
