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
          path: '/dataManagement',
          component: () => import('@/page/dataManagement/index.vue'),
          meta: { title: '医院' },
          redirect: '/dataManagement/hospital',  // 该配置是若点击选择一级菜单时，默认选中并跳转到该一级菜单下的第一个二级菜单
          children:[
            {
              path: 'hospital',
              component: () => import('@/page/dataManagement/hospital.vue'),
              meta: { title: '医院' },
            },
            {
              path: 'campus',
              component: () => import('@/page/dataManagement/campus.vue'),
              meta: { title: '院区' },
            },
            {
              path: 'department',
              component: () => import('@/page/dataManagement/department.vue'),
              meta: { title: '科室' },
            },
            {
              path: 'users',
              component: () => import('@/page/dataManagement/users.vue'),
              meta: { title: '用户' },
            },
            {
              path: 'type',
              component: () => import('@/page/dataManagement/type.vue'),
              meta: { title: '类型' },
            },
           {
              path: 'location',
              component: () => import('@/page/dataManagement/location.vue'),
              meta: { title: '位置' },
            },
           {
              path: 'device',
              component: () => import('@/page/dataManagement/device.vue'),
              meta: { title: '类型' },
            },
          ]
        },
      ]
    },
    {
      path: '/login',
      component: () => import('@/login/login.vue'),
      meta: {title:'登录'}
    }
    
  ]
})
