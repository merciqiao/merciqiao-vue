import Vue from 'vue'
import Router from 'vue-router'

Vue.use(Router)

const router = new Router({
  routes: [
    {
      path: '/',
      redirect: '/login'
    },
    {
      path: '/login',
      component: resolve => require(['@/components/login.vue'], resolve),
      meta: {
        title: '登陆'
      }
    },
    {
      path: '/',
      component: resolve => require(['@/components/common/Home.vue'], resolve),
      meta: {
        title: '自述文件'
      },
      children: [{
        name: 'index',
        path: '/index',
        component: resolve => require(['@/components/index.vue'], resolve),
        meta: {
          title: '系统首页'
        }
      },
      {
        name: 'searchinput',
        path: '/searchinput',
        component: resolve => require(['@/components/searchinput/searchinput.vue'], resolve),
        meta: {
          title: '查询输入页'
        }
      },
      {
        name: 'tabpage',
        path: '/tabpage',
        component: resolve => require(['@/components/tabpage/tabpage.vue'], resolve),
        meta: {
          title: '标签选项卡'
        }
      },
      {
        name: 'tablepage',
        path: '/tablepage',
        component: resolve => require(['@/components/tablepage/tablepage.vue'], resolve),
        meta: {
          title: '综合表格页'
        }
      }
        ,
      {
        name: 'formpage',
        path: '/formpage',
        component: resolve => require(['@/components/formpage/formpage.vue'], resolve),
        meta: {
          title: '表单页'
        }
      }
        ,
      {
        name: 'treepage',
        path: '/treepage',
        component: resolve => require(['@/components/treepage/treepage.vue'], resolve),
        meta: {
          title: '树组件页'
        }
      },
      {
        name: 'OrganizationTree',
        path: '/organizationTree',
        component: resolve => require(['@/components/admin/OrganizationTree.vue'], resolve),
        meta: { title: '机构管理' }
      },
      {
        name: 'SysUser',
        path: '/sysUser',
        component: resolve => require(['@/components/admin/SysUser.vue'], resolve),
        meta: { title: '用户管理' }
      },
      {
        name: 'SysAcl',
        path: '/sysAcl',
        component: resolve => require(['@/components/admin/SysAcl.vue'], resolve),
        meta: { title: '角色资源管理' }
      },
      {
        name: 'SysMenu',
        path: '/sysMenu',
        component: resolve => require(['@/components/admin/SysMenu.vue'], resolve),
        meta: { title: '菜单管理' }
      },
      {
        name: 'SysResource',
        path: '/sysResource',
        component: resolve => require(['@/components/admin/SysResource.vue'], resolve),
        meta: { title: '资源管理' }
      },
      {
        name: 'SysRole',
        path: '/sysRole',
        component: resolve => require(['@/components/admin/SysRole.vue'], resolve),
        meta: { title: '角色管理' }
      }
      ]
    },
    {
      path: '/404',
      component: resolve => require(['../components/common/404.vue'], resolve)
    },
    {
      path: '/403',
      component: resolve => require(['../components/common/403.vue'], resolve)
    },
    {
      path: '*',
      redirect: '/404'
    }
  ],
  mode: 'history'
});

export default router
