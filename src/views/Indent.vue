<template>
    <div class="indentBox">
        <ul class="indentTop">
            <li :class="part==1?'active':''" @click="changeClick(1)">待支付</li>
            <li :class="part==2?'active':''" @click="changeClick(2)">进行中</li>
            <li :class="part==3?'active':''" @click="changeClick(3)">已完成</li>
            <li :class="part==4?'active':''" @click="changeClick(4)">已取消</li>
        </ul>
        <div>
            <UnIndent v-if="part==1" @changePart="changeClick"></UnIndent>
            <Indenting v-if="part==2"></Indenting>
            <Indented v-if="part==3"></Indented>
            <CancelIndent v-if="part==4"></CancelIndent>
        </div>
    </div>
</template>

<script>
    import UnIndent from '@/components/Indent/UnIndent.vue'
    import Indenting from '@/components/Indent/Indenting.vue'
    import Indented from '@/components/Indent/Indented.vue'
    import CancelIndent from '@/components/Indent/CancelIndent.vue'

    export default {
        name: 'Indent',
        components: {
            UnIndent,
            Indenting,
            Indented,
            CancelIndent
        },
        data() {
            return {
                part:1
            };
        },
        methods:{
            changeClick(index){
                this.part=index;
            }
        }
    }
</script>
<style lang="less" scoped>
    .indentBox{
        padding-top:45px;
    }
.indentTop{
    background:white;
    display: flex;
    justify-content: space-between;
    padding:0 25px;
    margin-bottom:13px;
    position: fixed;
    top:0;
    left:0;
    width:100%;
    box-sizing: border-box;
    z-index: 1000;
    li{
        padding:10px 0;
        font-size:14px;
        color:rgba(122,122,122,1);
        line-height:20px;
        box-sizing: border-box;
    }
    .active{
        color:#D5B074;
        font-weight:600;
        border-bottom:2px solid #D5B074;
    }
}
</style>
