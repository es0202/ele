import Vue from 'vue'
import Router from 'vue-router'
import HelloWorld from '@/components/HelloWorld'
import goods from '@/components/good/good'
import comments from '@/components/comment/comment'
import seller from '@/components/seller/seller'

const path = require('path')
Vue.use(Router)

export default new Router({
  base: 'element',
  routes: [{
      path: '/',
      name: 'goods',
      component: goods
    },
    {
      path: '/goods',
      name: 'goods',
      component: goods,
    },
    {
      path: '/comments',
      name: 'comments',
      component: comments,
    },
    {
      path: '/seller',
      name: 'seller',
      component: seller
    }
  ]
})
