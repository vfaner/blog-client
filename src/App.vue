<template>
 <router-view/>
</template>
<script setup lang="ts">
import { watch } from "vue";
import { useStore } from "@/store";

const store = useStore();

// 启动时加载系统配置
import { onMounted } from "vue";
onMounted(() => {
  store.dispatch('getSystemConfig').catch(() => {})
})

// 监听系统配置，动态更新 meta + title
watch(() => store.getters.getSysConfig, (config) => {
  if (!config) return;
  const siteName = config.title || '超级博客';
  document.title = siteName;
  const kw = document.getElementById('meta-keywords') as HTMLMetaElement | null;
  if (kw) kw.setAttribute('content', config.keyword || '');
  const desc = document.getElementById('meta-description') as HTMLMetaElement | null;
  if (desc) desc.setAttribute('content', config.description || '');
}, { immediate: true })
</script>
<style></style>
