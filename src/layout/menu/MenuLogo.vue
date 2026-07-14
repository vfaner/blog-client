<template>
  <div class="logo" v-if="!status">
    <img src="https://wpimg.wallstcn.com/69a1c46c-eb1c-4b46-8bd4-e9e686ef5251.png" alt="logo"/>
    <span class="title">超级博客</span>
  </div>
</template>
<script setup lang="ts">
import {useStore} from "@/store";
import {computed} from "vue";
//获取展开属性值
const store = useStore();
const status = computed(() => {
  return store.getters.getCollapse
})
</script>
<style lang="scss" scoped>
.logo {
  background-color: #2b2f3a;
  height: 50px;
  border: none;
  line-height: 50px;
  display: flex;
  align-items: center;
  padding-left: 15px;
  color: #fff;

  img {
    width: 32px;
    height: 32px;
    margin-right: 12px;
  }

  span {
    font-weight: 600;
    line-height: 50px;
    font-size: 16px;
    font-family: Avenir, Helvetica Neue, Arial, Helvetica, sans-serif;
    vertical-align: middle;
  }
}
</style>
