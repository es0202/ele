<template>
    <div class="comment" ref="comment">
        <div class="commen-wrapper">
            <div class="overview">
                <div class="overview-left">
                    <p class="score">{{seller.score}}</p>
                    <p class="title">综合评分</p>
                    <p class="rank-rate">超过周边商家{{seller.rankRate}}%</p>
                </div>
                <div class="overview-right">
                    <p class="score-wrapper">
                        <span class="text">服务态度</span>
                        <star class="score-star" :score="seller.serviceScore" :starSize="15"></star>
                        <span class="score-text">{{seller.serviceScore}}</span>
                    </p>
                    <p class="score-wrapper">
                        <span class="text">商品评分</span>
                        <star class="score-star" :score="seller.foodScore" :starSize="15"></star>
                        <span class="score-text">{{seller.foodScore}}</span>
                    </p>
                    <p class="score-wrapper">
                        <span class="text">送达时间</span>
                        <span class="delivery-time">{{seller.deliveryTime}}分钟</span>
                    </p>
                </div>
            </div>
            <split></split>
            <rate :ratings="ratings" @select="typeRating" @toggle="toggleContent" :selectType="selectType" :onlyContent="onlyContent"></rate>
            <div class="rating-wrapper" v-show="ratings && ratings.length">
                <!--一条空评论也要显示-->
                <ul>
                    <li class="rate-content" v-for="rating in ratings" v-show="needShow(rating.rateType,rating.text)">
                        <!--v-for所有评价，相应等级、有无内容的才v-show-->
                        <div class="usr-avatar"><img class="avatar" :src="rating.avatar"></img></div>
                        <div class="usr-content">
                            <p class="time">{{rating.rateTime|formatDate}}</p>
                            <p class="username">{{rating.username}}</p>
                            <div class="star-wrapper">
                                <star class="usr-score" :starSize="10" :score="rating.score"></star>
                                <span class="delivery" v-show="rating.deliveryTime">{{rating.deliveryTime}}分钟</span>
                            </div>
                            <p class="rate-text">{{rating.text}}</p>
                            <p class="recommend" v-show="rating.recommend.length!==0">
                                <i class="icon-good-filling"></i>
                                <span class="recommend-food" v-for="food in rating.recommend">{{food}}</span>
                            </p>
                        </div>

                    </li>
                </ul>
            </div>
        </div>
    </div>
