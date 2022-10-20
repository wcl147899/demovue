<template>
<div class="header">
    <el-dropdown>
        <el-button class="el-button1">
            <div class="wapper">
                <span>张三</span>
                <img id=userPic src="../assets/person.png" alt="user" height="40">
                <i class="el-icon-caret-bottom"></i>
            </div>
        </el-button>

         <el-dropdown-menu>
             <router-link to="home"><el-dropdown-item>首页</el-dropdown-item></router-link>
             <router-link to=""><el-dropdown-item>退出系统</el-dropdown-item></router-link>
          </el-dropdown-menu>
    </el-dropdown>  
</div>
</template>

<script>
export default {
data() {
    return {

    }
},
    methods: {
    },
}
</script>
<style>
.header{
    height:50px;
    /* 保持和内容的距离 */
    padding: 0 20px;
    background-color:#eef1f6;
    /* line-height和height相等时，文字垂直居中 */
    line-height:50px;
    color: #48576a;
    font-size:12px;
    /* 在头部设置text-align完成按钮的靠右放置，而不是选择对button进行浮动或是定位来完成 */
    text-align: right; 
}
.el-button1{
    /* 按钮不需要和其内部的文字存在距离保持  background:#eef1f6 */
    padding:0;
    background:#eef1f6;
    /* border-color: transparent; */
     border:0px;
    }
.el-button:hover{
    background:#eef1f6; 
}
.wapper{
    /* 为什么不把el-button设置为block，而是把wapper设置成block，
    button本身是行块盒，行块盒不独占一行，可以随着header设置的text-align向右排列，设置成块盒就会在父元素header中靠左独占一行显示 */
    display: block;
    cursor: pointer;
    }
#userPic{
    border-radius: 50%;
    vertical-align: middle;
}

</style>