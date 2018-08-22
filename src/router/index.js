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
      }]
    }
  ],
  mode: 'history'
});

export default router
