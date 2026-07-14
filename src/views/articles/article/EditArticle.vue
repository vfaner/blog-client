<template>
  <div style="margin-top: 2%">
    <el-card class="box-card">
      <template #header>
        <div class="card-header">
          <span v-text="articleData.type==='1'? '编辑文章': '新增文章'"></span>
          <el-button type="primary" @click="onSubmit">提交</el-button>
        </div>
      </template>
      <el-form label-position="left" ref="addArticleForm"
               :rules="rules" :model="articleData" label-width="80px"
      >
        <el-form-item label="文章标题">
          <el-input v-model="articleData.title"/>
        </el-form-item>
        <el-row :gutter="10">
         <el-col  :span="18">
           <tinymce-editor v-model="articleData.content" @getContent="getContent"></tinymce-editor>
         </el-col>
         <el-col :span="6">

           <el-form-item label="文章分类">
             <el-select
                 v-model="articleData.categories"
                 multiple
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
           <el-form-item label="状态">
             <el-switch v-model="articleData.state" active-text="发布" inactive-text="草稿"/>
           </el-form-item>
           <el-form-item label="缩略图">
             <el-input v-model="articleData.cover"/>
           </el-form-item>
           <div align="center">
             <el-image style="width: 120px; height: 85px" fit="contain" :src="articleData.cover"/>
           </div>
           <el-form-item label="开启下载">
             <el-switch v-model="articleData.downloadEnable"/>
           </el-form-item>
           <template v-if="articleData.downloadEnable">
             <el-form-item label="附件名称">
               <el-input v-model="articleData.downloadName" placeholder="如：安装包.zip"/>
             </el-form-item>
             <el-form-item label="下载地址">
               <el-input v-model="articleData.downloadUrl" placeholder="https://..."/>
             </el-form-item>
             <el-form-item label="附件大小">
               <el-input v-model="articleData.downloadSize" placeholder="如：1.6M"/>
             </el-form-item>
             <el-form-item label="附件描述">
               <el-input v-model="articleData.downloadDesc" type="textarea" :rows="2" placeholder="附件说明"/>
             </el-form-item>
           </template>
         </el-col>
        </el-row>

        <!--            <tinymce-editor :value="formData.field111" @getContent="getContent" :modelValue="addModel.content"></tinymce-editor>-->
      </el-form>


    </el-card>
  </div>
</template>
<script setup lang="ts">
import TinymceEditor from '@/components/edit/TinymceEditor.vue'
import {onMounted} from "vue";
import useGetArticle from "@/composables/article/userGetArticle";
import useArticle from "@/composables/article/useArticle";
const {save,rules} = useArticle();
const {articleData, cateList,tagList} = useGetArticle();
const getContent = (v: string) => {
  console.log(v)
}

const onSubmit = () => {
  console.log("type="+articleData.type)
  save(articleData)
}
onMounted(() => {
  // userGetArticle 内部已根据 route.query.id 加载文章数据
})
</script>
<style scoped lang="scss">
.card-header {
  display: flex;
  justify-content: space-between;
  align-items: center;
}

.text {
  font-size: 14px;
}

.item {
  margin-bottom: 18px;
}

.box-card {
  width: 100%;
}
</style>

