---
title: "数据库笔记"
date: "2026-09-02"
slug: "sjkbj1"
tags: ["计算机", "数据库"]
---

# 数据库笔记

## 启动与连接

```text
net start mysql80     // 启动数据库
mysql -u root -p      // 打开数据库
```

MySQL 里面可以创建很多数据库，注意用 `;` 作为命令结尾。

## 数据库操作

```sql
show databases;          -- 查询所有数据库
select database();       -- 查询当前数据库
create database 数据库名;  -- 创建数据库
drop database 数据库名;   -- 删除数据库
use 数据库名;             -- 使用数据库
```

## 表操作

建完数据库就可以在数据库里面建表了，可以建多张表。

```sql
show tables;                 -- 查询当前数据库所有表
desc 表名;                    -- 查询表结构
show create table 表名;       -- 查询指定表的建表语句（更详细）
```

## 建表例子

```sql
create table yuan_gong_biao(
  id int comment "编号",
  gonghao varchar(10) comment "工号",
  name varchar(10) comment "姓名",
  gender char(1) comment "性别",
  age tinyint unsigned comment "年龄",
  shenfenzheng char(18) comment "身份证号",
  ruzhi_shijian date comment "入职时间"
) comment "员工信息表";
```

基本语法：

```sql
create table 表名 (
  字段名 类型,
  字段名 类型
);
```

`comment "xxx"` 是注释。
