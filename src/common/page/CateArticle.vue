<template style="background-color: #f6f6f6">
  <div>
    <div style="margin-top: 15px"><span style="font-size: 24px">✌</span><span style="font-size: 24px;color: #303133" v-text="cateWithArticle.cateName"></span></div>
    <div style="margin-bottom: 15px"></div>
    <el-row :gutter="10">
     <el-col :span="16">
       <div v-for="article in cateWithArticle.article" :key="article.id">
         <el-card @click="detail(article.id)" class="box-card" :body-style="{ padding: '0px' }" shadow="hover" style="margin-bottom: 12px;cursor:pointer;">
           <div class="text item">
             <el-row :gutter="8">
               <el-col :span="3">
                 <el-image :src="article.cover ? article.cover : commonImage" fit="contain" />
               </el-col>
               <el-col :span="21" style="padding-top: 8px">
                 <div>
                   <span style="color: #303133" v-text="article.title"></span>
                 </div>
                 <div>
                   <p style="padding-right: 5px;padding-left: 5px;color: #8c939d;font-size: small" class="mb-0" v-text="tran(article.content)">
                   </p>
                 </div>
               </el-col>
             </el-row>
           </div>
         </el-card>
       </div>
     </el-col>
      <el-col :span="8">
       <Aside/>
      </el-col>
    </el-row>
  </div>
</template>
<script setup lang="ts">
import useCategoryArticle from "@/composables/category/useCategoryArticle";
import useCommon from "@/composables/common/useCommon";
import router from "@/router";
import Aside from "@/common/aside/Aside.vue";
const tran=(str:string)=>{
  return str.replace(/<(style|script|iframe)[^>]*?>[\s\S]+?<\/\1\s*>/gi,'').replace(/<[^>]+?>/g,'').replace(/\s+/g,' ').replace(/ /g,' ').replace(/>/g,' ');
}
const {cateWithArticle} = useCategoryArticle();
const {commonImage} = useCommon();

const detail = (id:string) => {
  router.push({name:'detail',query: {id:id}})
}

</script>
<style scoped lang="scss">
.mb-0 {
  display: -webkit-box;
  -webkit-line-clamp: 2;
  -webkit-box-orient: vertical;
  overflow: hidden;
}
</style>
