<template>
<div class="home">
  <el-container>
    <!-- 侧边栏 -->
    <el-aside width="auto">
      <div class="logo"></div>
      <el-menu 
      :router='true'
      default-active="2" class="el-menu-admin" :collapse="isCollapse" @open="handleOpen" @close="handleClose" background-color="#545c64" text-color="#fff" active-text-color="#ffd04b">
        <el-submenu :index="item.path" v-for="item in menulist" :key="item.id">
          <template slot="title">
            <i class="el-icon-location"></i>
            <span>{{item.authName}}</span>
          </template>
          <el-menu-item :index="menu.path" v-for="menu in item.children" :key="menu.id">
            <i class="el-icon-menu"></i>
            <span slot="title">{{menu.authName}}</span>
          </el-menu-item>
        </el-submenu>
      </el-menu>
    </el-aside>
    <el-container>
      <!-- header部分 -->
      <el-header>
        <i class="myicon myicon-menu toggle-btn" @click="toggleCollapse"></i>
        <div class="system-title">电商后台管理系统</div>
        <div>
          <span class="welcome">
              您好，xxx
            </span>
          <el-button type="text" @click="logout">退出</el-button>
        </div>
      </el-header>
      <!-- 中间内容部分 -->
      <el-main>
        <router-view></router-view>
      </el-main>
    </el-container>
  </el-container>
</div>
</template>

<script>

import { fetch_menus } from '@/api'

export default {
  
  data() {
    return {
      isCollapse: false,
      menulist:[]
    }
  },
  methods: {
    
    handleOpen(key, keyPath) {
      console.log(key, keyPath)
    },
    handleClose(key, keyPath) {
      console.log(key, keyPath)
    },
    toggleCollapse() {
      this.isCollapse = !this.isCollapse
    },
    logout() {

    },
    menus(){
      fetch_menus().then(res=>{
        this.menulist = res.data.data
        console.log(this.menulist)
      })
    }
  },

  created() {
    console.log('home组件被渲染....')
    this.menus()
  }
}
</script>

<style lang="scss" scoped>
.home {
  height: 100%;

  .el-menu-admin:not(.el-menu--collapse) {
    width: 200px;
    min-height: 400px;
  }

  .el-container {
    height: 100%;
  }

  .el-aside {
    background-color: #545c64;
  }

  .el-header {
    display: flex;
    justify-content: space-between;
    align-items: center;
    background-color: #545c64;
  }

  .logo {
    height: 60px;
    background: url(../assets/logo.png);
    background-size: cover;
    background-color: #989898;
  }

  .toggle-btn {
    font-size: 36px;
    color: #989898;
    cursor: pointer;
    line-height: 60px;
  }

  .system-title {
    font-size: 28px;
    color: white;
  }

  .logout-btn {
    color: orange;
  }

  .system-title {
    font-size: 28px;
    color: white;
  }

  .welcome,
    {
    color: white;
  }
}
</style>
