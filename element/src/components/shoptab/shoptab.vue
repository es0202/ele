<template>
    <el-row class="shoptab">
        <el-col :span="8">
            <div class="shop-tab tab-border">点餐</div>
        </el-col>
        <el-col :span="8">
            <div class="shop-tab tab-border">评价</div>
        </el-col>
        <el-col :span="8">
            <div class="shop-tab">商家</div>
        </el-col>
    </el-row>
</template>

<script>
export default {
  // created(){
  //     $(window).scroll(function(){
  //     console.log($('.shoptab').scrollTop())
  //     })
  // }
}
</script>


<style lang="stylus">
$size = 16px;
.shoptab
    width 100%;
    height 40px !important;
    background #ffffff;
    z-index 2;
    .shop-tab
        text-align center;
        height 32px;
        line-height 32px;
        margin 4px 0;
        vertical-align middle;
        font-size $size;
        color #666;
        // font-weight bold;//点击加粗
    .shop-tab.tab-border
        border-right 1px solid #b9b9b9;
.shoptab.tab-top
    position fixed;
    top 0;
    left 0;
</style>
