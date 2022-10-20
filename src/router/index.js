import Vue from 'vue'
import Router from 'vue-router'
import Home from "../view/Home"
import test from "../components/test"
//import one from "../view/one"

Vue.use(Router)

export default new Router({
  routes: [
    {
      path: '/',
      name: 'home',
      component: Home
    },
    {
      path: '/test',
      name: 'test',
      component:test
    },
    {
      path: '/home',
      name: 'home',
      component:Home
    },
  ]
})
