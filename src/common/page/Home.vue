<template style="background-color: #f0f4f5">
  <div style="margin-bottom: 10px;margin-top: 10px">
    <el-card class="box-card" :body-style="{ padding: '0px' }">
      <el-carousel :interval="4000" arrow="always">
        <el-carousel-item v-for="item in 4" :key="item">
          <el-image src="https://s1.ax1x.com/2022/10/27/xfHd5F.png"></el-image>
          <h3 text="2xl" justify="center">{{ item }}</h3>
        </el-carousel-item>
      </el-carousel>
    </el-card>
  </div>
  <div>
    <el-card class="box-card" :body-style="{ padding: '0px' }" style="text-align: center;padding-top: 5px;padding-bottom: 5px">
      <span style="font-size: 29px;color: #e67e23">最近更新</span>
    </el-card>
  </div>
  <div style="margin-top: 10px">
  </div>
    <el-row :gutter="10">
      <el-col
          v-for="data in articleTable.list"
          :key="data"
          :span="4"
          style="margin-bottom: 20px"
      >
      <el-card class="box-card" :body-style="{ padding: '0px' }" shadow="hover">
        <img
            :src="data.article.cover?data.article.cover:'https://s1.ax1x.com/2022/10/27/xfHP4e.md.jpg'"
            class="image"
        />
        <div style="padding: 14px">
          <span v-text="data.article.title"></span>
          <div class="bottom">
            <el-avatar
                class="mr-3"
                :size="32"
                src="https://cube.elemecdn.com/0/88/03b0d39583f48206768a7534e55bcpng.png"
            />
            <span v-text="data.article.author"></span>
            <el-button text @click="detail(data.article.id)" class="button">查看详情</el-button>
          </div>
        </div>
      </el-card>
      </el-col>
    </el-row>
  <div>
<!--    <el-card class="box-card">-->
      <el-row :gutter="10">
       <el-col :span="8"></el-col>
       <el-col :span="8">
         <el-pagination
             small
             @size-change="sizeChange"
             @current-change="currentChange"
             :current-page.sync="listParam.pageNum===0?1:listParam.pageNum"
             :page-sizes="[10, 20, 40, 80, 100]"
             :background="true"
             :page-size="listParam.pageSize===0?10:listParam.pageSize"
             layout="total, sizes, prev, pager, next, jumper"
             :total="articleTable.total"
         />
       </el-col>
       <el-col :span="8"></el-col>
      </el-row>
<!--    </el-card>-->
  </div>
</template>
<script setup lang="ts">
import useArticleTable from "@/composables/article/useArticleTable";
import {onBeforeRouteUpdate, useRouter} from "vue-router";
const router = useRouter();
const {listParam, articleTable, sizeChange, currentChange, searchBtn, resetBtn} = useArticleTable();
const detail = (id:string) => {
  router.push({name:'detail',query: {id:id}})
}

onBeforeRouteUpdate((to) => {
  console.log(to, "=====");
});
</script>
<style scoped lang="scss">
.el-carousel__item h3 {
  color: #475669;
  opacity: 0.75;
  line-height: 300px;
  margin: 0;
  text-align: center;
}

.el-carousel__item:nth-child(2n) {
  background-color: #99a9bf;
}

.el-carousel__item:nth-child(2n + 1) {
  background-color: #d3dce6;
}
.time {
  font-size: 12px;
  color: #999;
}

.bottom {
  margin-top: 13px;
  line-height: 12px;
  display: flex;
  justify-content: space-between;
  align-items: center;
}

.image {
  width: 100%;
  height: 150px;
  display: block;
}
</style>
