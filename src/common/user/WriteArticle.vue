<template>
  <div class="user-content">
    <div class="user-box">
      <div class="alert alert-info alert-dismissible" id="tipClose" role="alert">
        <button type="button" class="close" data-dismiss="alert" aria-label="Close"><span aria-hidden="true">×</span>
        </button>
        <span>提示：文章作品需提交审核通过才能正式发布，请耐心等待。</span>
      </div>
      <form action="" method="post" name="addlog" id="addlog" class="form-horizontal" enctype="multipart/form-data">
        <div class="form-members">
          <input type="text" v-model="articleData.title" class="members-title" name="post_title" placeholder="文章标题">
          <div id="mceu_12" class="mce-tinymce mce-container mce-panel" hidefocus="1" tabindex="-1" role="application"
               style="visibility: visible; border-width: 1px; width: 100%;"
          >
            <tinymce-editor v-model="articleData.content" @getContent="getContent"></tinymce-editor>
          </div>

          <div class="form-members-v">
            <el-row :gutter="10">
             <el-col :span="12">
               <el-form-item label="文章分类">
                 <el-select
                     v-model="articleData.categories"
                     collapse-tags
                     collapse-tags-tooltip
                     placeholder="请选择分类"
                     style="width: 240px"
                 >
                   <el-option
                       v-for="item in cateList.list"
                       :key="item.id"
                       :label="item.name"
                       :value="item.id"
                   />
                 </el-select>
               </el-form-item>
             </el-col>
             <el-col :span="12">
               <el-form-item label="文章标签">
                 <el-select
                     v-model="articleData.tags"
                     multiple
                     collapse-tags
                     collapse-tags-tooltip
                     placeholder="请选择分类"
                     style="width: 240px"
                 >
                   <el-option
                       v-for="item in tagList.list"
                       :key="item.id"
                       :label="item.name"
                       :value="item.id"
                   />
                 </el-select>
               </el-form-item>
             </el-col>
            </el-row>
            <el-row :gutter="10">
             <el-col :span="12">
               <el-form-item label="状态">
                 <el-switch disabled v-model="articleData.state"/>
               </el-form-item>
             </el-col>
             <el-col :span="12">
               <el-form-item label="缩略图">
                 <el-input v-model="articleData.cover"/>
               </el-form-item>
               <div align="center">
                 <el-image style="width: 120px; height: 85px" fit="contain" :src="articleData.cover"/>
               </div>
             </el-col>
            </el-row>
            <el-row :gutter="10" style="align-content: center">
             <el-col align="middle">
               <el-button @click="onSubmit" type="primary">投稿</el-button>
             </el-col>
            </el-row>
          </div>
        </div>
      </form>
    </div>

  </div>
</template>

<script setup lang="ts">
// @ts-nocheck
import TinymceEditor from '@/components/edit/TinymceEditor.vue'
import useGetArticle from "@/composables/article/userGetArticle";
import useArticle from "@/composables/article/useArticle";
const {save,rules} = useArticle();
const {articleData, cateList,tagList} = useGetArticle();
const onSubmit = () => {
  articleData.type="0"
  console.log("type="+articleData.type)
  save(articleData)
}
const getContent = (v: string) => {
  console.log(v)
}

$(function () {
  $(".close").on('click',function () {
    alert(1)
    $("#tipClose").remove()
  })
})
</script>

<style scoped lang="scss">
</style>
<style src="@/assets/style/main.css" scoped></style>
<style src="@/assets/style/bootstrap.min.css"></style>
