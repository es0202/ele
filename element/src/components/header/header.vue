<template>
    <div class="header">
        <div class="header-wrapper">
            <div class="header-avatar">
                <img src="static/img/avatar.jpg" alt="头像" width="64" height="64">
            </div>
            <div class="content-wrapper">
                <div class="content-title">
                    <span class="content-brand"></span>
                    <span class="content-name">{{seller.name}}</span>
                </div>
                <div class="content-delivery">{{seller.description}}/{{seller.deliveryTime}}分钟送达</div>
                <div class="content-support">
                    <!--支持多种优惠-->
                    <span class="support-icon"></span>
                    <span class="support-text">{{seller.supports[0].description}}</span>
                </div>
            </div>
            <div class="header-count" @click="showDetail">
                <span class="support-count">5个</span>
            </div>
        </div>
        <div class="bulletin-wrapper" @click="showDetail">
            <span class="bulletin-title"></span>
            <span class="bulletin-content">{{seller.bulletin}}</span>
            <i class="el-icon-arrow-right"></i>
        </div>
        <div class="header-background">
            <img src="static/img/avatar.jpg" alt="" width="100%" height="100%">
        </div>
        <!-- <div class="header-detail"></div> -->
        <transition name="fade">
            <div v-show="detailShow" class="header-detail">
                <div class="detail-wrapper clearfix">
                    <div class="detail-main">
                        <p class="name">{{seller.name}}</p>
                        <div class="star">
                            <star :score="seller.score" :starSize="20"></star>
                        </div>
                        <div class="support-inf">
                            <div class="line"></div>
                            <div class="text">优惠信息</div>
                            <div class="line"></div>
                        </div>
                        <ul class="support-list">
                            <li class="support-item" v-for="(item,index) in seller.supports">
                                <span class="item-icon" :class="classMap[seller.supports[index].type]"></span>
                                <span class="item-text">{{item.description}}</span>
                            </li>
                        </ul>
                        <div class="support-inf">
                            <div class="line"></div>
                            <div class="text">商家公告</div>
                            <div class="line"></div>
                        </div>
                        <div class="bulletin-full">
                            <p class="text">{{seller.bulletin}}</p>
                        </div>
                    </div>
                </div>
                <div class="detail-close" @click="hideDetail">
                    <i class="el-icon-close"></i>
                </div>
            </div>
        </transition>
    </div>
</template>

<script>
import star from '../star/star.vue'
export default {
  props: {
    seller: Object
  },
  data() {
    return {
      detailShow: false
    }
  },
  created() {
    this.classMap = ['decrease', 'discount', 'special', 'invoice', 'guarantee']
  },
  methods: {
    showDetail() {
      this.detailShow = true
    },
    hideDetail() {
      this.detailShow = false
    }
  },
  components: {
    star: star
  }
}
</script>

