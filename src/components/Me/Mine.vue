<template>
    <div class="me">
        <div class="head">

        </div>
        <div class="card">
            <ul>
                <li>
                    <el-row>
                        <el-col></el-col>
                    </el-row>
                </li>
            </ul>
        </div>

    </div>
</template>

<script>

    export default {
        name: 'Mine',
        components: {
        }
    }
</script>
<style lang="less" scoped>
    .me{
        position: relative;
    }
    .head{
        width:100%;
        height:183px;
        background:linear-gradient(45deg,rgba(0,0,0,0.89) 0%,rgba(85,85,85,1) 100%);
    }
    .card{
        width:90%;
        height:175px;
        box-sizing:border-box;
        padding:20px;
        position: absolute;
        top:165px;
        left:5%;
        background:rgba(255,255,255,1);
        box-shadow:0px 4px 8px 0px rgba(0,0,0,0.06);
        border-radius:6px;
    }
</style>
