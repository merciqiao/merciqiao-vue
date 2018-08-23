import Vue from 'vue'
import Router from 'vue-router'

Vue.use(Router)

const router = new Router({
  routes: [{
    path: '/',
    redirect: '/index'
  },
  {
    path: '/',
    component: resolve => require(['@/components/common/Home.vue'], resolve),
    meta: {
      title: '自述文件'
    },
    children: [{
      path: '/index',
      component: resolve => require(['@/components/index.vue'], resolve),
      meta: {
        title: '系统首页'
      }
    },
    {
      path: '/searchinput',
      component: resolve => require(['@/components/searchinput/searchinput.vue'], resolve),
      meta: {
        title: '查询输入页'
      }
    },
    {
      path: '/tabpage',
      component: resolve => require(['@/components/tabpage/tabpage.vue'], resolve),
      meta: {
        title: '标签选项卡'
      }
    },
    {
      path: '/tablepage',
      component: resolve => require(['@/components/tablepage/tablepage.vue'], resolve),
      meta: {
        title: '综合表格页'
      }
    }
    ]
  }
  ],
  mode: 'history'
});

export default router
