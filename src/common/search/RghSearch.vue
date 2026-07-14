<template>
  <u-search :config="config" style="margin-left: 20px" @submit="submit"></u-search>
</template>
<script setup lang="ts">
import { ref } from 'vue'

import router from "@/router";
import {SearchConfig} from "undraw-ui";

const config = ref<SearchConfig>({
  keywords: ['工具箱', '源码', '标签', '测试', '哈哈'], // 搜索框关键字滚动
  hotSearchList: [
    '工具箱',
    '源码',
    '标签',
    '博客',
    '测试',
    '完美世界',
    '鬼灭之刃',
    '间谍过家家',
    '武动乾坤',
    '神印王座'
  ] // top10 热门搜索 最多显示10条数据
})

const submit = (val: string) => {
  router.push({name:'article_search',params: {key:val}})
  console.log(val)
  // window.open('/article/keyword/' + val)
}
// const searchBtn = (keyword:string) => {
//   router.push({name:'article_search',params: {key:keyword}})
// }
</script>

<style lang="scss" scoped>
.u-icon {
  display: inline-flex;
  fill: currentColor;
  font-size: inherit;
  color: inherit;
  vertical-align: -.15em;
}
</style>

