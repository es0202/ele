<template>
  <div class="goods">
    <div class="menu-wrapper" ref="menuWrapper">
      <ul>
        <li ref="menuList" class="menu-item" v-for="(item,index) in goods" :class="{'current':currentIndex===index}" @click="clickMenu(index,$event)">
          <div class="item-border">
            <span v-show="item.type>0" class="icon" :class="classMap[item.type]"></span>{{item.name}}
          </div>
        </li>
      </ul>
    </div>
    <div class="goods-wrapper" ref="goodsWrapper">
      <ul>
        <li v-for="item in goods" class="goods-list" ref="foodsList">
          <h1 class="list-title">{{item.name}}</h1>
          <ul>
            <li v-for="food in item.foods" class="food-item" @click="clickFood(food,$event)">
              <img :src="food.image" width="57px" height="57px" alt="">
              <div class="food-wrapper">
                <p class="title">{{food.name}}</p>
                <p class="des mar-bottom">{{food.description}}</p>
                <p class="extra">
                  <span class="sellcount" v-show="food.sellCount">月售{{food.sellCount}}份</span>
                  <span class="rating" v-show="food.rating">好评率{{food.rating}}%</span>
                </p>
                <p class="price">
                  <span class="now">￥{{food.price}}</span>
                  <span class="old" v-show="food.oldPrice>0">￥{{food.oldPrice}}</span>
                </p>
                <div class="cartcontrol-wrapper">
                  <cartcontrol @click="addFood" :food="food"></cartcontrol>
                </div>
              </div>
            </li>
          </ul>
        </li>
      </ul>
    </div>
    <shopcart ref="shopcart" :foodsInCart="foodsInCart" :deliveryPrice="seller.deliveryPrice" :minPrice="seller.minPrice"></shopcart>
    <food ref="food" @add="addFood" :good="clickedFood"></food>
  </div>
