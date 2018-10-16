<template>
    <transition name="move">
        <div v-show="showFlag" ref="food" class="food-content">
            <div class="food">
                <div class="food-img">
                    <img :src="good.image" alt="">
                    <div class="back">
                        <i class="el-icon-arrow-left" @click="hide"></i>
                    </div>
                </div>
                <div class="content">
                    <h1 class="title">{{good.name}}</h1>
                    <p class="extra">
                        <span class="sellcount">月售{{good.sellCount}}份</span>
                        <span class="rating">好评率{{good.rating}}%</span>
                    </p>
                    <p class="price">
                        <span class="now">￥{{good.price}}</span>
                        <span class="old" v-show="good.oldPrice>0">￥{{good.oldPrice}}</span>
                    </p>
                    <div class="cartcontrol-wrapper">
                        <cartcontrol @add="addFood" :food="good"></cartcontrol>
                    </div>
                    <transition name="buy">
                        <div v-show="good.count===0||!good.count" class="buy" @click="addFirst">加入购物车</div>
                    </transition>
                </div>
                <split v-show="good.info"></split>
                <div class="info" v-show="good.info">
                    <p class="title">商品信息</p>
                    <p class="text">{{good.info}}</p>
                </div>
                <split></split>
                <div class="rating">
                    <p class="title">商品评价</p>
                    <rate :ratings="good.ratings" @toggle="toggleContent" @select="typeRating" :des="des" :onlyContent="onlyContent" :selectType="selectType"></rate>
                    <div class="rating-wrapper" v-show="good.ratings && good.ratings.length">
                        <!--一条空评论也要显示-->
                        <ul>
                            <li class="rate-content" v-for="rating in good.ratings" v-show="needShow(rating.rateType,rating.text)">
                                <!--v-for所有评价，相应等级、有无内容的才v-show-->
                                <p class="time">{{rating.rateTime|formatDate}}</p>
                                <p class="username">{{rating.username}}<img class="avatar" :src="rating.avatar"></img></p>
                                <p class="rate-text"><i :class="iconClass(rating.rateType)"></i>{{rating.text}}</p>
                            </li>
                        </ul>
                    </div>
                </div>
            </div>
        </div>
    </transition>
</template>
<script>
import cartcontrol from '../cartcontrol/cartcontrol.vue'
import BScroll from 'better-scroll'
import Vue from 'vue'
import split from '../split/split.vue'
import rate from '../rate/rate.vue'
import { formatDate } from '../../common/date.js'
export default {
  props: {
    good: Object
  },
  data() {
    return {
      showFlag: false,
      des: {
        all: '全部',
        good: '推荐',
        bad: '吐槽'
      },
      selectType: 2,
      onlyContent: true
    }
  },
  methods: {
    show() {
      this.showFlag = true
      //切换商品时评价类别、有内容评价选项恢复默认
      this.selectType = 2
      this.onlyContent = true
      this.$nextTick(() => {
        if (!this.scroll) {
          this.scroll = new BScroll(this.$refs.food, {
            click: true
          })
        } else {
          this.scroll.refresh()
        }
      })
    },
    hide() {
      this.showFlag = false
    },
    addFood(target) {
      this.$emit('add', event.target) //没有shopcart组件,传到good.vue,cartcontrol组件里的add传到shopcart组件（父组件才行）
    },
    addFirst(event) {
      if (!event._constructed) {
        return
      }
      this.$emit('add', event.target)
      Vue.set(this.good, 'count', 1)
    },
    typeRating(type) {
      this.selectType = type
      //DOM 结构发生变化的时候务必要调用确保滚动的效果正常
      this.$nextTick(() => {
        this.scroll.refresh()
      })
    },
    toggleContent() {
      this.onlyContent = !this.onlyContent
      //DOM 结构发生变化的时候务必要调用确保滚动的效果正常
      this.$nextTick(() => {
        this.scroll.refresh()
      })
    },
    needShow(type, text) {
      if (this.onlyContent && !text) return false
      //type只有0和1,selectType=2全部显示
      if (this.selectType === 2) return true
      else return type === this.selectType
    },
    iconClass(type) {
      if (type === 0) {
        return 'icon-good'
      } else return 'icon-bad'
    }
  },
  components: {
    cartcontrol: cartcontrol,
    split: split,
    rate: rate
  },
  //过滤器不修改源数据，只重新渲染
  filters: {
    formatDate(time) {
      let date = new Date(time)
      return formatDate(date, 'yyyy-MM-dd hh:mm')
    }
  }
}
</script>
<style lang="stylus">
.food-content
    width 100%;
    position fixed; // 父组件good.vue上面有header.vue
    top 0;
    left 0;
    bottom 46px; // 占满屏
    z-index 50; // 小于shopcart遮罩层
    background #fff;
    transform translate3d(0, 0, 0);
    &.move-enter-active, &.move-leave-active
        transition all 0.2s linear;
    &.move-enter, &.move-leave-active
        transform translate3d(100%, 0, 0);
    .food-img
        width 100%;
        position relative;
        &:after
            padding-top 100%;
            content '';
            display block;
        img
            width 100%;
            position absolute;
            top 0;
            height 100%; // 非正方形图片
        .back
            position absolute;
            top 12px;
            left 12px;
            color #fff;
            font-size 20px;
            i
                font-weight 700;
    .content
        position relative;
        margin 18px;
        font-size 0;
        .title
            font-size 14px;
            line-height 14px;
            color #07111b;
            margin-bottom 8px;
            font-weight 700;
        .extra
            margin-bottom 18px;
            font-size 10px;
            color #93999f;
            .sellcount
                padding-right 12px;
        .price
            line-height 24px;
            .now, .old
                vertical-align middle;
                display inline-block;
            .now
                color #f01414;
                font-size 14px;
                margin-right 4px;
                list-style 14px;
            .old
                color #93999f;
                font-size 10px;
                line-height 10px;
                text-decoration line-through;
        .cartcontrol-wrapper
            position absolute;
            bottom 1px;
            right 0;
        .buy
            position absolute;
            line-height 24px;
            bottom 1px;
            right 0;
            font-size 10px;
            background #00a0dc;
            color #fff;
            padding 0 12px;
            border-radius 12px;
            opacity 1;
            &.buy-enter-active, &.buy-leave-active
                transition all 0.2s linear;
            &.buy-enter, &.buy-leave-active
                opacity 0;
    .info
        padding 18px;
        .title
            font-size 14px;
            line-height 14px;
            color #07111b;
            margin-bottom 6px;
        .text
            font-size 12px;
            color #4d555d;
            line-height 24px;
            padding 0 8px;
    .rating
        .title
            font-size 14px;
            line-height 14px;
            color #07111b;
            padding 18px 0 0 18px;
        .rating-wrapper
            padding 0 18px;
            .rate-content
                border-bottom 1px solid rgba(7, 17, 27, 0.1);
                padding 16px 0;
                position relative;
                .time, .username
                    font-size 10px;
                    line-height 10px;
                    color #93999f;
                    display inline-block;
                .time
                    margin-bottom 6px;
                .username
                    position absolute;
                    right 0;
                    top 16px;
                    .avatar
                        display inline-block;
                        width 12px;
                        height 12px;
                        border-radius 50%;
                        margin-left 6px;
                .rate-text
                    font-size 12px;
                    line-height 16px;
                    color #07111b;
                    i
                        font-size 12px;
                        margin-right 4px;
                        &.icon-good
                            color #00a0dc;
                        &.icon-bad
                            color #2b333b;
</style>
