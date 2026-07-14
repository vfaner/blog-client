<script setup  lang="ts">
import {computed, ref} from 'vue'
import {useStore} from "@/store";

const store=useStore();
const count = ref(0)
const showCount = computed(() => {
  return store.getters['getCount']
})
const addBtn=()=>{
  store.commit('setCount',++count.value)
}
</script>

<template>
  <h1>{{ showCount }}</h1>
  <button class="el-button" type="button" @click="addBtn">新增{{ count }}</button>

</template>

<style scoped>

</style>
