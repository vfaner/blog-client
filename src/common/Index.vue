<template>
<!--  <el-container class="layout">-->
<!--    <el-container>-->
<!--      <el-header class="header">-->
<!--        <ComHeader />-->
<!--      </el-header>-->
<!--      <el-main class="main">-->
<!--        <router-view v-if="isRouterActive" />-->
<!--      </el-main>-->
<!--    </el-container>-->
<!--  </el-container>-->
  <div>
    <HomeTop />
    <div style="margin-top: 80px"></div>
    <el-main class="main">
      <router-view v-if="isRouterActive" />
    </el-main>
    <HomeBottom />
  </div>
</template>

<script setup lang="ts">
//setup语法糖中，引入的组件可以直接使用，无需再通过components进行注册

import { ref, provide, nextTick } from 'vue'
import HomeTop from "@/common/HomeView/HomeTop.vue";
import HomeBottom from "@/common/HomeView/HomeBottom.vue";
const isRouterActive = ref(true)
provide('reload', () => {
  isRouterActive.value = false
  nextTick(() => {
    isRouterActive.value = true
  })
})
</script>

<style lang="scss" scoped>
.el-main{
  padding-top: 0 !important;
  padding-left: 0 !important;
  padding-right: 0 !important;
}
</style>

