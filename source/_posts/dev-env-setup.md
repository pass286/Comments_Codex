---
title: 我的开发环境配置 —— 2026 版
date: 2026-05-03 15:00:00
tags: [开发环境, 工具]
categories: [随笔]
---

## 硬件

| 设备 | 配置 |
|------|------|
| 笔记本 | ThinkPad X1 Carbon |
| 显示器 | Dell U2723QE 4K |
| 键盘 | Keychron K8 Pro |

## 操作系统

**Windows 11 + WSL2 (Ubuntu)**

WSL2 让 Windows 用户也能享受原生 Linux 开发体验，文件系统互通、Docker 原生支持。

```bash
# WSL2 常用操作
wsl --install             # 安装
wsl --shutdown            # 重启
wsl -d Ubuntu             # 进入
```

## 终端

- **Windows Terminal** —— 微软出品，支持多标签、GPU 加速
- **Oh My Zsh** —— zsh 美化 + 插件生态
- 主题：Powerlevel10k
- 字体：MesloLGS NF

## 编辑器

**VS Code** —— 主力编辑器

必装插件：

- ESLint / Prettier —— 代码规范
- GitLens —— Git 增强
- Python / Pylance —— Python 开发
- Remote - SSH / WSL —— 远程开发
- GitHub Copilot —— AI 辅助编程

## 效率工具

| 工具 | 用途 |
|------|------|
| Alfred / uTools | 快速启动 |
| Snipaste | 截图贴图 |
| Notion | 笔记管理 |
| Obsidian | Markdown 笔记 |
| Raycast | macOS 效率神器 |

## Git 配置

```bash
[user]
    name = kyle
    email = me@example.com

[alias]
    co = checkout
    br = branch
    st = status
    lg = log --oneline --graph --all
```

## 小结

工具是手段，效率是目的。适合自己的才是最好的配置。
