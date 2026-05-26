# Blog Editor

飞书风格的 Hexo 博客可视化编辑器，所见即所得。

## 技术栈

- **前端**: Vditor 富文本编辑器 + marked.js 渲染
- **后端**: Express.js
- **样式**: 自研 UI（参考 Swiss Modernism 设计系统）

## 功能

- ✍️ 所见即所得 Markdown 编辑
- 👁 实时 Butterfly 主题预览
- 📂 可折叠文章列表
- ↔️ 可拖拽分屏比例
- 💾 一键保存到 Hexo source/_posts
- 🗑 文章删除
- 🔗 博客编辑按钮联动

## 本地运行

```bash
cd editor
npm install
node server.js
```

浏览器打开 `http://localhost:3030`

## 依赖服务

编辑器需要 Hexo 博客在 `http://localhost:4000` 运行才能正常预览。

## 目录结构

```
editor/
├── server.js       # Express 后端，读写文章 API
├── index.html      # 编辑器前端（单文件）
└── package.json
```

## API

| 方法 | 路径 | 说明 |
|------|------|------|
| GET | /api/posts | 列出所有文章 |
| GET | /api/post?file=xxx.md | 读取文章内容 |
| POST | /api/post | 保存/更新文章 |
| DELETE | /api/post | 删除文章 |
