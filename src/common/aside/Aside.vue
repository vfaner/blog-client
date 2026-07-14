<template>
  <div style="margin-bottom: 12px">
    <el-card :body-style="{paddingBottom: '12px'}">
      <div class="text item">
        <rgh-search style="margin-right: 15px"/>
      </div>
<!--      <div class="text item">-->
<!--        <el-input input-style="height:45px" placeholder="请善用搜索" v-model="keyword">-->
<!--          <template #append>-->
<!--            <el-button :icon="Search" @click="searchBtn(keyword)"/>-->
<!--          </template>-->
<!--        </el-input>-->

<!--      </div>-->
    </el-card>
  </div>
  <div>
    <el-card class="box-card">
      <div align="center">
        <el-avatar
            class="mr-3"
            :size="100"
            src="https://cube.elemecdn.com/0/88/03b0d39583f48206768a7534e55bcpng.png"
        />
        <br/>
        <span v-text="username?username:'未登录'"></span>
      </div>
      <br/>
      <div align="center">
        <span style="color: #e67e23">有些事情我不看透，不是我笨，只是我太善良。</span>
      </div>
    </el-card>
  </div>
  <div style="margin-top: 12px">
    <el-card class="box-card">
      <template #header>
        <div class="card-header">
          <span>标签云</span>
        </div>
      </template>
      <div class="flex flex-wrap gap-2 my-2">
        <el-tag
            v-for="item in tagList.list"
            :key="item.name"
            :type="item.type"
            class="mx-1"
            effect="dark"
            style="margin-left: 5px"
            round
        >
                <span style="cursor: pointer;" @click="searchTag(item.id)">
                {{ item.name }}
                </span>
        </el-tag>

      </div>
    </el-card>
  </div>
</template>
<script setup lang="ts">
import useGetArticle from "@/composables/article/userGetArticle";
import {useRoute} from "vue-router";
import {Search} from '@element-plus/icons-vue';
const route = useRoute();
const {tagList} = useGetArticle();
import {computed, ref} from "vue";
import {store} from "@/store";
import useTagArticle from "@/composables/tag/useTagArticle";
import RghSearch from "@/common/search/RghSearch.vue";
const {searchArticleByTag} = useTagArticle();

let username = computed(() => {
  return store.state.user.userId
})

// const keyword = ref<string>("")
// const searchBtn = (keyword:string) => {
//   router.push({name:'article_search',params: {key:keyword}})
// }
// const reload = inject('reload')
const searchTag = (id:string) => {
  searchArticleByTag(id)
  // setTimeout(()=>{
  //   reload()
  // },500)

}
// watch(() =>router.currentRoute.value.path,(newValue,oldValue)=> {
//   if(newValue!==oldValue){
//     console.log(newValue)
//     // getTagWithArticles(newValue)
//     router.push(newValue)
//   }
// },{ immediate: true })
</script>
<style scoped lang="scss">
</style>
