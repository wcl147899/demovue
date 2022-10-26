import Vuex from 'vuex'
import Vue from 'vue'
import user from './user'
Vue.use(Vuex)

// 创建并暴露store
export default new Vuex.Store({
    modules: {user}
})
