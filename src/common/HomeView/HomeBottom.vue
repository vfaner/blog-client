<template>
  <footer class="footer">
    <div class="container">
      <div class="fcode">
        <p class="friend-links">
          <span class="label">友情链接：</span>
          <template v-for="link in linkList.list" :key="link.id">
            <a v-if="link.enable" :href="link.link" :title="link.description" target="_blank" rel="noopener">{{ link.name }}</a>
          </template>
        </p>
    </div>
    <p class="copyright">
      <a href="./about">关于超级博客</a> © 2020 <a href="">超级博客</a>
      <a href="" target="_blank" rel="nofllow">豫ICP备18042205号-1</a>
      <a href="https://huayula.com/sitemap.xml">站点地图</a>
      <span id="showText"></span>
    </p>
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
<style scoped lang="scss">
.footer .fcode .friend-links {
  /* 与下方版权行同尺寸，字号 14px 匹配 main.css 里 .footer p 的默认 */
  font-size: 14px;
  font-weight: normal;
  line-height: 1.8;
  margin: 0 0 6px;
  color: #999;
  text-align: center;
}
.footer .fcode .friend-links .label {
  color: #606266;
  margin-right: 4px;
}
.footer .fcode .friend-links a {
  color: #999;
  margin: 0 8px;
  text-decoration: none;
  transition: color .2s ease;
}
.footer .fcode .friend-links a:hover {
  color: #C38CFF;
}
.footer .copyright {
  font-size: 14px;
  color: #999;
  line-height: 1.8;
  text-align: center;
  margin: 0;
}
.footer .copyright a {
  color: #999;
  margin: 0 4px;
  text-decoration: none;
  transition: color .2s ease;
}
.footer .copyright a:hover { color: #C38CFF; }
</style>
