---
title: MySQL 索引优化 —— 让查询飞起来
date: 2026-05-08 13:00:00
tags: [MySQL, 数据库, 优化]
categories: [技术]
---

## 什么是索引

索引就像书的目录，帮你快速定位内容，而不是从头翻到尾。

```sql
-- 创建索引
CREATE INDEX idx_name ON users(name);

-- 查看索引
SHOW INDEX FROM users;

-- 删除索引
DROP INDEX idx_name ON users;
```

## 索引类型

| 类型 | 说明 | 适用场景 |
|------|------|---------|
| B+Tree | 默认索引类型 | 等值查询、范围查询 |
| Hash | 哈希索引 | 精确等值查询 |
| Full-Text | 全文索引 | 文本搜索 |
| Unique | 唯一索引 | 唯一约束字段 |

## 最左前缀原则

联合索引 `(a, b, c)` 相当于创建了三个索引：

- `(a)` —— ✅ 生效
- `(a, b)` —— ✅ 生效
- `(a, b, c)` —— ✅ 生效
- `(b, c)` —— ❌ 不生效（跳过了 a）

```sql
-- 联合索引
CREATE INDEX idx_abc ON orders(a, b, c);

-- 会用到索引
SELECT * FROM orders WHERE a = 1 AND b = 2;

-- 不会用到索引（不符合最左前缀）
SELECT * FROM orders WHERE b = 2 AND c = 3;
```

## EXPLAIN 分析

```sql
EXPLAIN SELECT * FROM users WHERE email = "test@example.com";
```

关注字段：

| 字段 | 含义 |
|------|------|
| type | 访问类型（ALL < index < range < ref < const） |
| key | 实际使用的索引 |
| rows | 扫描行数 |
| Extra | Using index（覆盖索引）/ Using filesort（需要优化） |

## 优化建议

1. **WHERE、JOIN、ORDER BY 字段建索引**
2. **避免 SELECT \***——用覆盖索引
3. **避免在索引列上使用函数**（如 `WHERE YEAR(date) = 2024`）
4. **定期分析慢查询日志**

## 小结

> 索引不是越多越好，每个索引都会拖慢写入速度。建在查询频繁的字段上，用 EXPLAIN 验证效果。
