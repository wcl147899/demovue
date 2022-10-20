import Vue from 'vue'
import Router from 'vue-router'
Vue.use(Router)

export default new Router({
 routes: [
    {
      path: '/',  // 程序启动默认路由
      component: () => import('@/components/Whole.vue'),
      meta: { title: '整体页面布局' },
      redirect: '/Home',  // 重定向到首页
      children: [
        {
          path: '/Home',
          component: () => import('@/components/Home1.vue'),
          meta: { title: '首页' }
        },
        {
          path: '/test1',
          component: () => import('@/page/test1/index.vue'),
          meta: { title: '一级菜单1' },
          redirect: '/test1/test1-1',  // 该配置是若点击选择一级菜单时，默认选中并跳转到该一级菜单下的第一个二级菜单
          children:[
            {
              path: 'test1-1',
              component: () => import('@/page/test1/test1-1.vue'),
              meta: { title: '二级菜单1-1' },
            },
            {
              path: 'test1-2',
              component: () => import('@/page/test1/test1-2.vue'),
              meta: { title: '二级菜单1-2' },
            },
            {
              path: 'test1-3',
              component: () => import('@/page/test1/test1-3.vue'),
              meta: { title: '二级菜单1-3' },
            },
          ]
        },
       
        
      ]
    },
    
  ]
})
