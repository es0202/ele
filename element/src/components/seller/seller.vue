<template>
    <div class="seller" ref="seller">
        <div class="seller-wrapper">
            <div class="overview">
                <div class="overview-top">
                    <div class="title">{{seller.name}}</div>
                    <div class="desc">
                        <star class="star-wrapper" :score="seller.score" :starSize="15"></star>
                        <span class="rating-count">({{seller.ratingCount}})</span>
                        <span class="sell-count">月售{{seller.sellCount}}单</span>
                    </div>
                    <div class="favorite" @click="toggleFavorite">
                        <i class="icon-favoritesfilling" :class="{'active':favorite}"></i>
                        <div class="text">{{favoriteText}}</div>
                    </div>
                </div>
                <div class="overview-end">
                    <span class="min-price border-right">
                        <div class="text">起送价</div>
                        <div class="price">
                            <span class="content">{{seller.minPrice}}</span>元
                        </div>
                    </span>
                    <span class="delivery-price border-right">
                        <div class="text">商家配送</div>
                        <div class="price">
                            <span class="content">{{seller.deliveryPrice}}</span>元
                        </div>
                    </span>
                    <span class="delivery-time">
                        <div class="text">平均配送时间</div>
                        <div class="price">
                            <span class="content">{{seller.deliveryTime}}</span>分钟
                        </div>
                    </span>
                </div>
            </div>
            <split></split>
            <div class="bulletin">
                <div class="bulletin-wrapper">
                    <p class="title">公告与活动</p>
                    <p class="content">{{seller.bulletin}}</p>
                </div>
                <ul class="support-list">
                    <li class="support-item" v-for="(item,index) in seller.supports">
                        <span class="item-icon" :class="classMap[seller.supports[index].type]"></span>
                        <span class="item-text">{{item.description}}</span>
                    </li>
                </ul>
            </div>
            <split></split>
            <div class="pics">
                <h1 class="title">商家实景</h1>
                <div class="pics-wrapper" ref="picwrapper">
                    <ul class="pic-list" ref="piclist">
                        <li class="pic-item" v-for="pic in seller.pics">
                            <img :src="pic" alt="" width="120px" height="90px">
                        </li>
                    </ul>
                </div>
            </div>
            <split></split>
            <div class="infos">
                <div class="title">商家信息</div>
                <ul>
                    <li class="info-list" v-for="info in seller.infos">{{info}}</li>
                </ul>
            </div>
        </div>
    </div>
</template>
<script>
import split from '../split/split.vue'
import star from '../star/star.vue'
import BScroll from 'better-scroll'
export default {
  props: {
    seller: Object
  },
  components: {
    split: split,
    star: star
  },
  created() {
    this.classMap = ['decrease', 'discount', 'special', 'invoice', 'guarantee']
    this.$nextTick(() => {
      this._initPics()
      this._initScroll()
    })
  },
  watch: {
    seller() {
      this.$nextTick(() => {
        this._initScroll()
        this._initPics()
      })
    }
  },
  data() {
    return {
      favorite: false
    }
  },
  computed: {
    favoriteText() {
      return this.favorite ? '已收藏' : '收藏'
    }
  },
  methods: {
    toggleFavorite() {
      if (!event._constructed) {
        return
      }
      this.favorite = !this.favorite
    },
    _initScroll() {
      if (!this.scroll) {
        this.scroll = new BScroll(this.$refs.seller, {
          click: true
        })
      } else {
        this.scroll.refresh()
      }
    },
    _initPics() {
      if (this.seller.pics) {
        let picWidth = 120
        let margin = 6
        let width =
          (this.seller.pics.length - 1) * (picWidth + margin) + picWidth
        this.$refs.piclist.style.width = width + 'px'
        this.$nextTick(() => {
          if (!this.picScroll) {
            this.picScroll = new BScroll(this.$refs.picwrapper, {
              scrollX: true,
              eventPassthrough: 'vertical'
            })
          } else {
            this.picScroll.refresh()
          }
        })
      }
    }
  }
}
</script>
<style lang="stylus">
.seller
    width 100%;
    position absolute;
    top 174px;
    bottom 0;
    overflow hidden;
    color #07111b;
    .overview
        padding 18px;
        .overview-top
            border-bottom 1px solid rgba(7, 17, 27, 0.1);
            position relative;
            .title
                font-size 14px;
                line-height 14px;
                margin-bottom 8px;
            .desc
                height 18px;
                margin-bottom 18px;
                font-size 0;
                .star-wrapper
                    display inline-block;
                    line-height 18px;
                    height 18px;
                    vertical-align top;
                span
                    font-size 10px;
                    line-height 18px;
                    color #4d555d;
                    vertical-align top;
                .rating-count
                    margin-left 8px;
                .sell-count
                    margin-left 12px;
            .favorite
                position absolute;
                top 0;
                right 0;
                text-align center;
                width 50px;
                i
                    line-height 24px;
                    margin-bottom 4px;
                    display block;
                    height 24px;
                    font-size 20px;
                    color #d4d6d9;
                    &.active
                        color #f01414;
                .text
                    font-size 10px;
                    line-height 10px;
                    color #4d555d;
        .overview-end
            padding-top 18px;
            display flex;
            .border-right
                border-right 1px solid rgba(7, 17, 27, 0.1);
            .min-price, .delivery-price, .delivery-time
                text-align center;
                flex 1;
                .text
                    font-size 10px;
                    line-height 10px;
                    color #93999f;
                    margin-bottom 4px;
                .price
                    font-size 10px;
                    line-height 28px;
                    height 28px;
                    vertical-align bottom;
                    .content
                        font-size 24px;
                        line-height 28px;
                        font-weight 400;
                        height 28px;
                        display inline-block;
    .bulletin
        padding 18px;
        padding-bottom 0;
        .bulletin-wrapper
            border-bottom 1px solid rgba(7, 17, 27, 0.1);
            .title
                font-size 14px;
                line-height 14px;
            .content
                padding 8px 12px 16px 12px;
                font-size 12px;
                line-height 24px;
                color #f01414;
        .support-list
            width 100%;
            margin 0 auto;
            .support-item
                font-size 0;
                padding 16px 12px;
                border-bottom 1px solid rgba(7, 17, 27, 0.1);
                &:last-child
                    border-bottom none;
                .item-icon
                    display inline-block;
                    width 16px;
                    height 16px;
                    vertical-align top;
                    background-size 16px 16px;
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
                    font-size 14px;
                    line-height 16px;
                    height 16px;
                    vertical-align top;
    .pics
        padding 18px;
        .title
            font-size 14px;
            line-height 14px;
            margin-bottom 12px;
        .pics-wrapper
            width 100%;
            overflow hidden;
            white-space nowrap;
            .pic-list
                .pic-item
                    display inline-block;
                    margin-right 6px;
                    width 120px;
                    height 90px;
                    &:last-child
                        margin-right 0;
    .infos
        padding 0 18px;
        font-size 14px;
        .title
            padding 18px 0 12px 0;
        .info-list
            line-height 16px;
            font-size 12px;
            padding 18px 14px;
            border-top 1px solid rgba(7, 17, 27, 0.1);
</style>
