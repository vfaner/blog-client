<template>
  <word-cloud :tags="tagList" width="600" height="600" radius="250"></word-cloud>
</template>

<script lang="ts" setup>
import WordCloud from "@/components/tag/WordCloud.vue";
import {computed} from "vue";
import {store} from "@/store";

let tagList = computed(() => {
  return store.getters.getTags
})

</script>
