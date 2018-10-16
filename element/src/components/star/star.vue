<template>
  <div class="star" :class="size">
    <span v-for="(item,index) in itemClasses" :class="item" class="star-item" :key="index"></span>
  </div>
</template>

<script>
const LENGTH = 5
const ON = 'on'
const HALF = 'half'
const OFF = 'off'
export default {
  props: {
    score: Number,
    starSize: Number
  },
  computed: {
    itemClasses() {
      let result = []
      //不是有小数点就有半星，小数大于0.5才有半星
      let score = Math.floor(this.score * 2) / 2
      let oncount = Math.floor(score)
      let halfcount = score % 1 !== 0
      for (let i = 0; i < oncount; i++) {
        result.push(ON)
      }
      if (halfcount) {
        result.push(HALF)
      }
      while (result.length < LENGTH) {
        result.push(OFF)
      }
      return result
    },
    size() {
      return 'star-' + this.starSize
    }
  }
}
</script>

<style lang="stylus">
$size = 20px;
.star
  font-size 0;
  text-align center;
  // star-item上已经绑定了
  &.star-20
    .star-item
      background-size 20px 20px;
      margin-right 20px;
      width 20px;
      height 20px;
  &.star-15
    .star-item
      background-size 15px 15px;
      margin-right 6px;
      width 15px;
      height 15px;
  &.star-10
    .star-item
      background-size 10px 10px;
      margin-right 3px;
      width 10px;
      height 10px;
  .star-item
    background-repeat no-repeat;
    display inline-block;
    &:last-child
      margin-right 0;
    &.on
      background-image url('~static/img/on.png');
    &.off
      background-image url('~static/img/off.png');
    &.half
      background-image url('~static/img/half.png');
</style>
