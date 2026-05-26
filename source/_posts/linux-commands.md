---
title: Linux 常用命令速查 —— 从入门到熟练
date: 2026-05-12 16:00:00
tags: [Linux, Shell, 运维]
categories: [技术]
---

## 文件操作

```bash
ls -la          # 列出所有文件（含隐藏）
cd /path        # 切换目录
pwd             # 显示当前路径
mkdir -p a/b/c  # 递归创建目录
rm -rf folder   # 强制删除（慎用！）
cp -r src dst   # 递归复制
mv old new      # 移动/重命名
```

## 文件查看

```bash
cat file.txt       # 查看全文
head -n 10 file    # 前 10 行
tail -f log.txt    # 实时跟踪日志
less file.txt      # 分页浏览（q 退出）
wc -l file.txt     # 统计行数
```

## 权限管理

```bash
chmod 755 script.sh   # rwxr-xr-x
chmod +x script.sh    # 添加执行权限
chown user:group file # 修改所有者
```

| 数字 | 权限 | 含义 |
|------|------|------|
| 7 | rwx | 读写执行 |
| 5 | r-x | 读执行 |
| 4 | r-- | 只读 |

## 进程管理

```bash
ps aux              # 查看所有进程
top                 # 实时进程监控
kill -9 PID         # 强制结束进程
nohup cmd &         # 后台运行
jobs                # 查看后台任务
```

## 网络与磁盘

```bash
df -h               # 磁盘使用情况
du -sh *            # 目录大小
ping google.com     # 网络连通性
curl -I url         # 查看响应头
netstat -tlnp       # 查看端口占用
```

## 小结

> 不需要全部记住，知道有哪些命令，用的时候 `man` 一下就行。
