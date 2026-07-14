<template>
  <!--  面包屑导航-->
  <el-breadcrumb separator="/">
    <el-breadcrumb-item v-for="item of tabs" :key='item.path' :to="{ path: item.path }">
      {{item.meta.title}}
    </el-breadcrumb-item>

  </el-breadcrumb>
</template>
<script setup lang='ts'>
import {ref, Ref, watch} from 'vue'
import {RouteLocationMatched, useRoute} from "vue-router";
//定义面包屑导航数据
const tabs: Ref<RouteLocationMatched[]> = ref([]);
const route = useRoute();
const getBredCum = () => {
  //获取所有的有meta和title
  let matched = route.matched.filter(item => item.meta && item.meta.title);
  //判断第一个是否是首页，如果不是构造一个
  const first = matched[0];
  if (first.path !== '/dashboard') {
    //构造一个
    matched = [{path: '/dashboard', meta: {title: '首页'}} as any].concat(matched);
  }
  //设置面包屑导航数据
  tabs.value=matched;
}
getBredCum();
//路由发生变化，重新获取面包屑数据
watch(()=>route.path,()=>getBredCum());
</script>
<style scoped lang='scss'>
</style>
