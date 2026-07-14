<template style="background-color: #f0f4f5">
  <div style="padding-top: 12px"></div>
  <el-row :gutter="10">
    <el-col
        v-for="data in cateList.list"
        :key="data"
        :span="4"
        style="margin-bottom: 20px"
    >
      <el-card class="box-card" :body-style="{ padding: '0px' }" shadow="hover">
        <div style="padding: 14px;text-align: center">
          <span :style="{color:common.color}" v-text="data.name"></span>
          <div class="bottom">
            <el-button text @click="detail(data.id)" class="button">
              <span style="color: #00ae9d">查看文章</span>
            </el-button>
          </div>
        </div>
      </el-card>
    </el-col>
  </el-row>
</template>
<script setup lang="ts">
import {useRouter} from "vue-router";
import useGetArticle from "@/composables/article/userGetArticle";
import useCommon from "@/composables/common/useCommon";
import {onMounted, watch} from "vue";

const router = useRouter();
const {cateList,getCateList} = useGetArticle();
const {common} = useCommon();

const detail = (id:string) => {
  router.push({name:'cate_article',params: {id:id}})
}
watch(() =>router.currentRoute.value.path,(newValue,oldValue)=> {
  if(newValue!==oldValue){
    router.push(newValue)
  }
},{ immediate: true })
onMounted(()=>{
  getCateList()
  console.log("fen"+cateList)
})
</script>
<style scoped lang="scss">
</style>
