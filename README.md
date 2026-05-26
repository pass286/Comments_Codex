# My Blog

基于 Hexo + Butterfly 的现代化个人技术博客，配套飞书风格可视化编辑器，支持所见即所得写作。

---

## ✨ 功能特性

### 博客端
- 🌓 **暗色模式** — 自动/手动切换
- 💬 **Gitalk 评论** — 基于 GitHub Issues，无需后端
- 👍 **文章点赞** — 前端 localStorage 存储
- 📤 **社交分享** — 微信/微博/QQ/QQ空间一键分享
- 🔍 **本地搜索** — 全文检索，零外部依赖
- 📖 **文章目录** — 自动生成，默认展开
- 🍎 **代码高亮** — macOS 风格红黄绿圆点 + Atom One Dark 配色
- 📅 **归档/标签/分类** — 自动聚合页面
- 👁 **阅读进度条** — 文章顶部进度指示（可选开启）
- 📝 **在线编辑入口** — 每篇文章标题旁编辑图标，一键跳转编辑器

### 编辑器端
- ✍️ **所见即所得** — Vditor WYSIWYG 模式，像飞书一样写作
- 👁 **实时预览** — 右侧 iframe 加载 Butterfly 主题 CSS，100% 还原博客样式
- 📂 **可折叠侧栏** — 文章列表一键收起/展开
- ↔️ **可拖拽分屏** — 自由调节编辑/预览比例
- 💾 **一键保存** — 直接写入 `source/_posts/`，Hexo 自动热重载
- 🔗 **博客联动** — 博客编辑按钮直接跳转编辑器对应文章
- 🗑 **文章管理** — 新建、编辑、删除全部可视化操作

---

## 🛠 技术栈

| 组件 | 技术 |
|------|------|
| 静态站点 | Hexo 6.x |
| 主题 | Butterfly 5.x |
| 编辑器 | Vditor 3.x + marked.js |
| 后端 API | Express.js |
| 评论系统 | Gitalk |
| 代码高亮 | highlight.js |

---

## 📁 项目结构

```
blog/
├── source/
│   ├── _posts/              # Markdown 文章
│   ├── tags/                # 标签页
│   ├── categories/          # 分类页
│   └── js/like.js           # 点赞脚本
├── editor/                  # 可视化编辑器
│   ├── server.js            # Express API 后端
│   ├── index.html           # 编辑器前端（单文件）
│   └── package.json
├── themes/                  # Butterfly 主题
├── _config.yml              # Hexo 主配置
├── _config.butterfly.yml    # Butterfly 主题配置
├── package.json             # Hexo 依赖
└── README.md
```

---

## 🚀 本地运行

### 环境要求

- Node.js >= 18
- npm >= 9
- Git

### 安装

```bash
# 克隆项目
git clone https://github.com/pass286/Comments_Codex.git
cd Comments_Codex

# 安装博客依赖
npm install

# 安装编辑器依赖
cd editor
npm install
cd ..
```

### 启动

需要同时运行两个服务：

**终端 1 — 启动博客：**
```bash
npm run server
# 或 hexo server -p 4000
```

**终端 2 — 启动编辑器：**
```bash
cd editor
node server.js
```

| 服务 | 地址 |
|------|------|
| 博客 | http://localhost:4000 |
| 编辑器 | http://localhost:3030 |

---

## ✏️ 写文章

### 方式一：可视化编辑器（推荐）

打开 `http://localhost:3030`，像飞书一样所见即所得编辑，右侧实时预览 Butterfly 主题效果。

### 方式二：命令行

```bash
hexo new post "文章标题"
# 编辑 source/_posts/文章标题.md
```

### 方式三：GitHub 在线编辑

点击博客文章标题旁的 ✏️ 图标，跳转 GitHub 在线编辑。

---

## ⚙️ 配置

### Gitalk 评论

1. 创建 [GitHub OAuth App](https://github.com/settings/developers)
2. 修改 `_config.butterfly.yml`：

```yaml
gitalk:
  client_id: 你的 Client ID
  client_secret: 你的 Client Secret
  repo: Comments_Codex
  owner: pass286
  admin: pass286
```

3. `hexo generate` 重新生成

### 博客基础信息

修改 `_config.yml`：

```yaml
title: My Blog
subtitle: '技术笔记 & 随想'
author: Your Name
language: zh-CN
```

---

## 📦 部署

```bash
hexo generate
# 将 public/ 目录部署到任意静态托管服务
```

支持部署到 GitHub Pages、Vercel、Netlify 等。

---

## 📄 License

CC BY-NC-SA 4.0
