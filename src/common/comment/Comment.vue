<template>
  <div class="comment-view" style="padding: 0px">
    <u-comment :config="config"
               :show-size="100"
               @submit="submit"
               @like="like"
               @remove="remove"
               @report="report">
      <!-- <template #list-title>全部评论</template> -->
    </u-comment>
  </div>
</template>

<script setup lang="ts">
import useCommentShow from "@/composables/comment/useCommentShow";
import useComment from "@/composables/comment/useComment";

const {config} = useCommentShow();
const {submit, report, like,remove} = useComment(config)
console.log(config)
</script>

<style lang="scss">
.vp-doc ul {
  list-style: none !important;
}

.vp-doc ul,
.vp-doc ol {
  padding-left: 0 !important;
  margin: 0 !important;
}

.vp-doc li + li {
  margin-top: 0px !important;
}
</style>
