<template>
    <!-- <el-container> -->
    <el-header class="head-content">
        <div class="head-wrap">
            <img class="avatar" src="/static/img/avatar.jpg" alt="">
            <div class="content-wrap">
                <p class="title">
                    <span class="brand"></span>
                    <span>商铺名称</span>
                </p>
                <p class="ele">蜂鸟专送</p>
                <p class="ele">
                    <span class="support"></span>
                    <span>在线支付满39-20</span>
                </p>
                <span class="support-count">5个</span>
            </div>
        </div>
        <div class="bulletin-wrap">
            <div class="bulletin-content">
                <span class="bulletin-img"></span>
                <span class="bulletin-text">粥品香坊其烹饪粥料的秘方源于中国千年古法，在融和现代制作工艺，由世界烹饪大师屈浩先生领衔研发。坚守纯天然、0添加的良心品质深得消费者青睐，发展至今成为粥类的引领品牌。是2008年奥运会和2013年园博会指定餐饮服务商。</span>
                <i class="el-icon-arrow-right"></i>
            </div>
        </div>
        <img class="background" src="/static/img/avatar.jpg"></img>
        <div class="detail"></div>
    </el-header>
    <!-- </el-container> -->
</template>

<script>
export default {}
</script>

<style lang="stylus">
$big-size = 16px;
$small-size = 12px;
.head-content
    position relative;
    overflow hidden;
    width 100%;
    height 144px !important; // 消除el-header默认
    background rgba(7, 17, 27, 0.5);
    padding 0; // 消除el-header默认
    .ele
        font-size $small-size;
        height $small-size + 2;
        line-height $small-size + 2;
    p, span
        vertical-align top;
    .head-wrap
        padding 24px 12px 18px 24px;
        .avatar
            width 64px;
            height 64px;
            overflow hidden;
            display inline-block;
        .content-wrap
            display inline-block;
            margin-left 16px;
            color #fff;
            position relative;
            >p
                margin-bottom 8px;
            .title
                font-size $big-size;
                font-weight bold;
                line-height $big-size + 2;
                height $big-size + 2;
                .brand
                    background url('/static/img/brand.png');
                    background-size ((($big-size * 1.8))), ((($big-size + 2)));
                    width $big-size * 1.8;
                    height $big-size + 2;
                    margin 0 2px 0 2px;
                    display inline-block;
            .support-count
                position absolute;
                bottom 0;
                right 0;
            .ele
                .support
                    width $small-size;
                    height $small-size;
                    background url('/static/img/decrease.png');
                    background-size $small-size $small-size;
                    margin 2px 2px 1px 0;
                    display inline-block;
    .bulletin-wrap
        padding 0 22px 0 12px;
        height 28px;
        background rgba(7, 17, 27, 0.2);
        position relative;
        span
            vertical-align top;
        .bulletin-content
            height 28px;
            line-height 28px;
            text-overflow ellipsis;
            overflow hidden;
            white-space nowrap; // 不换行
            color #fff;
            .bulletin-img
                background url('/static/img/bulletin.png');
                background-size ($small-size * 2) $small-size;
                width $small-size * 2;
                height $small-size;
                margin-top 8px;
                display inline-block;
            .bulletin-text
                margin 0 4px;
                font-size 10px;
            .el-icon-arrow-right
                font-size 10px;
                position absolute;
                right 8px;
                top 8px;
    .background
        position absolute; // 以head-content为准，让图片模糊添加头部全局的背景
        top 0;
        left 0;
        width 100%;
        height 100%;
        filter blur(10px); // 灰度
        z-index -2; // 背景
        // background-size
</style>
