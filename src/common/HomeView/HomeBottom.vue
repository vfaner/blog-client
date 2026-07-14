<template>
  <footer class="footer">
    <div class="container">
      <div class="fcode">
        <h6>友情链接:&nbsp;&nbsp;
          <span v-for="link in linkList.list" :key="link">
            <span v-if="link.enable">
              <a :href="link.link" :title="link.description" target="_blank">{{link.name}}</a>&nbsp;&nbsp;
            </span>
          </span>
        </h6>
    </div>
    <p><a href="./about">关于超级博客</a> © 2020 <a href="">超级博客</a> &nbsp; <a href="" target="_blank" rel="nofllow">豫ICP备18042205号-1</a>
    <a href="https://huayula.com/sitemap.xml">站点地图</a>
    &nbsp; <span id="showText"></span></p>
  </div>
</footer>
<div class="m-mask"></div>
<div class="rollbar" style="display: none;">
  <ul>
    <li>
      <a target="_blank" href="https://wpa.qq.com/msgrd?v=3&amp;uin=2912167928&amp;site=qq&amp;menu=yes"><i class="fa fa-qq"></i>
      </a><h6>QQ咨询<i></i></h6>
    </li>
    <li><a href="javascript:;" @click="goTop"><i class="fa fa-angle-up"></i></a><h6>去顶部<i></i></h6>
    </li>
    </ul>
  </div>

  <nav class="m-menubar" v-if="mobileNavEnable && mobileNavs.length">
    <ul>
      <li class="menu-item" v-for="(item, idx) in mobileNavs" :key="idx">
        <a :href="item.link">
          <i :class="item.icon"></i> {{ item.title }}
        </a>
      </li>
    </ul>
  </nav>
</template>
<script lang="ts" setup>
import { computed } from "vue";
import { useStore } from "@/store";
import useLinkList from "@/composables/link/useLinkList";

const { linkList } = useLinkList();
const store = useStore();
const conf = computed(() => store.getters.getSysConfig || {});
const mobileNavEnable = computed(() => !!conf.value.mobileNavEnable);
const mobileNavs = computed(() => conf.value.mobileNavs || []);

const goTop = () => {
  window.scrollTo({ top: 0, behavior: 'smooth' });
}
</script>
<style src="@/assets/style/main.css" scoped></style>
