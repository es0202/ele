<template>
  <div>
    <div class="shopcart">
      <div class="content" @click="contentToggle">
        <div class="content-left">
          <div class="logo-wrapper">
            <div class="logo" :class="{'highlight':totalCount>0}">
              <i class="el-icon-goods" :class="{'highlight':totalCount>0}"></i>
            </div>
            <div class="totalCount" v-show="totalCount>0">{{totalCount}}</div>
          </div>
          <div class="price" :class="{'highlight':totalPrice>0}">￥{{totalPrice}}</div>
          <div class="delivery">另需配送费￥{{deliveryPrice}}元</div>
        </div>
        <div class="content-right" @click="pay">
          <div class="pay" :class="totalPrice >= minPrice ? 'enough':'noenough'">{{toPay}}</div>
        </div>
      </div>
      <!--抛物线小球-->
      <div class="ball-container">
        <div v-for="ball in balls">
          <transition name="drop" @before-enter="beforeDrop" @enter="dropping" @after-enter="afterDrop">
            <div class="ball" v-show="ball.show">
              <div class="inner inner-hook"></div>
            </div>
          </transition>
        </div>
      </div>
      <transition name="cartContent">
        <div class="cart-list" v-show="contentShow">
          <div class="list-header">
            <h1 class="title">购物车</h1>
            <span class="clear-cart" @click="empty">清空</span>
          </div>
          <div class="list-content" ref="listContent">
            <ul>
              <li class="food" v-for="food in foodsInCart">
                <span class="name">{{food.name}}</span>
                <div class="price">￥{{food.price*food.count}}</div>
                <div class="cartcontrol-wrapper">
                  <cartcontrol @add="addFood" :food="food"></cartcontrol>
                </div>
              </li>
            </ul>
          </div>
        </div>
      </transition>
    </div>
    <transition name="fade">
      <!--点开购物车细节背景虚化-->
      <div class="list-fade" v-show="contentShow" @click="contentToggle"></div>
    </transition>
  </div>
</template>
<script>
import BScroll from 'better-scroll'
import cartcontrol from '../cartcontrol/cartcontrol.vue'
export default {
  props: {
    foodsInCart: {
      type: Array,
      default() {
        return [
          {
            price: 10,
            count: 1
          }
        ]
      }
    },
    deliveryPrice: {
      type: Number,
      default: 0
    },
    minPrice: {
      type: Number,
      default: 0
    }
  },
  data() {
    return {
      //一个页面上最多出现五个球
      balls: [
        {
          show: false
        },
        {
          show: false
        },
        {
          show: false
        },
        {
          show: false
        },
        {
          show: false
        }
      ],
      dropBalls: [],
      fold: true
    }
  },
  computed: {
    totalCount() {
      let count = 0
      this.foodsInCart.forEach(food => {
        count += food.count
      })
      return count
    },
    totalPrice() {
      let total = 0
      this.foodsInCart.forEach(food => {
        total += food.price * food.count
      })
      return total
    },
    contentShow() {
      if (!this.totalCount) {
        this.fold = true
        return false
      }
      if (!this.fold) {
        this.$nextTick(() => {
          if (!this.scroll) {
            this.scroll = new BScroll(this.$refs.listContent, {
              click: true //重新绑定上点击事件
            })
          } else {
            this.scroll.refresh()
          }
        })
      }
      return !this.fold
    },
    toPay() {
      if (this.totalPrice == 0) return '￥' + this.minPrice + '元起送'
      else if (this.totalPrice < this.minPrice)
        return '还差' + (this.minPrice - this.totalPrice) + '元起送'
      else return '去结算'
    }
  },
  methods: {
    drop(target) {
      for (let i = 0; i < this.balls.length; i++) {
        let ball = this.balls[i]
        if (!ball.show) {
          ball.show = true
          ball.el = target
          this.dropBalls.push(ball)
          return
        }
      }
    },
    beforeDrop(el) {
      //5个球
      let count = this.balls.length
      while (count--) {
        let ball = this.balls[count]
        if (ball.show) {
          let rect = ball.el.getBoundingClientRect()
          let x = rect.left - 32
          let y = -(window.innerHeight - rect.top - 22)
          el.style.display = ''
          el.style.webkitTransform = `translate3d(0,${y}px,0)`
          el.style.transform = `translate3d(0,${y}px,0)`
          let inner = el.getElementsByClassName('inner-hook')[0]
          inner.style.webkitTransform = `translate3d(${x}px,0,0)`
          inner.style.transform = `translate3d(${x}px,0,0)`
        }
      }
    },
    dropping(el, done) {
      let rf = el.offsetHeight
      this.$nextTick(() => {
        el.style.webkitTransform = 'translate3d(0,0,0)'
        el.style.transform = 'translate3d(0,0,0)'
        let inner = el.getElementsByClassName('inner-hook')[0]
        inner.style.webkitTransform = 'translate3d(0,0,0)'
        inner.style.transform = 'translate3d(0,0,0)'
        el.addEventListener('transitionend', done)
      })
    },
    afterDrop(el) {
      let ball = this.dropBalls.shift()
      //删除数组第一个push元素
      if (ball) {
        ball.show = false
        el.style.display = 'none'
      }
    },
    addFood(target) {
      this.drop(target)
    },
    contentToggle() {
      if (!this.totalCount) {
        return
      }
      this.fold = !this.fold
    },
    pay() {
      if (this.totalPrice < this.minPrice) {
        return
      }
      window.alert('支付￥' + this.totalPrice + '元')
    },
    empty() {
      // this.foodsInCart=[]//子组件不能修改父组件的数据，即props
      this.foodsInCart.forEach(food => {
        food.count = 0
      })
    }
  },
  components: {
    cartcontrol: cartcontrol
  }
}
</script>

