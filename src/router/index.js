import Vue from 'vue'
import VueRouter from 'vue-router'


Vue.use(VueRouter);
const router = new VueRouter({
  routes: [
    //  {
    //   path: '/',
    //   redirect: '/pkhome'
    // },
    {
      path: '/',
      component: resolve => require(['../components/ycy/ttcy.vue'], resolve)
    },
    {
      path: '/pkhome',
      component: resolve => require(['../components/ycy/pkhome.vue'], resolve)
    },
    {
      path: '/bang',
      component: resolve => require(['../components/ycy/bang.vue'], resolve)
    },
    {
      path: '/bangtotal',
      component: resolve => require(['../components/ycy/bangtotal.vue'], resolve)
    },
    {
      path: '/bangnav',
      component: resolve => require(['../components/ycy/bangnav.vue'], resolve)
    },
     {
      path: '/speedbang',
      component: resolve => require(['../components/ycy/speedbang.vue'], resolve)
    },
    {
      path: '/daybang',
      component: resolve => require(['../components/ycy/daybang.vue'], resolve)
    },
     {
      path: '/liuyan',
      component: resolve => require(['../components/ycy/liuyan.vue'], resolve)
    },
     {
      path: '/jiemi',
      component: resolve => require(['../components/ycy/jiemi.vue'], resolve)
    },
     {
      path: '/pklist',
      component: resolve => require(['../components/ycy/pklist.vue'], resolve)
    },

       {
      path: '/test',
      component: resolve => require(['../components/ycy/test.vue'], resolve)
    },
    {
      path: '*',
      redirect: '/'
    }
  ],
  mode: 'history'
});

//不需要登录认证的路由
var notLimitRoutes=['/ttcy','/bang'];
//全局路由守卫
// router.beforeEach((to, from, next) => {
  
//   console.log('跳转到:', to.fullPath);
//   if (notLimitRoutes.indexOf(to.path)!=-1) {
//     next();
//   }
//   else {
//     next({ path: '/ttcy' })
//     var token = sessionStorage.getItem('token');
//     //如果没登录,都导向登录页
//     if (!token) {
//       if (to.path !== '/login') {
//         next({ path: '/login' })
//       }
//       else {
//         next();
//       }
//     }
//     else {
//       next();
//     }
//   }

// })

export default router
