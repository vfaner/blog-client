<template>
  <el-container class="layout">
    <el-aside class="aside">
      <MenuBar />
    </el-aside>
    <el-container>
      <el-header class="header">
        <Header />
      </el-header>
      <el-main class="main">
        <Tabs />
        <router-view />
      </el-main>
<!--      <el-footer class="footer">-->
<!--        <Footer />-->
<!--      </el-footer>-->
    </el-container>
  </el-container>
</template>

<script setup lang="ts">
//setup语法糖中，引入的组件可以直接使用，无需再通过components进行注册
import Header from '@/layout/header/Header.vue'
import Footer from '@/layout/footer/Footer.vue'
import MenuBar from "@/layout/menu/MenuBar.vue";
import Tabs from "@/layout/tabs/Tabs.vue";
</script>

<style lang="scss" scoped>
.layout {
  height: 100%;

  .header {
    //background-color: aquamarine;
    height: 50px;
    border-bottom: 1px solid #e5e5e5;
    display: flex;
    align-items: center;
  }

  .aside {
    background-color: rgb(48, 65, 86);
    width:auto
  }

  .main {
    //background-color: #8c939d;
    padding-top: 0px;
  }

  .footer {
    background-color: #66b1ff;
  }
}
</style>
