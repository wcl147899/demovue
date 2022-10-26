// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import App from './App'
import router from './router'
import store from './store'
import ElementUI from 'element-ui';
import 'element-ui/lib/theme-chalk/index.css';
import axios from 'axios';
import Blob from './vendor/Blob'
import Export2Excel from './vendor/Export2Excel'
 //import * as echarts from 'echarts'
Vue.use(ElementUI);
Vue.config.productionTip = false
Vue.prototype.$axios = axios;
//Vue.prototype.$echarts = echarts

new Vue({
  el: '#app',
  router,
  store,
  components: { App },
  template: '<App/>'
})