<style lang="stylus">
.shopcart
  position fixed;
  bottom 0;
  left 0;
  width 100%;
  height 46px;
  z-index 200; // 大于遮罩层的z-index
  .content
    display flex;
    background #141d27;
    font-size 0;
    color rgba(255, 255, 255, 0.4);
    .content-left
      flex 1;
      .logo-wrapper
        width 54px;
        height 54px;
        position relative;
        top -10px; // 相对于其正常位置定位
        margin 0 12px;
        border-radius 50%;
        background #141d27;
        box-sizing border-box; // logo的width是本box的width减去padding的值，而不是本box的width
        padding 6px;
        .logo
          width 100%;
          height 100%;
          border-radius 50%;
          text-align center;
          background #2b343c;
          &.highlight
            background rgb(0, 160, 220);
          .el-icon-goods
            font-size 24px;
            line-height 42px;
            &.highlight
              color #fff;
        .totalCount
          position absolute;
          top 0;
          right 0;
          width 24px;
          height 16px;
          line-height 16px;
          background #f01414;
          border-radius 16px;
          color #ffffff;
          font-size 9px;
          font-weight 700;
          text-align center;
          box-shadow 0 4px 8px 0 rgba(0, 0, 0, 0.4);
      .price
        font-size 16px;
        line-height 24px;
        margin-top 12px;
        padding-right 12px;
        box-sizing border-box;
        border-right 1px solid rgba(255, 255, 255, 0.1);
        font-weight 700;
        &.highlight
          color #fff;
      .delivery
        font-size 10px;
        line-height 24px;
        margin-top 12px;
        padding-left 12px;
      .logo-wrapper, .price, .delivery
        display inline-block;
        vertical-align top;
    .content-right
      flex 0 0 105px;
      width 105px;
      .pay
        background #2b333b;
        line-height 46px;
        font-size 10px;
        text-align center;
        font-weight 700;
        &.enough
          background #00b43c;
          color #fff;
  .ball-container
    .ball
      position fixed;
      left 32px;
      bottom 22px;
      z-index 200;
      transition all 1.2s cubic-bezier(0.49, -0.29, 0.75, 0.41);
    .inner
      width 16px;
      height 16px;
      border-radius 50%;
      background rgb(0, 160, 220);
      transition all 1.2s linear;
  .cart-list
    width 100%;
    font-size 14px;
    color #07111b;
    background #fff; // ??没有
    position absolute;
    left 0;
    top 0;
    transform translate3d(0, -100%, 0);
    z-index -1; // 不遮住购物车图标的凸起
    .list-header
      line-height 40px;
      height 40px;
      padding 0 18px;
      background #f3f5f7;
      border-bottom 1px solid rgba(7, 17, 27, 0.1);
      .title
        float left;
      .clear-cart
        float right;
        color #00a0dc;
    .list-content
      padding 0 18px;
      max-height 218px;
      overflow hidden;
      .food
        padding 12px 0;
        line-height 24px; // 加号的高度
        position relative;
        box-sizing border-box;
        border-bottom 1px solid rgba(7, 17, 27, 0.1);
        .name
          line-height 14px;
        .price
          position absolute;
          top 12px;
          right 90px;
          color #f01414;
        .cartcontrol-wrapper
          position absolute;
          top 12px;
          right 0;
.list-fade
  position fixed;
  top 0;
  left 0;
  width 100%;
  height 100%;
  z-index 100;
  opacity 1;
  background rgba(7, 17, 27, 0.6);
  // filter blur(10px);
  &.fade-enter-active, &.fade-leave-active
    transition all 0.5s;
  &.fade-enter, &.fade-leave-active
    opacity 0;
    background rgba(7, 17, 27, 0);
</style>
