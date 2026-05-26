---
title: Python 虚拟环境详解 —— venv 与 pip 最佳实践
date: 2026-05-15 09:00:00
tags: [Python, 虚拟环境]
categories: [技术]
---

## 为什么要用虚拟环境

不同项目可能依赖同一个库的不同版本。比如项目 A 用 Django 3.2，项目 B 用 Django 4.0，全局安装会冲突。

**虚拟环境**为每个项目创建独立的 Python 运行环境，互不干扰。

## 创建虚拟环境

```bash
# Python 3.3+ 内置 venv
python -m venv myproject_env

# 激活（Windows）
myproject_env\Scripts\activate

# 激活（macOS/Linux）
source myproject_env/bin/activate
```

激活后终端前面会出现 `(myproject_env)` 标识。

## 管理依赖

```bash
pip list                  # 查看已安装的包
pip install requests      # 安装包
pip freeze > requirements.txt   # 导出依赖

# 在新环境一键安装
pip install -r requirements.txt
```

## requirements.txt 示例

```
Django==4.2.0
requests>=2.28.0
gunicorn==21.2.0
Pillow~=10.0.0
```

> `==` 精确版本，`>=` 最低版本，`~=` 兼容版本。

## 常用技巧

```bash
# 退出虚拟环境
deactivate

# 删除虚拟环境（直接删文件夹）
rm -rf myproject_env

# 查看虚拟环境路径
which python
```

## 小结

每个项目一个虚拟环境是 Python 开发的基本素养。搭配 `requirements.txt`，团队协作和部署都变得简单可控。