<style lang="stylus" rel="stylesheet/stylus">
$bigsize = 16px;
$smallsize = 12px;
$little = 10px;
.header
    position relative; // background
    overflow hidden;
    color #fff;
    background rgba(7, 17, 27, 0.5);
    font-size 0;
    .header-wrapper
        padding 24px 12px 18px 24px;
        position relative;
        .header-avatar, .content-wrapper
            display inline-block;
            vertical-align top;
            img
                display block;
        .content-wrapper
            margin-left 10px;
            font-size 0;
            // 消除两个span间间隔
            .content-title, .content-delivery
                margin 2px 0 6px 0;
                .content-brand, .content-name
                    display inline-block;
                    // span设置了宽高
                .content-brand
                    background url('~static/img/brand.png') no-repeat;
                    background-size 30px 18px;
                    width 30px;
                    height 18px;
                .content-name
                    margin-left 6px;
                    font-size $bigsize;
                    font-weight bold;
                    height $bigsize + 2;
                    line-height $bigsize + 2;
                    vertical-align top;
        .content-delivery
            font-size $smallsize;
            height $smallsize + 2;
            line-height $smallsize + 2;
        .content-support
            padding-top 4px;
            .support-icon, .support-text
                vertical-align top;
                display inline-block;
            .support-icon
                width 12px;
                height 12px;
                vertical-align top;
                background url('~static/img/decrease.png') no-repeat;
                background-size 12px 12px;
            .support-text
                font-size $smallsize;
                line-height $smallsize;
                height $smallsize;
                padding-left 6px;
    .header-count
        position absolute;
        bottom 14px;
        right 12px;
        padding 0 8px;
        height 2 * $smallsize;
        line-height 2 * $smallsize;
        background rgba(0, 0, 0, 0.2);
        border-radius 12px;
        .support-count
            font-size $smallsize;
            display inline-block;
            vertical-align top;
            &::after
                content '>';
                font-size $smallsize;
                padding-left 4px;
                vertical-align top;
    .header-detail
        z-index 300;
        position fixed;
        top 0;
        left 0;
        width 100%;
        background rgba(7, 17, 27, 0.8);
        height 100%;
        overflow auto;
        &.fade-enter-active, &.fade-leave-active
            transition all 0.5s;
        &.fade-enter, &.fade-leave-active
            opacity 0;
            background rgba(7, 17, 27, 0);
        .detail-wrapper
            width 100%;
            min-height 100%; // 和clearfix配合
            .detail-main
                padding-bottom 64px;
                margin-top 64px;
                font-size $bigsize;
                .name
                    font-weight bold;
                    text-align center;
                    height $bigsize + 2;
                    line-height $bigsize + 2;
                    margin-bottom 20px;
                .support-inf
                    margin 24px auto;
                    width 80%;
                    height $bigsize + 2;
                    line-height $bigsize + 2;
                    text-align center;
                    display flex; // flex 1;
                    .text
                        padding 0 12px;
                    .line
                        flex 1;
                        top -8px;
                        position relative;
                        border-bottom 1px solid rgba(255, 255, 255, 0.2);
                .support-list
                    width 80%;
                    margin 0 auto;
                    .support-item
                        font-size 0;
                        margin-bottom 12px;
                        padding 0 12px;
                        &:last-child
                            margin-bottom 0;
                        .item-icon
                            display inline-block;
                            width $bigsize;
                            height $bigsize;
                            vertical-align top;
                            background-size $bigsize $bigsize;
                            background-repeat no-repeat;
                            margin-right 6px;
                            &.decrease
                                background-image url('~static/img/decrease.png');
                            &.discount
                                background-image url('~static/img/discount.png');
                            &.guarantee
                                background-image url('~static/img/guarantee.png');
                            &.invoice
                                background-image url('~static/img/invoice.png');
                            &.special
                                background-image url('~static/img/special.png');
                        .item-text
                            font-size $smallsize;
                            line-height $bigsize;
                            height $bigsize;
                            vertical-align top;
                .bulletin-full
                    width 80%;
                    margin 0 auto;
                    .text
                        padding 0 12px;
                        font-size $smallsize;
                        line-height $smallsize * 2;
        .detail-close
            text-align center;
            font-size 26px;
            margin-top -64px; // min-height 100%占据整个页面，margin-top负数在detail-wrapper里，detail-main要padding(margin不行，页面高度会撑开))间隔开内容
            width 100%;
            .el-icon-close
                font-weight bold;
    .bulletin-wrapper
        height 28px;
        line-height 28px;
        white-space nowrap;
        overflow hidden;
        text-overflow ellipsis;
        background rgba(7, 17, 27, 0.2);
        padding 0 22px 0 12px;
        position relative; // el-icon-arrow-right
        .bulletin-title
            background url('~static/img/bulletin.png') no-repeat;
            display inline-block;
            background-size 22px 12px;
            width 22px;
            height 12px;
            margin-top 7px;
        .bulletin-content
            font-size $little;
            margin-left 4px;
            line-height 28px;
        .bulletin-title, .bulletin-content
            vertical-align top;
        .el-icon-arrow-right
            font-size $little;
            position absolute;
            right 12px;
            top 9px;
    .header-background
        position absolute;
        top 0;
        left 0;
        z-index -1;
        filter blur(10px);
        width 100%;
        height 100%;
</style>