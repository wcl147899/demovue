<template>
  <div class="login">
    <div class="loginContainer">
      <h2 class="title">安逸医院内部管理系统登录</h2>
      <el-form :model="ruleForm" :rules="rules" ref="ruleForm" label-width="80px" class="demo-ruleForm">
        <el-form-item label="用户名" prop="username">
          <el-input v-model.trim="ruleForm.username" placeholder="请输入用户名" @keyup.enter.native="nextInput"></el-input>
        </el-form-item>
        <el-form-item label="密码" prop="password">
          <el-input id="psw" v-model="ruleForm.password" placeholder="请输入密码" type="password" class="inputpsw" @keyup.enter.native="submitForm('ruleForm')"></el-input>
        </el-form-item>
        <el-form-item>
          <el-button type="primary" @click="submitForm('ruleForm')">登录</el-button>
        </el-form-item>
      </el-form>
    </div>
  </div>
</template>
<script>
import request from '../util/request'
import { mapActions } from "vuex"; // 引入vuex中各个模块的actions
export default {
  data() {
    return {
      ruleForm: {username: "",password: "",type: "",},
      rules: {
        username: [{ required: true, message: "用户名不能为空", trigger: "blur" },],
        password: [{ required: true, message: "请输入活动名称", trigger: "blur" },],
      },
    };
  },
  methods: {
    ...mapActions({ setUserInfo: "setUserInfo" }), //mapaction传值问题
    submitForm(formName) {
      this.$refs[formName].validate((valid) => {
        if (valid) {
          console.log(this.ruleForm.password);
         request.post('/login',{username:this.ruleForm.username,password:this.ruleForm.password}).then(
            // this.$axios({headers:{'Content-Type': 'application/x-www-form-urlencoded'},
            // url: 'http://127.0.0.1/api/v1/login',
            // method: "post",
            // //  data: {username:Qs.stringify(this.ruleForm.username),password:Qs.stringify(this.ruleForm.password)}
            // data: {username:this.ruleForm.username,password:this.ruleForm.password}}).then(
            (response) => {
              console.log("我在登录界面下");
              console.log(response);
              console.log(response.code);
              if (response.code === "200") {
                sessionStorage.setItem("token",JSON.stringify(response.data.token));
                console.log("。。。。。。。。。。。。。。。。");
                this.ruleForm.type = response.data.type;
                this.setUserInfo(this.ruleForm);
                console.log("，，，，，，，，，，，，，，，");
                this.$message({ message: "登录成功！", type: "success" });
                this.$router.push("/");
               } else if (response.code === "10010"){
                this.$message({
                  message:"用户名不存在",
                  type: "error",
                });
              } else {
                this.$message({
                  message:"密码错误",
                  type: "error",
                });
              }
            }
          );
        } else {
          return false;
        }
      });
    },
    nextInput() {
      //document.querySelector("#psw input").focus()不成功，可能是js版本的问题,或者写法有误
      document.querySelector("#psw").focus();
    },
  },
};
</script>
<style lang='stylus-loader' rel='stylesheet/stylus'>
 .login
    .loginContainer
      max-width: 500px
      margin: 90px auto 0 auto
      background-color:#48576a
      padding:25px 30px
      border-radius: 20px
      .title
        font-size: 35px
        text-align: center
        color: rgb(255,255,255)
        font-weight: 900
        margin-bottom: 40px
        padding: 20px 0 10px 0
        letter-spacing: 4px
    .el-form-item__content
      margin-right: 80px
    .el-button
      width:100%
    .el-input
      input
        background-color: rgba(0,0,0,0.1)
        color: #fff
</style>