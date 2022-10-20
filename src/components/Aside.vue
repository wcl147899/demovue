<template>
<div class="aside">
<el-menu 
  class="el-menu-vertical-demo" 
  :collapse="isCollapse"  
  background-color="#545c64" 
  active-text-color="#B0E0E6"
  text-color="#fff">
  <el-menu-item index="1" @click="navToggle">
    <template>
      <i class="el-icon-location"></i>
      <span slot="title">收起/展开面板</span>
    </template>
   </el-menu-item>
  <el-submenu index="2">
    <template slot="title">
      <i class="el-icon-location"></i>
      <span slot="title">导航一</span>
    </template>
    <el-menu-item-group>
      <span slot="title">分组一</span>
      <el-menu-item index="1-1"><router-link to="test">选项1</router-link></el-menu-item>
      <el-menu-item index="1-2"><router-link to="test">选项二</router-link></el-menu-item>
    </el-menu-item-group>
  </el-submenu>
  <el-menu-item index="3">
    <i class="el-icon-menu"></i>
    <span slot="title">导航二</span>
  </el-menu-item>
</el-menu>
</div>
</template>
<script>
export default {
data() {
      return {
        isCollapse: false
    }
},
methods: {
      navToggle() {
      this.isCollapse = !this.isCollapse;
    }
        },
    }
</script>
<style scoped>
.aside{
  width: 227px;
}
.el-menu-vertical-demo:not(.el-menu--collapse) {
    width: 200px;
    min-height:calc(100vh - 50px);
}
.el-menu-vertical-demo{
  min-height: calc(100vh - 50px);
}


</style>
