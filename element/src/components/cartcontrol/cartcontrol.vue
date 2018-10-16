<template>
    <div class="cartcontrol">
        <transition name="decrease">
            <div v-show="food.count>0" class="rotate padding-circle">
                <i class="cart-decrease el-icon-remove-outline" @click.stop.prevent="decreaseCart"></i>
            </div>
        </transition>
        <span class="cart-count" v-show="food.count>0">{{food.count}}</span>
        <i class="el-icon-circle-plus padding-circle" @click.stop.prevent="addCart"></i>
    </div>
</template>
<script>
import Vue from 'vue'

export default {
  props: {
    food: {
      type: Object
    }
  },
  methods: {
    addCart(event) {
      if (!event._constructed) {
        return
      }
      if (!this.food.count) {
        Vue.set(this.food, 'count', 1) //this.food来自good.vue，这样修改good.count使good.vue能访问
      } else {
        this.food.count++
      }
      this.$emit('add', event.target) //触发后被good.vue里的@add监听器监听到,触发addFood方法,event.target获取dom
    },
    decreaseCart(event) {
      if (!event._constructed) {
        return
      }
      if (this.food.count) {
        this.food.count--
      }
    }
  }
}
</script>

<style lang="stylus">
$font = 12px;
.cartcontrol
    color #00a0dc;
    font-size 0;
    .padding-circle
        vertical-align middle;
        font-size 2 * $font - 2;
        padding 0 6px;
    .rotate
        transform translate3d(0, 0, 0);
        display inline-block;
        opacity 1;
        .cart-decrease
            transform rotate(0);
            transition all 0.2s linear;
        &.decrease-enter-active, &.decrease-leave-active // 两个&不能漏
            transition all 0.2s linear;
        &.decrease-enter, &.decrease-leave-active
            opacity 0;
            transform translate3d(24px, 0, 0);
            .cart-decrease
                transform rotate(180deg);
    .cart-count
        font-size $font - 2;
        line-height 2 * $font;
        color #93999f;
        vertical-align middle;
        display inline-block;
        width 12px;
        text-align center;
</style>
