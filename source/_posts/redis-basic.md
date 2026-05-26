---
title: Redis 基础篇 —— 从零开始认识 Redis
date: 2026-05-20 10:00:00
tags: [Redis, 数据库, 缓存]
categories: [技术]
---

## 什么是 Redis

**Redis**（Remote Dictionary Server）是一个开源的、基于内存的键值对存储系统。它可以用作数据库、缓存和消息代理。

## 为什么需要 Redis

在传统 Web 应用中，每次请求都可能需要查询数据库。当并发量增大时，数据库成为瓶颈。

Redis 将热点数据缓存在内存中，读写速度极快（约 10 万次/秒），大幅降低数据库压力。

```bash
# 安装 Redis
brew install redis    # macOS
sudo apt install redis-server  # Ubuntu
```

## 五种基本数据类型

### 1. String（字符串）

```redis
SET name "kyle"
GET name       # "kyle"
INCR views     # 计数器自增
```

### 2. Hash（哈希）

```redis
HSET user:1 name "kyle" age "25"
HGET user:1 name   # "kyle"
HGETALL user:1     # 全部字段
```

### 3. List（列表）

```redis
LPUSH messages "hello"
RPUSH messages "world"
LRANGE messages 0 -1   # 全部元素
```

### 4. Set（集合）

```redis
SADD tags "tech" "life" "code"
SISMEMBER tags "tech"   # 1 (存在)
```

### 5. Sorted Set（有序集合）

```redis
ZADD leaderboard 100 "player1" 200 "player2"
ZRANGE leaderboard 0 -1 WITHSCORES
```

## 缓存常见问题

| 问题 | 描述 | 解决方案 |
|------|------|---------|
| 缓存穿透 | 查询不存在的数据 | 布隆过滤器、空值缓存 |
| 缓存击穿 | 热点 key 过期 | 互斥锁、永不过期 |
| 缓存雪崩 | 大量 key 同时过期 | 过期时间加随机值 |

## 小结

> Redis 的核心优势就是"快"。把数据放在内存里，用简单的数据结构，自然就快。

持续更新中...
