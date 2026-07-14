<template>
  <div class="header-bar">
    <div style="display: flex;align-items: center;">
      <Collapse></Collapse>
      <BredCum></BredCum>
    </div>
    <UserInfo></UserInfo>
  </div>
</template>

<script setup lang="ts">
import Collapse from "@/layout/header/Collapse.vue";
import BredCum from "@/layout/header/BredCum.vue";
import UserInfo from "@/views/system/user/UserInfo.vue";
</script>

<style lang="scss" scoped>
.header-bar {
  display: flex;
  align-items: center;
  justify-content: space-between;
  width: 100%;
  height: 100%;
}
</style>
