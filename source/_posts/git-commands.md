---
title: Git 常用命令速查表
date: 2026-05-18 14:30:00
tags: [Git, 版本控制]
categories: [技术]
---

## 基础配置

```bash
git config --global user.name "Your Name"
git config --global user.email "you@example.com"
git config --list  # 查看所有配置
```

## 仓库操作

```bash
git init                    # 初始化仓库
git clone <url>             # 克隆仓库
git remote add origin <url> # 关联远程仓库
```

## 日常提交

```bash
git status           # 查看状态
git add .            # 暂存所有文件
git commit -m "msg"  # 提交
git push origin main # 推送到远程
git pull             # 拉取远程更新
```

## 分支管理

```bash
git branch              # 查看分支
git branch feature      # 创建分支
git checkout feature    # 切换分支
git checkout -b feature # 创建并切换
git merge feature       # 合并分支
git branch -d feature   # 删除分支
```

## 撤销操作

```bash
git reset HEAD <file>   # 取消暂存
git checkout -- <file>  # 丢弃工作区修改
git reset --soft HEAD^  # 撤销 commit，保留修改
git reset --hard HEAD^  # 撤销 commit，丢弃修改
```

## 进阶技巧

```bash
git stash              # 暂存当前工作
git stash pop          # 恢复暂存
git cherry-pick <hash> # 摘取某次提交
git rebase main        # 变基到 main 分支
git log --oneline --graph --all  # 优雅的日志
```

## 小结

> 掌握这些命令足以应对 90% 的日常开发场景。