</template>
<script>
import rate from '../rate/rate.vue'
import split from '../split/split.vue'
import star from '../star/star.vue'
import axios from 'axios'
import BScroll from 'better-scroll'
import { formatDate } from '../../common/date.js'
export default {
  props: {
    seller: Object
  },
  components: {
    rate: rate,
    split: split,
    star: star
  },
  data() {
    return {
      //   ratings: [],
      ratings: [
        {
          username: '3******c',
          rateTime: 1469281964000,
          deliveryTime: 30,
          score: 5,
          rateType: 0,
          text: '不错,粥很好喝,我经常吃这一家,非常赞,以后也会常来吃,强烈推荐.',
          avatar:
            'http://static.galileo.xiaojukeji.com/static/tms/default_header.png',
          recommend: [
            '南瓜粥',
            '皮蛋瘦肉粥',
            '扁豆焖面',
            '娃娃菜炖豆腐',
            '牛肉馅饼'
          ]
        },
        {
          username: '2******3',
          rateTime: 1469271264000,
          deliveryTime: '',
          score: 4,
          rateType: 0,
          deliveryTime: '',
          text: '服务态度不错',
          avatar:
            'http://static.galileo.xiaojukeji.com/static/tms/default_header.png',
          recommend: ['扁豆焖面']
        },
        {
          username: '3******b',
          rateTime: 1469261964000,
          score: 3,
          rateType: 1,
          text: '',
          avatar:
            'http://static.galileo.xiaojukeji.com/static/tms/default_header.png',
          recommend: []
        },
        {
          username: '1******c',
          rateTime: 1469261864000,
          deliveryTime: 20,
          score: 5,
          rateType: 0,
          text: '良心店铺',
          avatar:
            'http://static.galileo.xiaojukeji.com/static/tms/default_header.png',
          recommend: []
        },
        {
          username: '2******d',
          rateTime: 1469251264000,
          deliveryTime: 10,
          score: 4,
          rateType: 0,
          text: '',
          avatar:
            'http://static.galileo.xiaojukeji.com/static/tms/default_header.png',
          recommend: []
        },
        {
          username: '9******0',
          rateTime: 1469241964000,
          deliveryTime: 70,
          score: 1,
          rateType: 1,
          text: '送货速度蜗牛一样',
          avatar:
            'http://static.galileo.xiaojukeji.com/static/tms/default_header.png',
          recommend: []
        },
        {
          username: 'd******c',
          rateTime: 1469231964000,
          deliveryTime: 30,
          score: 5,
          rateType: 0,
          text: '很喜欢的粥店',
          avatar:
            'http://static.galileo.xiaojukeji.com/static/tms/default_header.png',
          recommend: []
        },
        {
          username: '2******3',
          rateTime: 1469221264000,
          deliveryTime: '',
          score: 4,
          rateType: 0,
          text: '量给的还可以',
          avatar:
            'http://static.galileo.xiaojukeji.com/static/tms/default_header.png',
          recommend: []
        },
        {
          username: '3******8',
          rateTime: 1469211964000,
          deliveryTime: '',
          score: 3,
          rateType: 1,
          text: '',
          avatar:
            'http://static.galileo.xiaojukeji.com/static/tms/default_header.png',
          recommend: []
        },
        {
          username: 'a******a',
          rateTime: 1469201964000,
          deliveryTime: '',
          score: 4,
          rateType: 0,
          text: '孩子喜欢吃这家',
          avatar:
            'http://static.galileo.xiaojukeji.com/static/tms/default_header.png',
          recommend: ['南瓜粥']
        },
        {
          username: '3******3',
          rateTime: 1469191264000,
          deliveryTime: '',
          score: 4,
          rateType: 0,
          text: '粥挺好吃的',
          avatar:
            'http://static.galileo.xiaojukeji.com/static/tms/default_header.png',
          recommend: []
        },
        {
          username: 't******b',
          rateTime: 1469181964000,
          deliveryTime: '',
          score: 3,
          rateType: 1,
          text: '',
          avatar:
            'http://static.galileo.xiaojukeji.com/static/tms/default_header.png',
          recommend: []
        },
        {
          username: 'f******c',
          rateTime: 1469171964000,
          deliveryTime: 15,
          score: 5,
          rateType: 0,
          text: '送货速度很快',
          avatar:
            'http://static.galileo.xiaojukeji.com/static/tms/default_header.png',
          recommend: []
        },
        {
          username: 'k******3',
          rateTime: 1469161264000,
          deliveryTime: '',
          score: 4,
          rateType: 0,
          text: '',
          avatar:
            'http://static.galileo.xiaojukeji.com/static/tms/default_header.png',
          recommend: []
        },
        {
          username: 'u******b',
          rateTime: 1469151964000,
          deliveryTime: '',
          score: 4,
          rateType: 0,
          text: '下雨天给快递小哥点个赞',
          avatar:
            'http://static.galileo.xiaojukeji.com/static/tms/default_header.png',
          recommend: []
        },
        {
          username: 's******c',
          rateTime: 1469141964000,
          deliveryTime: '',
          score: 4,
          rateType: 0,
          text: '好',
          avatar:
            'http://static.galileo.xiaojukeji.com/static/tms/default_header.png',
          recommend: []
        },
        {
          username: 'z******3',
          rateTime: 1469131264000,
          deliveryTime: '',
          score: 5,
          rateType: 0,
          text: '吃了还想再吃',
          avatar:
            'http://static.galileo.xiaojukeji.com/static/tms/default_header.png',
          recommend: []
        },
        {
          username: 'n******b',
          rateTime: 1469121964000,
          deliveryTime: '',
          score: 3,
          rateType: 1,
          text: '发票开的不对',
          avatar:
            'http://static.galileo.xiaojukeji.com/static/tms/default_header.png',
          recommend: []
        },
        {
          username: 'm******c',
          rateTime: 1469111964000,
          deliveryTime: 30,
          score: 5,
          rateType: 0,
          text: '好吃',
          avatar:
            'http://static.galileo.xiaojukeji.com/static/tms/default_header.png',
          recommend: []
        },
        {
          username: 'l******3',
          rateTime: 1469101264000,
          deliveryTime: 40,
          score: 5,
          rateType: 0,
          text: '还不错吧',
          avatar:
            'http://static.galileo.xiaojukeji.com/static/tms/default_header.png',
          recommend: []
        },
        {
          username: '3******o',
          rateTime: 1469091964000,
          deliveryTime: '',
          score: 2,
          rateType: 1,
          text: '',
          avatar:
            'http://static.galileo.xiaojukeji.com/static/tms/default_header.png',
          recommend: []
        },
        {
          username: '3******p',
          rateTime: 1469081964000,
          deliveryTime: '',
          score: 4,
          rateType: 0,
          text: '很喜欢的粥',
          avatar:
            'http://static.galileo.xiaojukeji.com/static/tms/default_header.png',
          recommend: []
        },
        {
          username: 'o******k',
          rateTime: 1469071264000,
          deliveryTime: '',
          score: 5,
          rateType: 0,
          text: '',
          avatar:
            'http://static.galileo.xiaojukeji.com/static/tms/default_header.png',
          recommend: []
        },
        {
          username: 'k******b',
          rateTime: 1469061964000,
          deliveryTime: '',
          score: 4,
          rateType: 0,
          text: '',
          avatar:
            'http://static.galileo.xiaojukeji.com/static/tms/default_header.png',
          recommend: []
        }
      ],
      selectType: 2,
      onlyContent: true
    }
  },
  created() {
    // axios.get('/api/ratings').then(response => {
    //   if (response.status === 200) {
    // this.ratings = response.data.data
    this.$nextTick(()=>{
        if (!this.scroll) {
      this.scroll = new BScroll(this.$refs.comment, {
        click: true
      })
    } else {
      this.scroll.refresh()
    }
    })
    //   }
    // })
  },
  methods: {
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
  filters: {
    formatDate(time) {
      let date = new Date(time)
      return formatDate(date, 'yyyy-MM-dd hh:mm')
    }
  }
}
</script>
<style lang="stylus">
.comment
    width 100%;
    position absolute;
    top 174px;
    bottom 0; // scroll
    overflow hidden;
    .overview
        display flex;
        padding 18px 0;
        .overview-left
            flex 0 0 137px;
            border-right 1px solid rgba(7, 17, 27, 0.1);
            padding 6px 0;
            text-align center;
            .score, .title
                margin-bottom 6px;
            .score
                font-size 24px;
                line-height 28px;
                color #f90;
            .title
                font-size 12px;
                line-height 14px;
                color #07111b;
            .rank-rate
                font-size 10px;
                line-height 10px;
                color #93999f;
        .overview-right
            flex 1;
            padding 6px 0 6px 24px;
            .score-wrapper
                font-size 0;
                color #07111b;
                height 18px;
                margin-bottom 8px;
                span
                    display inline-block;
                    vertical-align top;
                    line-height 18px;
                    font-size 12px;
                .score-text
                    color #f90;
                    margin-left 12px;
                .score-star
                    margin 0 12px;
                    display inline-block;
                    vertical-align top;
                .delivery-time
                    color #93999f;
                    margin-left 12px;
    .rating-wrapper
        padding 0 18px;
        .rate-content
            border-bottom 1px solid rgba(7, 17, 27, 0.1);
            padding 16px 0;
            display flex;
            .usr-avatar
                margin-right 12px;
                display inline-block;
                flex 0 0 28px;
                .avatar
                    width 28px;
                    height 28px;
                    border-radius 50%;
            .usr-content
                position relative;
                display inline-block;
                flex 1;
                .star-wrapper
                    text-align left;
                    margin-bottom 6px;
                    height 12px;
                    font-size 0;
                    .usr-score
                        display inline-block;
                    .delivery
                        font-size 10px;
                        line-height 12px;
                        color #93999f;
                        vertical-align top;
                        margin-left 6px;
                .time, .username
                    font-size 10px;
                    line-height 10px;
                    color #93999f;
                    display inline-block;
                .time
                    position absolute;
                    right 0;
                    top 0;
                .username
                    margin-bottom 4px;
                    vertical-align top;
                    color #07111b;
                .rate-text
                    font-size 12px;
                    line-height 16px;
                    color #07111b;
                    margin-bottom 8px;
                .recommend
                    i
                        font-size 12px;
                        margin-right 4px;
                        color #00a0dc;
                    .recommend-food
                        display inline-block;
                        height 18px;
                        padding 0 6px;
                        font-size 9px;
                        line-height 18px;
                        border 1px solid rgba(7, 17, 27, 0.1);
                        margin 0 8px 4px 0;
                        color #93999f;
</style>
