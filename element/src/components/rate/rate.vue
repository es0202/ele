<template>
  <div class="rate">
    <div class="rate-type">
      <span class="tag good" :class="{'active':selectType===2}" @click="select(2,$event)">{{des.all}} {{ratings.length}}</span>
      <span class="tag good" :class="{'active':selectType===0}" @click="select(0,$event)">
        <i class="icon-good"></i> {{typecount.goodcount}}</span>
      <span class="tag bad" :class="{'active':selectType===1}" @click="select(1,$event)">
        <i class="icon-bad"></i> {{typecount.badcount}}</span>
    </div>
    <div class="onlycontent">
      <i class="el-icon-circle-check" :class="{'on':onlyContent}" @click="toggle"></i>
      <span class="text">只看有内容的评价</span>
    </div>
  </div>
</template>
<script>
export default {
  props: {
    ratings: {
      type: Array,
      default() {
        return []
      }
    },
    des: {
      type: Object,
      default() {
        return {
          all: '全部',
          good: '满意',
          bad: '不满意'
        }
      }
    },
    selectType: {
      type: Number,
      default() {
        return 2
      }
    },
    onlyContent: {
      type: Boolean,
      default() {
        return false
      }
    } //selectType、onlyContent影响good.vue里rating-wrapper,设置在父组件中比较好修改和传值给rate.vue(子组件)
  },
  computed: {
    typecount() {
      let goodcount = 0,
        badcount = 0
      this.ratings.forEach(rating => {
        if (rating.rateType) badcount++
        else goodcount++
      })
      return {
        goodcount: goodcount,
        badcount: badcount
      }
    }
  },
  methods: {
    toggle() {
      if (!event._constructed) {
        return
      }
      this.$emit('toggle')
    },
    select(type, event) {
      if (!event._constructed) {
        return
      }
      this.$emit('select', type)
    }
  }
}
</script>
<style lang="stylus">
.rate
  border-bottom 1px solid rgba(7, 17, 27, 0.1);
  padding 0 18px;
  .rate-type
    padding 14px 0;
    border-bottom 1px solid rgba(7, 17, 27, 0.1);
    .tag
      display inline-block;
      height 32px;
      margin-right 8px;
      font-size 12px;
      line-height 32px;
      padding 0 12px;
      color #4d555d;
      i
        font-size 12px;
        line-height 32px;
      &.good
        background rgba(0, 160, 220, 0.2);
        &.active
          background #00a0dc;
          color #fff;
      &.bad
        background rgba(77, 85, 93, 0.2);
        &.active
          background #4d555d;
          color #fff;
  .onlycontent
    padding 14px 0;
    height 24px;
    font-size 0;
    .text
      font-size 12px;
      line-height 24px;
      padding-left 4px;
      vertical-align top;
      color #93999f;
    .el-icon-circle-check
      font-size 24px;
      color #93999f;
      &.on
        color #00c850;
</style>
