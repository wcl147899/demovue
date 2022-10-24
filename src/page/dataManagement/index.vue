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
            title: '组织架构',
            children: [
                        { index: 'hospital', title: '医院' },
                        { index: 'campus', title: '院区' },
                        { index: 'department', title: '科室' },
                        { index: 'users', title: '用户'}
                      ]
         },
        {
            title: '设备管理',
            children: [
                        {index: 'type',title: '类型'},
                        {index: 'location',title: '位置'},
                        {index: 'device',title: '设备'}
                      ]
        }
      ]
    }
  }
}
</script>
<style scoped>
</style>