</template>
<script>
import BScroll from 'better-scroll'
import cartcontrol from '../cartcontrol/cartcontrol.vue'
import shopcart from '../shopcart/shopcart.vue'
import food from '../food/food.vue'
const axios = require('axios')
export default {
  props: {
    seller: Object
  },
  data() {
    return {
      //goods: [],
      goods: [
        {
          name: '热销榜',
          type: -1,
          foods: [
            {
              name: '皮蛋瘦肉粥',
              price: 10,
              oldPrice: '',
              description: '咸粥',
              sellCount: 229,
              rating: 100,
              info:
                '一碗皮蛋瘦肉粥，总是我到粥店时的不二之选。香浓软滑，饱腹暖心，皮蛋的Q弹与瘦肉的滑嫩伴着粥香溢于满口，让人喝这样的一碗粥也觉得心满意足',
              ratings: [
                {
                  username: '3******c',
                  rateTime: 1469281964000,
                  rateType: 0,
                  text: '很喜欢的粥',
                  avatar:
                    'http://static.galileo.xiaojukeji.com/static/tms/default_header.png'
                },
                {
                  username: '2******3',
                  rateTime: 1469271264000,
                  rateType: 0,
                  text: '',
                  avatar:
                    'http://static.galileo.xiaojukeji.com/static/tms/default_header.png'
                },
                {
                  username: '3******b',
                  rateTime: 1469261964000,
                  rateType: 1,
                  text: '',
                  avatar:
                    'http://static.galileo.xiaojukeji.com/static/tms/default_header.png'
                }
              ],
              icon:
                'http://fuss10.elemecdn.com/c/cd/c12745ed8a5171e13b427dbc39401jpeg.jpeg?imageView2/1/w/114/h/114',
              image:
                'http://fuss10.elemecdn.com/c/cd/c12745ed8a5171e13b427dbc39401jpeg.jpeg?imageView2/1/w/750/h/750'
            },
            {
              name: '扁豆焖面',
              price: 14,
              oldPrice: '',
              description: '',
              sellCount: 188,
              rating: 96,
              ratings: [
                {
                  username: '3******c',
                  rateTime: 1469281964000,
                  rateType: 0,
                  text: '',
                  avatar:
                    'http://static.galileo.xiaojukeji.com/static/tms/default_header.png'
                },
                {
                  username: '2******3',
                  rateTime: 1469271264000,
                  rateType: 0,
                  text: '',
                  avatar:
                    'http://static.galileo.xiaojukeji.com/static/tms/default_header.png'
                },
                {
                  username: '3******b',
                  rateTime: 1469261964000,
                  rateType: 1,
                  text: '',
                  avatar:
                    'http://static.galileo.xiaojukeji.com/static/tms/default_header.png'
                }
              ],
              info: '',
              icon:
                'http://fuss10.elemecdn.com/c/6b/29e3d29b0db63d36f7c500bca31d8jpeg.jpeg?imageView2/1/w/114/h/114',
              image:
                'http://fuss10.elemecdn.com/c/6b/29e3d29b0db63d36f7c500bca31d8jpeg.jpeg?imageView2/1/w/750/h/750'
            },
            {
              name: '葱花饼',
              price: 10,
              oldPrice: '',
              description: '',
              sellCount: 124,
              rating: 85,
              info: '',
              ratings: [
                {
                  username: '3******c',
                  rateTime: 1469281964000,
                  rateType: 1,
                  text: '没啥味道',
                  avatar:
                    'http://static.galileo.xiaojukeji.com/static/tms/default_header.png'
                },
                {
                  username: '2******3',
                  rateTime: 1469271264000,
                  rateType: 1,
                  text: '很一般啊',
                  avatar:
                    'http://static.galileo.xiaojukeji.com/static/tms/default_header.png'
                },
                {
                  username: '3******b',
                  rateTime: 1469261964000,
                  rateType: 0,
                  text: '',
                  avatar:
                    'http://static.galileo.xiaojukeji.com/static/tms/default_header.png'
                }
              ],
              icon:
                'http://fuss10.elemecdn.com/f/28/a51e7b18751bcdf871648a23fd3b4jpeg.jpeg?imageView2/1/w/114/h/114',
              image:
                'http://fuss10.elemecdn.com/f/28/a51e7b18751bcdf871648a23fd3b4jpeg.jpeg?imageView2/1/w/750/h/750'
            },
            {
              name: '牛肉馅饼',
              price: 14,
              oldPrice: '',
              description: '',
              sellCount: 114,
              rating: 91,
              info: '',
              ratings: [
                {
                  username: '3******c',
                  rateTime: 1469281964000,
                  rateType: 1,
                  text: '难吃不推荐',
                  avatar:
                    'http://static.galileo.xiaojukeji.com/static/tms/default_header.png'
                },
                {
                  username: '2******3',
                  rateTime: 1469271264000,
                  rateType: 0,
                  text: '',
                  avatar:
                    'http://static.galileo.xiaojukeji.com/static/tms/default_header.png'
                },
                {
                  username: '3******b',
                  rateTime: 1469261964000,
                  rateType: 0,
                  text: '',
                  avatar:
                    'http://static.galileo.xiaojukeji.com/static/tms/default_header.png'
                }
              ],
              icon:
                'http://fuss10.elemecdn.com/d/b9/bcab0e8ad97758e65ae5a62b2664ejpeg.jpeg?imageView2/1/w/114/h/114',
              image:
                'http://fuss10.elemecdn.com/d/b9/bcab0e8ad97758e65ae5a62b2664ejpeg.jpeg?imageView2/1/w/750/h/750'
            },
            {
              name: '招牌猪肉白菜锅贴/10个',
              price: 17,
              oldPrice: '',
              description: '',
              sellCount: 101,
              rating: 78,
              info: '',
              ratings: [
                {
                  username: '3******c',
                  rateTime: 1469281964000,
                  rateType: 1,
                  text: '不脆,不好吃',
                  avatar:
                    'http://static.galileo.xiaojukeji.com/static/tms/default_header.png'
                },
                {
                  username: '2******3',
                  rateTime: 1469271264000,
                  rateType: 0,
                  text: '',
                  avatar:
                    'http://static.galileo.xiaojukeji.com/static/tms/default_header.png'
                },
                {
                  username: '3******b',
                  rateTime: 1469261964000,
                  rateType: 0,
                  text: '',
                  avatar:
                    'http://static.galileo.xiaojukeji.com/static/tms/default_header.png'
                }
              ],
              icon:
                'http://fuss10.elemecdn.com/7/72/9a580c1462ca1e4d3c07e112bc035jpeg.jpeg?imageView2/1/w/114/h/114',
              image:
                'http://fuss10.elemecdn.com/7/72/9a580c1462ca1e4d3c07e112bc035jpeg.jpeg?imageView2/1/w/750/h/750'
            },
            {
              name: '南瓜粥',
              price: 9,
              oldPrice: '',
              description: '甜粥',
              sellCount: 91,
              rating: 100,
              ratings: [
                {
                  username: '3******c',
                  rateTime: 1469281964000,
                  rateType: 0,
                  text: '',
                  avatar:
                    'http://static.galileo.xiaojukeji.com/static/tms/default_header.png'
                },
                {
                  username: '2******3',
                  rateTime: 1469271264000,
                  rateType: 0,
                  text: '',
                  avatar:
                    'http://static.galileo.xiaojukeji.com/static/tms/default_header.png'
                },
                {
                  username: '3******b',
                  rateTime: 1469261964000,
                  rateType: 0,
                  text: '',
                  avatar:
                    'http://static.galileo.xiaojukeji.com/static/tms/default_header.png'
                }
              ],
              icon:
                'http://fuss10.elemecdn.com/8/a6/453f65f16b1391942af11511b7a90jpeg.jpeg?imageView2/1/w/114/h/114',
              image:
                'http://fuss10.elemecdn.com/8/a6/453f65f16b1391942af11511b7a90jpeg.jpeg?imageView2/1/w/750/h/750'
            },
            {
              name: '红豆薏米美肤粥',
              price: 12,
              oldPrice: '',
              description: '甜粥',
              sellCount: 86,
              rating: 100,
              info: '',
              ratings: [
                {
                  username: '3******c',
                  rateTime: 1469281964000,
                  rateType: 0,
                  text: '',
                  avatar:
                    'http://static.galileo.xiaojukeji.com/static/tms/default_header.png'
                },
                {
                  username: '2******3',
                  rateTime: 1469271264000,
                  rateType: 0,
                  text: '',
                  avatar:
                    'http://static.galileo.xiaojukeji.com/static/tms/default_header.png'
                },
                {
                  username: '3******b',
                  rateTime: 1469261964000,
                  rateType: 0,
                  text: '',
                  avatar:
                    'http://static.galileo.xiaojukeji.com/static/tms/default_header.png'
                }
              ],
              icon:
                'http://fuss10.elemecdn.com/d/22/260bd78ee6ac6051136c5447fe307jpeg.jpeg?imageView2/1/w/114/h/114',
              image:
                'http://fuss10.elemecdn.com/d/22/260bd78ee6ac6051136c5447fe307jpeg.jpeg?imageView2/1/w/750/h/750'
            },
            {
              name: '八宝酱菜',
              price: 4,
              oldPrice: '',
              description: '',
              sellCount: 84,
              rating: 100,
              info: '',
              ratings: [
                {
                  username: '3******c',
                  rateTime: 1469281964000,
                  rateType: 0,
                  text: '',
                  avatar:
                    'http://static.galileo.xiaojukeji.com/static/tms/default_header.png'
                },
                {
                  username: '2******3',
                  rateTime: 1469271264000,
                  rateType: 0,
                  text: '',
                  avatar:
                    'http://static.galileo.xiaojukeji.com/static/tms/default_header.png'
                },
                {
                  username: '3******b',
                  rateTime: 1469261964000,
                  rateType: 0,
                  text: '',
                  avatar:
                    'http://static.galileo.xiaojukeji.com/static/tms/default_header.png'
                }
              ],
              icon:
                'http://fuss10.elemecdn.com/9/b5/469d8854f9a3a03797933fd01398bjpeg.jpeg?imageView2/1/w/114/h/114',
              image:
                'http://fuss10.elemecdn.com/9/b5/469d8854f9a3a03797933fd01398bjpeg.jpeg?imageView2/1/w/750/h/750'
            },
            {
              name: '红枣山药糙米粥',
              price: 10,
              oldPrice: '',
              description: '',
              sellCount: 81,
              rating: 91,
              info: '',
              ratings: [
                {
                  username: '3******c',
                  rateTime: 1469281964000,
                  rateType: 0,
                  text: '',
                  avatar:
                    'http://static.galileo.xiaojukeji.com/static/tms/default_header.png'
                },
                {
                  username: '2******3',
                  rateTime: 1469271264000,
                  rateType: 0,
                  text: '',
                  avatar:
                    'http://static.galileo.xiaojukeji.com/static/tms/default_header.png'
                },
                {
                  username: '3******b',
                  rateTime: 1469261964000,
                  rateType: 0,
                  text: '',
                  avatar:
                    'http://static.galileo.xiaojukeji.com/static/tms/default_header.png'
                }
              ],
              icon:
                'http://fuss10.elemecdn.com/9/b5/469d8854f9a3a03797933fd01398bjpeg.jpeg?imageView2/1/w/114/h/114',
              image:
                'http://fuss10.elemecdn.com/9/b5/469d8854f9a3a03797933fd01398bjpeg.jpeg?imageView2/1/w/750/h/750'
            },
            {
              name: '糊塌子',
              price: 10,
              oldPrice: '',
              description: '',
              sellCount: 80,
              rating: 93,
              info: '',
              ratings: [
                {
                  username: '3******c',
                  rateTime: 1469281964000,
                  rateType: 0,
                  text: '',
                  avatar:
                    'http://static.galileo.xiaojukeji.com/static/tms/default_header.png'
                },
                {
                  username: '2******3',
                  rateTime: 1469271264000,
                  rateType: 0,
                  text: '',
                  avatar:
                    'http://static.galileo.xiaojukeji.com/static/tms/default_header.png'
                },
                {
                  username: '3******b',
                  rateTime: 1469261964000,
                  rateType: 0,
                  text: '',
                  avatar:
                    'http://static.galileo.xiaojukeji.com/static/tms/default_header.png'
                }
              ],
              icon:
                'http://fuss10.elemecdn.com/0/05/097a2a59fd2a2292d08067e16380cjpeg.jpeg?imageView2/1/w/114/h/114',
              image:
                'http://fuss10.elemecdn.com/0/05/097a2a59fd2a2292d08067e16380cjpeg.jpeg?imageView2/1/w/750/h/750'
            }
          ]
        },
        {
          name: '单人精彩套餐',
          type: 2,
          foods: [
            {
              name: '红枣山药粥套餐',
              price: 29,
              oldPrice: 36,
              description:
                '红枣山药糙米粥,素材包,爽口莴笋丝,四川泡菜或八宝酱菜,配菜可备注',
              sellCount: 17,
              rating: 100,
              info: '',
              ratings: [
                {
                  username: '2******3',
                  rateTime: 1469271264000,
                  rateType: 0,
                  text: '',
                  avatar:
                    'http://static.galileo.xiaojukeji.com/static/tms/default_header.png'
                }
              ],
              icon:
                'http://fuss10.elemecdn.com/6/72/cb844f0bb60c502c6d5c05e0bddf5jpeg.jpeg?imageView2/1/w/114/h/114',
              image:
                'http://fuss10.elemecdn.com/6/72/cb844f0bb60c502c6d5c05e0bddf5jpeg.jpeg?imageView2/1/w/750/h/750'
            }
          ]
        },
        {
          name: '冰爽饮品限时特惠',
          type: 1,
          foods: [
            {
              name: 'VC无限橙果汁',
              price: 8,
              oldPrice: 10,
              description: '',
              sellCount: 15,
              rating: 100,
              info: '',
              ratings: [
                {
                  username: '3******c',
                  rateTime: 1469281964000,
                  rateType: 0,
                  text: '还可以',
                  avatar:
                    'http://static.galileo.xiaojukeji.com/static/tms/default_header.png'
                },
                {
                  username: '2******3',
                  rateTime: 1469271264000,
                  rateType: 0,
                  text: '',
                  avatar:
                    'http://static.galileo.xiaojukeji.com/static/tms/default_header.png'
                }
              ],
              icon:
                'http://fuss10.elemecdn.com/e/c6/f348e811772016ae24e968238bcbfjpeg.jpeg?imageView2/1/w/114/h/114',
              image:
                'http://fuss10.elemecdn.com/e/c6/f348e811772016ae24e968238bcbfjpeg.jpeg?imageView2/1/w/750/h/750'
            }
          ]
        },
        {
          name: '精选热菜',
          type: -1,
          foods: [
            {
              name: '娃娃菜炖豆腐',
              price: 17,
              oldPrice: '',
              description: '',
              sellCount: 43,
              rating: 92,
              info: '',
              ratings: [
                {
                  username: '3******c',
                  rateTime: 1469281964000,
                  rateType: 0,
                  text: '菜量还可以,味道还可以',
                  avatar:
                    'http://static.galileo.xiaojukeji.com/static/tms/default_header.png'
                },
                {
                  username: '2******3',
                  rateTime: 1469271264000,
                  rateType: 0,
                  text: '',
                  avatar:
                    'http://static.galileo.xiaojukeji.com/static/tms/default_header.png'
                }
              ],
              icon:
                'http://fuss10.elemecdn.com/d/2d/b1eb45b305635d9dd04ddf157165fjpeg.jpeg?imageView2/1/w/114/h/114',
              image:
                'http://fuss10.elemecdn.com/d/2d/b1eb45b305635d9dd04ddf157165fjpeg.jpeg?imageView2/1/w/750/h/750'
            },
            {
              name: '手撕包菜',
              price: 16,
              oldPrice: '',
              description: '',
              sellCount: 29,
              rating: 100,
              info: '',
              ratings: [
                {
                  username: '3******c',
                  rateTime: 1469281964000,
                  rateType: 0,
                  text: '',
                  avatar:
                    'http://static.galileo.xiaojukeji.com/static/tms/default_header.png'
                },
                {
                  username: '2******3',
                  rateTime: 1469271264000,
                  rateType: 0,
                  text: '',
                  avatar:
                    'http://static.galileo.xiaojukeji.com/static/tms/default_header.png'
                }
              ],
              icon:
                'http://fuss10.elemecdn.com/9/c6/f3bc84468820121112e79583c24efjpeg.jpeg?imageView2/1/w/114/h/114',
              image:
                'http://fuss10.elemecdn.com/9/c6/f3bc84468820121112e79583c24efjpeg.jpeg?imageView2/1/w/750/h/750'
            },
            {
              name: '香酥黄金鱼/3条',
              price: 11,
              oldPrice: '',
              description: '',
              sellCount: 15,
              rating: 100,
              info: '',
              ratings: [
                {
                  username: '3******c',
                  rateTime: 1469281964000,
                  rateType: 0,
                  text: '',
                  avatar:
                    'http://static.galileo.xiaojukeji.com/static/tms/default_header.png'
                },
                {
                  username: '2******3',
                  rateTime: 1469271264000,
                  rateType: 0,
                  text: '',
                  avatar:
                    'http://static.galileo.xiaojukeji.com/static/tms/default_header.png'
                }
              ],
              icon:
                'http://fuss10.elemecdn.com/4/e7/8277a6a2ea0a2e97710290499fc41jpeg.jpeg?imageView2/1/w/114/h/114',
              image:
                'http://fuss10.elemecdn.com/4/e7/8277a6a2ea0a2e97710290499fc41jpeg.jpeg?imageView2/1/w/750/h/750'
            }
          ]
        },
        {
          name: '爽口凉菜',
          type: -1,
          foods: [
            {
              name: '八宝酱菜',
              price: 4,
              oldPrice: '',
              description: '',
              sellCount: 84,
              rating: 100,
              info: '',
              ratings: [
                {
                  username: '3******c',
                  rateTime: 1469281964000,
                  rateType: 0,
                  text: '',
                  avatar:
                    'http://static.galileo.xiaojukeji.com/static/tms/default_header.png'
                },
                {
                  username: '2******3',
                  rateTime: 1469271264000,
                  rateType: 0,
                  text: '',
                  avatar:
                    'http://static.galileo.xiaojukeji.com/static/tms/default_header.png'
                },
                {
                  username: '3******b',
                  rateTime: 1469261964000,
                  rateType: 0,
                  text: '',
                  avatar:
                    'http://static.galileo.xiaojukeji.com/static/tms/default_header.png'
                }
              ],
              icon:
                'http://fuss10.elemecdn.com/9/b5/469d8854f9a3a03797933fd01398bjpeg.jpeg?imageView2/1/w/114/h/114',
              image:
                'http://fuss10.elemecdn.com/9/b5/469d8854f9a3a03797933fd01398bjpeg.jpeg?imageView2/1/w/750/h/750'
            },
            {
              name: '拍黄瓜',
              price: 9,
              oldPrice: '',
              description: '',
              sellCount: 28,
              rating: 100,
              info: '',
              ratings: [
                {
                  username: '3******c',
                  rateTime: 1469281964000,
                  rateType: 0,
                  text: '',
                  avatar:
                    'http://static.galileo.xiaojukeji.com/static/tms/default_header.png'
                },
                {
                  username: '2******3',
                  rateTime: 1469271264000,
                  rateType: 0,
                  text: '',
                  avatar:
                    'http://static.galileo.xiaojukeji.com/static/tms/default_header.png'
                },
                {
                  username: '3******b',
                  rateTime: 1469261964000,
                  rateType: 0,
                  text: '',
                  avatar:
                    'http://static.galileo.xiaojukeji.com/static/tms/default_header.png'
                }
              ],
              icon:
                'http://fuss10.elemecdn.com/6/54/f654985b4e185f06eb07f8fa2b2e8jpeg.jpeg?imageView2/1/w/114/h/114',
              image:
                'http://fuss10.elemecdn.com/6/54/f654985b4e185f06eb07f8fa2b2e8jpeg.jpeg?imageView2/1/w/750/h/750'
            }
          ]
        },
        {
          name: '精选套餐',
          type: -1,
          foods: [
            {
              name: '红豆薏米粥套餐',
              price: 37,
              oldPrice: '',
              description: '红豆薏米粥,三鲜干蒸烧卖,拍黄瓜',
              sellCount: 3,
              rating: 100,
              info: '',
              ratings: [
                {
                  username: '2******3',
                  rateTime: 1469271264000,
                  rateType: 0,
                  text: '',
                  avatar:
                    'http://static.galileo.xiaojukeji.com/static/tms/default_header.png'
                }
              ],
              icon:
                'http://fuss10.elemecdn.com/f/49/27f26ed00c025b2200a9ccbb7e67ejpeg.jpeg?imageView2/1/w/114/h/114',
              image:
                'http://fuss10.elemecdn.com/f/49/27f26ed00c025b2200a9ccbb7e67ejpeg.jpeg?imageView2/1/w/750/h/750'
            },
            {
              name: '皮蛋瘦肉粥套餐',
              price: 31,
              oldPrice: '',
              description: '',
              sellCount: 12,
              rating: 100,
              info: '',
              ratings: [
                {
                  username: '2******3',
                  rateTime: 1469271264000,
                  rateType: 0,
                  text: '',
                  avatar:
                    'http://static.galileo.xiaojukeji.com/static/tms/default_header.png'
                }
              ],
              icon:
                'http://fuss10.elemecdn.com/8/96/f444a8087f0e940ef264617f9d98ajpeg.jpeg?imageView2/1/w/114/h/114',
              image:
                'http://fuss10.elemecdn.com/8/96/f444a8087f0e940ef264617f9d98ajpeg.jpeg?imageView2/1/w/750/h/750'
            }
          ]
        },
        {
          name: '果拼果汁',
          type: -1,
          foods: [
            {
              name: '蜜瓜圣女萝莉杯',
              price: 6,
              oldPrice: '',
              description: '',
              sellCount: 1,
              rating: '',
              info: '',
              ratings: [],
              icon:
                'http://fuss10.elemecdn.com/b/5f/b3b04c259d5ec9fa52e1856ee50dajpeg.jpeg?imageView2/1/w/114/h/114',
              image:
                'http://fuss10.elemecdn.com/b/5f/b3b04c259d5ec9fa52e1856ee50dajpeg.jpeg?imageView2/1/w/750/h/750'
            },
            {
              name: '加多宝',
              price: 6,
              oldPrice: '',
              description: '',
              sellCount: 7,
              rating: 100,
              info: '',
              ratings: [
                {
                  username: '3******c',
                  rateTime: 1469281964000,
                  rateType: 0,
                  text: '',
                  avatar:
                    'http://static.galileo.xiaojukeji.com/static/tms/default_header.png'
                },
                {
                  username: '2******3',
                  rateTime: 1469271264000,
                  rateType: 0,
                  text: '',
                  avatar:
                    'http://static.galileo.xiaojukeji.com/static/tms/default_header.png'
                },
                {
                  username: '3******b',
                  rateTime: 1469261964000,
                  rateType: 0,
                  text: '',
                  avatar:
                    'http://static.galileo.xiaojukeji.com/static/tms/default_header.png'
                }
              ],
              icon:
                'http://fuss10.elemecdn.com/b/9f/5e6c99c593cf65229225c5661bcdejpeg.jpeg?imageView2/1/w/114/h/114',
              image:
                'http://fuss10.elemecdn.com/b/9f/5e6c99c593cf65229225c5661bcdejpeg.jpeg?imageView2/1/w/750/h/750'
            },
            {
              name: 'VC无限橙果汁',
              price: 8,
              oldPrice: 10,
              description: '',
              sellCount: 15,
              rating: 100,
              info: '',
              ratings: [
                {
                  username: '3******c',
                  rateTime: 1469281964000,
                  rateType: 0,
                  text: '还可以',
                  avatar:
                    'http://static.galileo.xiaojukeji.com/static/tms/default_header.png'
                },
                {
                  username: '2******3',
                  rateTime: 1469271264000,
                  rateType: 0,
                  text: '',
                  avatar:
                    'http://static.galileo.xiaojukeji.com/static/tms/default_header.png'
                }
              ],
              icon:
                'http://fuss10.elemecdn.com/e/c6/f348e811772016ae24e968238bcbfjpeg.jpeg?imageView2/1/w/114/h/114',
              image:
                'http://fuss10.elemecdn.com/e/c6/f348e811772016ae24e968238bcbfjpeg.jpeg?imageView2/1/w/750/h/750'
            }
          ]
        },
        {
          name: '小吃主食',
          type: -1,
          foods: [
            {
              name: '扁豆焖面',
              price: 14,
              oldPrice: '',
              description: '',
              sellCount: 188,
              rating: 96,
              info: '',
              ratings: [
                {
                  username: '3******c',
                  rateTime: 1469281964000,
                  rateType: 0,
                  text: '',
                  avatar:
                    'http://static.galileo.xiaojukeji.com/static/tms/default_header.png'
                },
                {
                  username: '2******3',
                  rateTime: 1469271264000,
                  rateType: 0,
                  text: '',
                  avatar:
                    'http://static.galileo.xiaojukeji.com/static/tms/default_header.png'
                },
                {
                  username: '3******b',
                  rateTime: 1469261964000,
                  rateType: 1,
                  text: '',
                  avatar:
                    'http://static.galileo.xiaojukeji.com/static/tms/default_header.png'
                }
              ],
              icon:
                'http://fuss10.elemecdn.com/c/6b/29e3d29b0db63d36f7c500bca31d8jpeg.jpeg?imageView2/1/w/114/h/114',
              image:
                'http://fuss10.elemecdn.com/c/6b/29e3d29b0db63d36f7c500bca31d8jpeg.jpeg?imageView2/1/w/750/h/750'
            },
            {
              name: '葱花饼',
              price: 10,
              oldPrice: '',
              description: '',
              sellCount: 124,
              rating: 85,
              info: '',
              ratings: [
                {
                  username: '3******c',
                  rateTime: 1469281964000,
                  rateType: 1,
                  text: '没啥味道',
                  avatar:
                    'http://static.galileo.xiaojukeji.com/static/tms/default_header.png'
                },
                {
                  username: '2******3',
                  rateTime: 1469271264000,
                  rateType: 1,
                  text: '很一般啊',
                  avatar:
                    'http://static.galileo.xiaojukeji.com/static/tms/default_header.png'
                },
                {
                  username: '3******b',
                  rateTime: 1469261964000,
                  rateType: 0,
                  text: '',
                  avatar:
                    'http://static.galileo.xiaojukeji.com/static/tms/default_header.png'
                }
              ],
              icon:
                'http://fuss10.elemecdn.com/f/28/a51e7b18751bcdf871648a23fd3b4jpeg.jpeg?imageView2/1/w/114/h/114',
              image:
                'http://fuss10.elemecdn.com/f/28/a51e7b18751bcdf871648a23fd3b4jpeg.jpeg?imageView2/1/w/750/h/750'
            },
            {
              name: '牛肉馅饼',
              price: 14,
              oldPrice: '',
              description: '',
              sellCount: 114,
              rating: 91,
              info: '',
              ratings: [
                {
                  username: '3******c',
                  rateTime: 1469281964000,
                  rateType: 1,
                  text: '难吃不推荐',
                  avatar:
                    'http://static.galileo.xiaojukeji.com/static/tms/default_header.png'
                },
                {
                  username: '2******3',
                  rateTime: 1469271264000,
                  rateType: 0,
                  text: '',
                  avatar:
                    'http://static.galileo.xiaojukeji.com/static/tms/default_header.png'
                },
                {
                  username: '3******b',
                  rateTime: 1469261964000,
                  rateType: 0,
                  text: '',
                  avatar:
                    'http://static.galileo.xiaojukeji.com/static/tms/default_header.png'
                }
              ],
              icon:
                'http://fuss10.elemecdn.com/d/b9/bcab0e8ad97758e65ae5a62b2664ejpeg.jpeg?imageView2/1/w/114/h/114',
              image:
                'http://fuss10.elemecdn.com/d/b9/bcab0e8ad97758e65ae5a62b2664ejpeg.jpeg?imageView2/1/w/750/h/750'
            },
            {
              name: '招牌猪肉白菜锅贴/10个',
              price: 17,
              oldPrice: '',
              description: '',
              sellCount: 101,
              rating: 78,
              info: '',
              ratings: [
                {
                  username: '3******c',
                  rateTime: 1469281964000,
                  rateType: 1,
                  text: '不脆,不好吃',
                  avatar:
                    'http://static.galileo.xiaojukeji.com/static/tms/default_header.png'
                },
                {
                  username: '2******3',
                  rateTime: 1469271264000,
                  rateType: 0,
                  text: '',
                  avatar:
                    'http://static.galileo.xiaojukeji.com/static/tms/default_header.png'
                },
                {
                  username: '3******b',
                  rateTime: 1469261964000,
                  rateType: 0,
                  text: '',
                  avatar:
                    'http://static.galileo.xiaojukeji.com/static/tms/default_header.png'
                }
              ],
              icon:
                'http://fuss10.elemecdn.com/7/72/9a580c1462ca1e4d3c07e112bc035jpeg.jpeg?imageView2/1/w/114/h/114',
              image:
                'http://fuss10.elemecdn.com/7/72/9a580c1462ca1e4d3c07e112bc035jpeg.jpeg?imageView2/1/w/750/h/750'
            },
            {
              name: '糊塌子',
              price: 10,
              oldPrice: '',
              description: '',
              sellCount: 80,
              rating: 93,
              info: '',
              ratings: [
                {
                  username: '3******c',
                  rateTime: 1469281964000,
                  rateType: 0,
                  text: '',
                  avatar:
                    'http://static.galileo.xiaojukeji.com/static/tms/default_header.png'
                },
                {
                  username: '2******3',
                  rateTime: 1469271264000,
                  rateType: 0,
                  text: '',
                  avatar:
                    'http://static.galileo.xiaojukeji.com/static/tms/default_header.png'
                },
                {
                  username: '3******b',
                  rateTime: 1469261964000,
                  rateType: 0,
                  text: '',
                  avatar:
                    'http://static.galileo.xiaojukeji.com/static/tms/default_header.png'
                }
              ],
              icon:
                'http://fuss10.elemecdn.com/0/05/097a2a59fd2a2292d08067e16380cjpeg.jpeg?imageView2/1/w/114/h/114',
              image:
                'http://fuss10.elemecdn.com/0/05/097a2a59fd2a2292d08067e16380cjpeg.jpeg?imageView2/1/w/750/h/750'
            }
          ]
        },
        {
          name: '特色粥品',
          type: -1,
          foods: [
            {
              name: '皮蛋瘦肉粥',
              price: 10,
              oldPrice: '',
              description: '咸粥',
              sellCount: 229,
              rating: 100,
              ratings: [
                {
                  username: '3******c',
                  rateTime: 1469281964000,
                  rateType: 0,
                  text: '很喜欢的粥',
                  avatar:
                    'http://static.galileo.xiaojukeji.com/static/tms/default_header.png'
                },
                {
                  username: '2******3',
                  rateTime: 1469271264000,
                  rateType: 0,
                  text: '',
                  avatar:
                    'http://static.galileo.xiaojukeji.com/static/tms/default_header.png'
                },
                {
                  username: '3******b',
                  rateTime: 1469261964000,
                  rateType: 1,
                  text: '',
                  avatar:
                    'http://static.galileo.xiaojukeji.com/static/tms/default_header.png'
                }
              ],
              icon:
                'http://fuss10.elemecdn.com/c/cd/c12745ed8a5171e13b427dbc39401jpeg.jpeg?imageView2/1/w/114/h/114',
              image:
                'http://fuss10.elemecdn.com/c/cd/c12745ed8a5171e13b427dbc39401jpeg.jpeg?imageView2/1/w/750/h/750'
            },
            {
              name: '南瓜粥',
              price: 9,
              oldPrice: '',
              description: '甜粥',
              sellCount: 91,
              rating: 100,
              info: '',
              ratings: [
                {
                  username: '3******c',
                  rateTime: 1469281964000,
                  rateType: 0,
                  text: '',
                  avatar:
                    'http://static.galileo.xiaojukeji.com/static/tms/default_header.png'
                },
                {
                  username: '2******3',
                  rateTime: 1469271264000,
                  rateType: 0,
                  text: '',
                  avatar:
                    'http://static.galileo.xiaojukeji.com/static/tms/default_header.png'
                },
                {
                  username: '3******b',
                  rateTime: 1469261964000,
                  rateType: 0,
                  text: '',
                  avatar:
                    'http://static.galileo.xiaojukeji.com/static/tms/default_header.png'
                }
              ],
              icon:
                'http://fuss10.elemecdn.com/8/a6/453f65f16b1391942af11511b7a90jpeg.jpeg?imageView2/1/w/114/h/114',
              image:
                'http://fuss10.elemecdn.com/8/a6/453f65f16b1391942af11511b7a90jpeg.jpeg?imageView2/1/w/750/h/750'
            },
            {
              name: '红豆薏米美肤粥',
              price: 12,
              oldPrice: '',
              description: '甜粥',
              sellCount: 86,
              rating: 100,
              info: '',
              ratings: [
                {
                  username: '3******c',
                  rateTime: 1469281964000,
                  rateType: 0,
                  text: '',
                  avatar:
                    'http://static.galileo.xiaojukeji.com/static/tms/default_header.png'
                },
                {
                  username: '2******3',
                  rateTime: 1469271264000,
                  rateType: 0,
                  text: '',
                  avatar:
                    'http://static.galileo.xiaojukeji.com/static/tms/default_header.png'
                },
                {
                  username: '3******b',
                  rateTime: 1469261964000,
                  rateType: 0,
                  text: '',
                  avatar:
                    'http://static.galileo.xiaojukeji.com/static/tms/default_header.png'
                }
              ],
              icon:
                'http://fuss10.elemecdn.com/d/22/260bd78ee6ac6051136c5447fe307jpeg.jpeg?imageView2/1/w/114/h/114',
              image:
                'http://fuss10.elemecdn.com/d/22/260bd78ee6ac6051136c5447fe307jpeg.jpeg?imageView2/1/w/750/h/750'
            },
            {
              name: '红枣山药糙米粥',
              price: 10,
              oldPrice: '',
              description: '',
              sellCount: 81,
              rating: 91,
              info: '',
              ratings: [
                {
                  username: '3******c',
                  rateTime: 1469281964000,
                  rateType: 0,
                  text: '',
                  avatar:
                    'http://static.galileo.xiaojukeji.com/static/tms/default_header.png'
                },
                {
                  username: '2******3',
                  rateTime: 1469271264000,
                  rateType: 0,
                  text: '',
                  avatar:
                    'http://static.galileo.xiaojukeji.com/static/tms/default_header.png'
                },
                {
                  username: '3******b',
                  rateTime: 1469261964000,
                  rateType: 0,
                  text: '',
                  avatar:
                    'http://static.galileo.xiaojukeji.com/static/tms/default_header.png'
                }
              ],
              icon:
                'http://fuss10.elemecdn.com/9/b5/469d8854f9a3a03797933fd01398bjpeg.jpeg?imageView2/1/w/114/h/114',
              image:
                'http://fuss10.elemecdn.com/9/b5/469d8854f9a3a03797933fd01398bjpeg.jpeg?imageView2/1/w/750/h/750'
            },
            {
              name: '鲜蔬菌菇粥',
              price: 11,
              oldPrice: '',
              description: '咸粥',
              sellCount: 56,
              rating: 100,
              info: '',
              ratings: [
                {
                  username: '3******c',
                  rateTime: 1469281964000,
                  rateType: 0,
                  text: '',
                  avatar:
                    'http://static.galileo.xiaojukeji.com/static/tms/default_header.png'
                },
                {
                  username: '2******3',
                  rateTime: 1469271264000,
                  rateType: 0,
                  text: ''
                },
                {
                  username: '3******b',
                  rateTime: 1469261964000,
                  rateType: 0,
                  text: '',
                  avatar:
                    'http://static.galileo.xiaojukeji.com/static/tms/default_header.png'
                }
              ],
              icon:
                'http://fuss10.elemecdn.com/e/a3/5317c68dd618929b6ac05804e429ajpeg.jpeg?imageView2/1/w/114/h/114',
              image:
                'http://fuss10.elemecdn.com/e/a3/5317c68dd618929b6ac05804e429ajpeg.jpeg?imageView2/1/w/750/h/750'
            },
            {
              name: '田园蔬菜粥',
              price: 10,
              oldPrice: '',
              description: '咸粥',
              sellCount: 33,
              rating: 100,
              info: '',
              ratings: [
                {
                  username: '3******c',
                  rateTime: 1469281964000,
                  rateType: 0,
                  text: '',
                  avatar:
                    'http://static.galileo.xiaojukeji.com/static/tms/default_header.png'
                },
                {
                  username: '2******3',
                  rateTime: 1469271264000,
                  rateType: 0,
                  text: '',
                  avatar:
                    'http://static.galileo.xiaojukeji.com/static/tms/default_header.png'
                },
                {
                  username: '3******b',
                  rateTime: 1469261964000,
                  rateType: 0,
                  text: '',
                  avatar:
                    'http://static.galileo.xiaojukeji.com/static/tms/default_header.png'
                }
              ],
              icon:
                'http://fuss10.elemecdn.com/a/94/7371083792c19df00e546b29e344cjpeg.jpeg?imageView2/1/w/114/h/114',
              image:
                'http://fuss10.elemecdn.com/a/94/7371083792c19df00e546b29e344cjpeg.jpeg?imageView2/1/w/750/h/750'
            }
          ]
        }
      ],
      clickedFood: {},
      listHeight: [],
      scrollY: 0,
      foodsList: {} //减少this.$refs.foodList调用？
    }
  },
  created() {
    this.classMap = ['decrease', 'discount', 'special', 'invoice', 'guarantee']
    // axios.get('/api/goods').then(response => {
    //   if (response.status === 200) {
    //     this.goods = response.data.data
    this.$nextTick(() => {
      //页面数据变化后执行
      this._initScroll()
      this._calculateHeight()
    })
    //   }
    // })
  },
  computed: {
    currentIndex() {
      for (let i = 0; i < this.listHeight.length; i++) {
        //good滑动绑定事件设置this.scrollY
        if (
          !this.listHeight[i + 1] ||
          (this.scrollY >= this.listHeight[i] &&
            this.scrollY < this.listHeight[i + 1])
        ) {
          this._menuFollow(i)
          return i
        }
      }
      return 0
    },
    //
    foodsInCart() {
      let foods = []
      this.goods.forEach(good => {
        good.foods.forEach(food => {
          if (food.count) {
            foods.push(food)
          }
        })
      })
      return foods
    }
  },
  methods: {
    _initScroll() {
      if (!this.meunScroll) {
        this.meunScroll = new BScroll(this.$refs.menuWrapper, {
          click: true
        })
      }
      if (!this.goodsScroll) {
        this.goodsScroll = new BScroll(this.$refs.goodsWrapper, {
          click: true, //插件会去掉点击事件，click:true加上点击事件
          probeType: 3
        })
      }
      this.goodsScroll.on('scroll', pos => {
        // 判断滑动方向，避免下拉时分类高亮错误（如第一分类商品数量为1时，下拉使得第二分类高亮）
        if (pos.y <= 0) {
          this.scrollY = Math.abs(Math.round(pos.y))
        }
      })
    },
    _calculateHeight() {
      //计算每类商品title的位置高度
      this.foodsList = this.$refs.foodsList
      //   this.foodsList = document.getElementsByClassName('goods-list')
      let height = 0
      this.listHeight.push(height)
      for (let i = 0; i < this.foodsList.length; i++) {
        height += this.foodsList[i].clientHeight
        this.listHeight.push(height)
      }
    },
    _menuFollow(index) {
      let menuList = this.$refs.menuList
      this.meunScroll.scrollToElement(menuList[index], 300, 0, -100)
    },
    clickFood(food, event) {
      if (!event._constructed) {
        //event._constructed==true则为better-scroll派发的事件
        return
      }
      this.clickedFood = food
      this.$refs.food.show()
    },
    clickMenu(index, event) {
      if (!event._constructed) {
        return
      }
      //   let foodList=this.$refs.foodList//每次都取？
      this.goodsScroll.scrollToElement(this.foodsList[index], 300)
    },
    //传给shopcart.vue
    addFood(target) {
      this.$nextTick(() => {
        this.$refs.shopcart.drop(target)
      })
    }
  },
  components: {
    cartcontrol: cartcontrol,
    shopcart: shopcart,
    food: food
  }
}
</script>
<style lang="stylus">
$font = 12px;
$title = 14px;
.goods
  width 100%;
  display flex;
  position absolute;
  top 174px;
  bottom 46px;
  overflow hidden;
  .menu-wrapper
    flex 0 0 80px;
    width 80px;
    background #f3f5f7;
    .menu-item
      padding 0 12px;
      display table;
      height 54px;
      width 56px;
      // display flex;
      // align-items center; //border跟着text不跟menuitem
      &.current
        background #fff;
        margin-top -1px;
      .item-border
        display table-cell;
        vertical-align middle;
        font-weight bold;
        font-size $font;
        line-height $font; // 和font-size不一致图片和文字会不等高
        // width 56px;
        // position relative;
        // &::after
        // position absolute;
        // top 0;
        // left 0;
        // display block;
        // content '';
        // width 100%;
        border-bottom 1px solid rgba(7, 17, 27, 0.1);
        .icon
          display inline-block;
          vertical-align top;
        .icon
          margin-right 2px;
          width $font;
          height $font;
          background-size $font $font;
          background-repeat no-repeat;
          &.decrease
            background-image url('~static/img/decrease@3x.png');
          &.discount
            background-image url('~static/img/discount@3x.png');
          &.gurantee
            background-image url('~static/img/guarantee@3x.png');
          &.invoice
            background-image url('~static/img/invoice@3x.png');
          &.special
            background-image url('~static/img/special@3x.png');
  .goods-wrapper
    flex 1; // 占据剩下页面
    // overflow auto;有better-scroll插件不需要显示滑块
    .goods-list
      >ul
        li:first-child
          &:after
            border none;
    .list-title
      background #f3f5f7;
      color rgb(147, 153, 159);
      font-size $font;
      border-left 2px solid #d9dde1;
      padding-left 14px;
      height 26px;
      line-height 26px;
    .food-item
      position relative;
      margin 18px;
      margin-top 0;
      padding-top 18px;
      font-size 0;
      display flex; // 商品详情占剩下
      &:after
        display block;
        width 100%;
        border-bottom 1px solid rgba(7, 17, 27, 0.1);
        position absolute;
        top 0;
        left 0;
        content '';
      img
        margin-right 10px;
      .food-wrapper
        display inline-block;
        vertical-align top;
        flex 1; // 占剩下
        .title
          font-size $title;
          line-height $title;
          color #07111b;
          margin 2px 0 8px 0;
        .des, .extra
          font-size $title - 4;
          line-height $title - 4;
          color #93999f;
          &.mar-bottom
            margin-bottom 8px;
        .extra
          .sellcount
            padding-right 10px;
        .price
          line-height 2 * $font;
          .now, .old
            vertical-align middle;
            display inline-block;
          .now
            color #f01414;
            font-size $title;
            margin-right 4px;
            list-style $title;
          .old
            color #93999f;
            font-size $title - 4;
            line-height $title - 4;
            text-decoration line-through;
        .cartcontrol-wrapper
          position absolute;
          bottom -2px;
          right 0;
</style>
