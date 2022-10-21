<template>
  <div class="index">
    <!-- 一级菜单下面所拥有的二级菜单 -->
    <el-aside>
      <!--3、使用子组件 左边itemList是子组件中定义的容器用来接受父组件穿的值，右边itemList是父组件传的值 -->
      <SideMenu :itemList='itemList'></SideMenu>
    </el-aside>
    <!-- 以及二级菜单所对应的页面 -->
    <el-main>
        <router-view></router-view>
    </el-main>
  </div>
</template>
<script>
//2、在父组件中引入子组件
import SideMenu from '@/components/SideMenu';
export default {
  components: {
    SideMenu
  },
  data(){
    return{
      //1、在父组件中定义要传的值
      itemList: [
        // { path: 'test1-1', title: '二级菜单1-1'},
        // { path: 'test1-2', title: '二级菜单1-2' },
        // { path: 'test1-3', title: '二级菜单1-3' },
         {
            title: '菜单管理',
            children: [
                        { index: 'test1-1', title: '菜单管理' },
                        { index: 'test1-2', title: '内容管理' },
                        { index: 'test1-3', title: '角色管理' }
                      ]
         },
        {
            title: '系统管理',
            children: [
                        {index: 'systemManage',title: '系统设置'}
                      ]
        }
      ]
    }
  }
}
</script>
<style scoped>
</style>
