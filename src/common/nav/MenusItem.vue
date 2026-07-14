<template>
  <template v-for="menu of navList" :key="menu.path">
    <li v-if="menu.children && menu.children.length>0" :class="activeIndex===menu.path?'active':''">
      <a :href="menu.path">
        <i :class="menu.icon || (menu.meta && menu.meta.icon)"></i> {{ menu.label || (menu.meta && menu.meta.title) }}
      </a>
      <ul class="sub-menu">
        <MenusItem :navList="menu.children"/>
      </ul>
    </li>
    <li v-else :class="activeIndex===menu.path?'active':''">
      <a :href="menu.path">
        <i :class="menu.icon || (menu.meta && menu.meta.icon)"></i>
        {{ menu.label || (menu.meta && menu.meta.title) }}
      </a>
    </li>
  </template>
</template>
<script setup lang="ts">
import {computed} from "vue";
import {useRoute} from "vue-router";

defineProps(["navList"])
const route=useRoute()

const activeIndex = computed(() => {
  const {path} = route;
  return path;
})
</script>
<style scoped lang="scss">
</style>
<style src="@/assets/style/main.css" scoped></style>
