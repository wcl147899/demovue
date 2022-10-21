<template>
<div class="header">
    <!-- logo -->
    <div class="logo">logo</div>
    <!-- 水平一级菜单 -->
    <div style="float:left;">
        <el-menu 
          mode="horizontal"
          text-color="#000000"
          active-text-color="#3989fa"
          :default-active="toIndex" 
          @select="handleSelect">
          <el-menu-item v-for="(item, index) in itemList" :index="item.path" :key="index">
            <span slot="title">{{ item.title }}</span>
          </el-menu-item>
        </el-menu>
    </div>
    <!-- 用户名下拉菜单 -->
    <div class="header-right">
        <!-- 头像 -->
        <div class="user-avator">
            <img src="../assets/person.png" alt="user"/>
        </div>
        <!-- 用户下拉列表 -->
        <el-dropdown class="user-name" trigger="click" @command="handleCommand">
            <span class="el-dropdown-link">张三<i class="el-icon-caret-bottom"></i></span>
            <el-dropdown-menu slot="dropdown">
              <el-dropdown-item disabled>修改密码</el-dropdown-item>
              <el-dropdown-item command="loginout">退出登录</el-dropdown-item>
            </el-dropdown-menu>
        </el-dropdown>
    </div>   
</div>
</template>
<script>
export default {
data() {
    return {
     itemList: [ // 水平一级菜单栏的菜单
        { path: '/Home', title: '首页' },
        { path: '/test1', title: '一级菜单1'},
      ],
    }
},
 computed: {
    toIndex(){  // 根据路径绑定到对应的一级菜单，防止页面刷新重新跳回第一个
      console.log("我在computedxia");
      console.log(this.$route.path);//默认选中/Home
      return '/' + this.$route.path.split('/')[1];//"/Home"-->['','Home']
    },
  },
methods: {
   handleSelect(path){  // 切换菜单栏
      this.$router.push({
        path: path
      });
      console.log(path);//  /test1
    },
    handleCommand(command){  // 用户名下拉菜单选择事件
      if(command == 'loginout'){
        localStorage.removeItem('ms_username');
        this.$router.push({
            path: '/Login'
        });
      }
    },
    },
}
</script>
<style scoped>
.header {
  /* 为什么要设置成相对定位 */
  position: relative;
  box-sizing: border-box;
  width: 100%;
  height: 70px;
  font-size: 22px;
  background-color: rgb(236, 189, 128);
}
.header .logo {
  float: left;
  margin-left: 60px;
  margin-top: 17.5px;
  height: 29px;
  width: 160px;
  vertical-align: middle;
}
/* --------------- 用户头像区域的样式 ---------------- */
.header-right {
  float: right;
  padding-right: 50px;
}
/* .header-user-con {
  display: flex;
  align-items: center;
  justify-content: center;
  height: 70px;
} */
.user-avator {
  margin-left: 20px;
  float: left;
  margin-top: 15px;
}
.user-avator img {
  display: block;    
  width: 40px;
  height: 40px;
  border-radius: 50%;
}
.user-name {
  margin-left: 10px;
  float: right;
  margin-top: 26px;
}
.el-dropdown-link {
  cursor: pointer;
}
/* .el-dropdown-menu__item {
  text-align: center;
} */
/* --------------- 水平一级菜单栏的样式---------------------   */
.el-menu.el-menu--horizontal {
  border-bottom: none !important;
  float: left;
  margin-left: 50px;
  background: transparent;
}
.el-menu--horizontal > .el-menu-item.is-active {
  /* border-bottom: 2px solid #3989fa;
  color: #3989fa; */
  font-weight: bold;
}
.el-menu--horizontal > .el-menu-item {
  font-size: 16px;
  margin: 0 15px;
}
</style>