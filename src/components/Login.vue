<template>
<div class="login">
  <el-form ref="form" :model="form" class="container" :rules="rules">
    <el-form-item>
      <div class="avatar">
        <img src="../assets/avatar.jpg" alt="">
        </div>
    </el-form-item>
    <el-form-item prop="username">
      <el-input v-model="form.username" placeholder="账户" prefix-icon="myicon myicon-user"></el-input>
    </el-form-item>
    <el-form-item prop="password">
      <el-input v-model="form.password" placeholder="密码" prefix-icon="myicon myicon-key"></el-input>
    </el-form-item>
    <el-form-item>
      <el-button type="primary" class="login-btn" @click="btnLogin">登录</el-button>
    </el-form-item>
  </el-form>
</div>
</template>

<script>

import { fetch_login } from '@/api/index.js'

export default {
  data() {
    return {
      form: {
        username: 'admin',
        password: '123456'
      },
      rules: {
        username: [{
          required: true,
          message: '请输入用户名',
          trigger: 'blur'
        }],
        password: [{
          required: true,
          message: '请输入密码',
          trigger: 'blur'
        }]
      }
    }
  },
  methods: {
   
    btnLogin() {
      const params = {
        username:this.form.username,
        password:this.form.password
      }
      fetch_login(params).then(res=>{
        console.log(res)
        if(res.data.meta.status === 200){
          
          // 由于后续所有请求都需要用到token,所以需要将token存储到localStorage中
          localStorage.setItem('token',res.data.data.token)

          this.$router.push('/welcome')
        }
      })
    }
  },
  created() {
    console.log('login组件被渲染....')
  }
}
</script>

<style lang ='scss' scoped>
.login {
  position: fixed;
  width: 100%;
  height: 100%;
  background-color: #2f4050;

  .container {
    position: absolute;
    left: 0;
    right: 0;
    width: 400px;
    padding: 0px 40px 15px 40px;
    margin: 200px auto;
    background: white;

    .avatar {
      position: relative;
      left: 50%;
      width: 120px;
      height: 120px;
      margin-left: -60px;
      margin-top: -60px;
      box-sizing: border-box;
      border-radius: 50%;
      border: 10px solid #fff;
      box-shadow: 0 1px 5px #ccc;
      overflow: hidden;
    }

    .login-btn {
      width: 100%;
    }
  }
}
</style>
