<template>
  <div class="index">
    <!-- 一级菜单下面所拥有的二级菜单 -->
    <el-aside>
      <SideMenu :itemList='itemList'></SideMenu>
    </el-aside>
    <!-- 以及二级菜单所对应的页面 -->
    <el-main>
        <router-view></router-view>
    </el-main>
  </div>
</template>

<script>
import SideMenu from '@/components/SideMenu';
export default {
  components: {
    SideMenu
  },
  data(){
    return{
      itemList: [
        { path: 'test1-1', title: '二级菜单1-1' },
        { path: 'test1-2', title: '二级菜单1-2' },
        { path: 'test1-3', title: '二级菜单1-3' },
      ]
    }
  }
}
</script>
<style scoped>
</style>
