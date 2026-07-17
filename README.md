# 超级博客 · blog-client（前端）

> 一款基于 Vue 3 + TypeScript + Vite 5 + Element Plus 的博客系统前端项目，配套 Spring Boot 后端。
>
> [English README →](./README_en.md)

## 🔗 项目地址

| 端 | 仓库地址 |
|----|----------|
| **前端 blog-client（本项目）** | https://github.com/vfaner/blog-client |
| **配套后端 blog-server** | https://github.com/vfaner/blog-server |

如果本项目对你有帮助，欢迎点一个 ⭐️ **Star**，这是对我持续维护开源项目最大的支持！

---

## ✨ 效果预览

### 博客首页
![博客首页](./images/bk_index.png)

### 首页弹窗登录
![首页登录弹窗](./images/bk_index_login.png)

### 独立登录页（访问 `/admin/*` 未登录时跳转）
![登录页](./images/bk_login.png)

### 分类文章列表
![分类文章](./images/bk_cate.png)

### 文章详情
![文章详情](./images/bk_detail.png)

### 前台用户中心
![前台用户中心](./images/bk_user.png)

### 后台仪表盘
![后台首页](./images/bk_admin.png)

### 后台文章管理
![文章管理](./images/bk_admin_wz.png)

### 后台文章编辑
![文章编辑](./images/bk_admin_arth.png)

### 后台角色管理
![角色管理](./images/bk_admin_role.png)

### 后台评论管理
![评论管理](./images/bk_admin_comment.png)

---

## 🚀 技术栈

- **Vue 3.4**（Composition API + `<script setup>`）
- **TypeScript 5.5**
- **Vite 5.4**
- **Element Plus 2.7**
- **Vue Router 4** / **Vuex 4**
- **Axios 1.7**
- **ECharts 5.5**（Dashboard 图表）
- **TinyMCE 6**（文章富文本编辑器）
- **undraw-ui**（评论组件）

## 📦 功能特性

- 前台：首页动态卡片、分类页、标签页、搜索、文章详情、评论、点赞、打赏
- 后台：仪表盘、文章/分类/标签/评论/友链/菜单/角色/用户管理
- 动态页面标题（分类页 = 分类名，标签页 = 标签名，详情页 = 文章标题）
- 前端本地分页 + 服务端聚合数据
- 支持移动端底部导航（可开关，可配置任意菜单项）
- 首页登录弹窗 & 独立登录页两种登录方式
- 完全动态的路由和菜单（后端下发）

## 🏃 快速开始

### 环境要求
- Node.js 18+
- npm / pnpm / yarn 均可

### 1. 安装依赖

```bash
npm install
```

### 2. 启动开发环境

```bash
npm run dev
```

默认访问：http://localhost:8080

> `vite.config.ts` 中配置的端口为 **8080**；若该端口已被占用，Vite 会自动往上顺延（8081、8082 …），启动时终端会打印实际使用的端口。

### 3. 打包构建

```bash
npm run build
```

产物输出到 `dist/`。

### 4. 类型检查

```bash
npm run type-check
```

## ⚙️ 后端接口地址

在 `vite.config.ts` 中已配置代理，默认将 `/rgh/api` 转发到 `http://localhost:8090`。

若后端部署到其他地址，修改 `vite.config.ts` 中的 `server.proxy` 即可。

## 🗂 项目结构

```
blog-client/
├── src/
│   ├── api/                # 接口封装
│   ├── assets/             # 静态资源
│   ├── common/             # 前台通用组件（首页、导航、评论、打赏等）
│   ├── components/         # 全局组件
│   ├── composables/        # 组合式函数
│   ├── layout/             # 后台布局
│   ├── router/             # 路由
│   ├── store/              # Vuex
│   ├── utils/              # 工具（日期、鉴权、复制等）
│   └── views/              # 后台页面
├── public/
├── index.html
├── vite.config.ts
├── tsconfig.json
└── package.json
```

## 🧩 与后端联调

后端项目：https://github.com/vfaner/blog-server

按后端 README 启动服务后，前端即可直接访问所有接口（Vite 代理已配置好）。

默认前台账号（弹窗登录使用后端 admin 账号，也可注册普通用户）：

| 用户名 | 密码 |
|--------|------|
| admin  | 123456 |

---

## ❤️ 打赏 & Star

如果这个项目对你有帮助，可以请我喝杯咖啡 ☕️：

![打赏二维码](./images/ds.png)

> 觉得不错的话，也别忘了在右上角点一个 ⭐️ **Star** 支持一下～

## 📄 License

MIT
