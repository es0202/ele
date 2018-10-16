<template>
  <div id="app">
    <e-header :seller="seller"></e-header>
    <div class="tab">
      <div class="tab-item">
        <router-link to='/goods'>商品</router-link>
      </div>
      <div class="tab-item">
        <router-link to='/comments'>评论</router-link>
      </div>
      <div class="tab-item">
        <router-link to="/seller">商家</router-link>
      </div>
    </div>
    <!--keep-alive切换路由时保持组件不被destory后再重新create-->
    <keep-alive>
      <router-view :seller="seller"></router-view>
    </keep-alive>
  </div>
</template>

<script>
import header from './components/header/header.vue'
import aside from './components/aside/aside.vue'
import footer from './components/footer/footer.vue'
import main from './components/main/main.vue'
import shoptab from './components/shoptab/shoptab.vue'
export default {
  data() {
    return {
      seller: {
        type: Object,
        name: '粥品香坊（回龙观）',
        description: '蜂鸟专送',
        deliveryTime: 38,
        score: 3.8,
        serviceScore: 4.1,
        foodScore: 4.3,
        rankRate: 69.2,
        minPrice: 20,
        deliveryPrice: 4,
        ratingCount: 24,
        sellCount: 90,
        bulletin:
          '粥品香坊其烹饪粥料的秘方源于中国千年古法，在融和现代制作工艺，由世界烹饪大师屈浩先生领衔研发。坚守纯天然、0添加的良心品质深得消费者青睐，发展至今成为粥类的引领品牌。是2008年奥运会和2013年园博会指定餐饮服务商。',
        supports: [
          {
            type: 0,
            description: '在线支付满28减5'
          },
          {
            type: 1,
            description: 'VC无限橙果汁全场8折'
          },
          {
            type: 2,
            description: '单人精彩套餐'
          },
          {
            type: 3,
            description: '该商家支持发票,请下单写好发票抬头'
          },
          {
            type: 4,
            description: '已加入“外卖保”计划,食品安全保障'
          }
        ],
        avatar: 'http://localhost:8080/static/img/avatar.jpg',
        pics: [
          'http://fuss10.elemecdn.com/8/71/c5cf5715740998d5040dda6e66abfjpeg.jpeg?imageView2/1/w/180/h/180',
          'http://fuss10.elemecdn.com/b/6c/75bd250e5ba69868f3b1178afbda3jpeg.jpeg?imageView2/1/w/180/h/180',
          'http://fuss10.elemecdn.com/f/96/3d608c5811bc2d902fc9ab9a5baa7jpeg.jpeg?imageView2/1/w/180/h/180',
          'http://fuss10.elemecdn.com/6/ad/779f8620ff49f701cd4c58f6448b6jpeg.jpeg?imageView2/1/w/180/h/180'
        ],
        infos: [
          '该商家支持发票,请下单写好发票抬头',
          '品类:其他菜系,包子粥店',
          '北京市昌平区回龙观西大街龙观置业大厦底商B座102单元1340',
          '营业时间:10:00-20:30'
        ]
      }
    }
  },
  name: 'App',
  components: {
    'e-header': header,
    'e-aside': aside,
    'e-footer': footer,
    'e-main': main,
    'e-shoptab': shoptab
  }
  // mounted() {
  //   $(window).scroll(function() {
  //     console.log($(document).scrollTop())
  //     if ($(document).scrollTop() > 144) $('.shoptab').addClass('tab-top')
  //     else $('.shoptab').removeClass('tab-top')
  //   })
  //   const height = document.documentElement.clientHeight
  //   $('.main').css('max-height', height)
  //   $('.aside').css('max-height', height)
  // }
}
</script>

<style lang="stylus">
$height = 40px;
*
  padding 0;
  margin 0;
.clearfix
  display inline-block;
  &:after
    display block;
    content '.';
    height 0;
    line-height 0;
    clear both;
    visibility hidden;
.tab
  border solid 1px rgba(7, 17, 27, 0.1);
  height $height;
  line-height $height;
  display flex;
  .tab-item
    text-align center;
    flex 1;
    font-size 14px;
    a.router-link-active
      color #f01414;
</style>

