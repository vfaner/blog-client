<template>
  <el-icon class="icons">
    <component :is="status ? Expand : Fold" @click="change"/>
  </el-icon>
</template>
<script setup lang='ts'>
import {computed} from 'vue'
import {Fold, Expand} from '@element-plus/icons-vue';
import {useStore} from "@/store";
//获取展开属性值
const store = useStore();
const status = computed(() => {
  return store.getters.getCollapse
})
const change = () => {
  store.commit('setCollapse', !status.value)
}
</script>
<style scoped lang='scss'>
.icons {
  display: flex;
  align-items: center;
  font-size: 20px;
  color: #303133;
  cursor: pointer;
  margin-right: 15px;
}
</style>
