<template>
    <div class="tab-bars">
        <el-row>
            <el-col :span="8">
                <div class="grid-content bg-purple-dark">123</div>
            </el-col>
            <el-col :span="8">
                <div class="grid-content bg-purple-dark">123</div>
            </el-col>
            <el-col :span="8">
                <div class="grid-content bg-purple-dark">123</div>
            </el-col>
        </el-row>
    </div>

</template>

<script>
export default {
    name:"tabbars",
    data(){
        return{

        }
    },
}
</script>

<style scoped>
.tab-bars{
    position:fixed;
    bottom:0;
    left:0;
    width:100%;
    height:49px;
    text-align: center;
}
</style>
