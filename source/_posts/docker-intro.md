---
title: Docker 入门笔记 —— 容器化你的应用
date: 2026-05-10 11:00:00
tags: [Docker, 容器, 部署]
categories: [技术]
---

## 为什么需要 Docker

> "在我电脑上能跑啊" —— 这句话 Docker 终结了。

Docker 将应用和依赖打包成**镜像**，在任何装了 Docker 的机器上都能一致运行。

## 核心概念

| 概念 | 类比 | 说明 |
|------|------|------|
| 镜像 (Image) | 类 | 应用的只读模板 |
| 容器 (Container) | 实例 | 镜像的运行实例 |
| Dockerfile | 配方 | 构建镜像的指令 |
| Docker Hub | GitHub | 镜像仓库 |

## 常用命令

```bash
# 镜像
docker images                  # 查看本地镜像
docker pull nginx:latest       # 拉取镜像
docker rmi <image_id>          # 删除镜像

# 容器
docker run -d -p 8080:80 nginx # 后台运行，端口映射
docker ps                      # 查看运行中的容器
docker ps -a                   # 所有容器（含已停止）
docker stop <container_id>     # 停止容器
docker rm <container_id>       # 删除容器

# 交互
docker exec -it <id> /bin/bash # 进入容器
docker logs -f <id>            # 查看日志
```

## Dockerfile 示例

```dockerfile
FROM python:3.11-slim
WORKDIR /app
COPY requirements.txt .
RUN pip install -r requirements.txt
COPY . .
CMD ["python", "app.py"]
```

```bash
docker build -t myapp:v1 .
docker run -d -p 5000:5000 myapp:v1
```

## Docker Compose

多容器编排，一个 `docker-compose.yml` 搞定：

```yaml
version: "3"
services:
  web:
    build: .
    ports:
      - "5000:5000"
  redis:
    image: redis:alpine
```

```bash
docker-compose up -d    # 启动所有服务
docker-compose down     # 停止并清理
```

## 小结

Docker 简化了部署流程。学会 Dockerfile + Docker Compose 就掌握了核心 80% 的场景。
