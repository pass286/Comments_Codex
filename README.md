# My Blog

基于 Hexo + Butterfly 主题的个人技术博客。

## 技术栈

- **框架**: Hexo 6.x
- **主题**: Butterfly 5.x
- **评论**: Gitalk（基于 GitHub Issues）
- **托管**: GitHub Pages

## 功能

- 📝 Markdown 写作
- 🌓 暗色模式
- 💬 Gitalk 评论
- 👍 文章点赞
- 📤 社交分享
- 🔍 本地搜索
- 📖 文章目录

## 本地运行

```bash
cd blog
npm install
hexo server
```

浏览器打开 `http://localhost:4000`

## 写文章

```bash
hexo new post "文章标题"
```

或在配套编辑器中可视化编辑：`http://localhost:3030`

## 目录结构

```
blog/
├── source/_posts/      # Markdown 文章
├── _config.yml         # Hexo 配置
├── _config.butterfly.yml  # Butterfly 主题配置
└── themes/             # 主题文件
```
