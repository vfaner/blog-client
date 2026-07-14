<template>
  <MenusItem :navList="navList"/>
</template>
<script setup lang="ts">

//当前路由
import {computed, onMounted} from "vue";
import {useStore} from "@/store";
import MenusItem from "@/common/nav/MenusItem.vue";
import {useRouter} from "vue-router";
const router = useRouter();
//获取展开属性值
const store = useStore();

//菜单数据
const navList = computed(() => {
  console.log(store.getters.getNavList)
  return store.getters.getNavList
})
onMounted(()=>{
    if(store.state.nav.navList.length<=1){

       store.dispatch('getNavList', router)
       // store.dispatch('getSystemConfig')

    }
})
</script>
<style scoped lang="scss">
</style>
