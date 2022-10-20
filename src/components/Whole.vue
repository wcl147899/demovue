<template>
  <div class="wrapper">
    <Header></Header>
    <!-- 页面左侧二级菜单栏，和主体内容区域部分 -->
    <el-main>
      <router-view></router-view>
    </el-main>
  </div>
</template>

<script>
import Header from './Header.vue';
export default {
  components: { Header },
  data(){
    return{
    }
  },
  
  methods: {
   
  }
}
</script>

<style scoped>
.wrapper {
  width: 100%;
  height: 100%;
  background: rgb(83, 8, 8);
}
</style>