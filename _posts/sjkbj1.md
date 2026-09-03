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

## DDL部分总结

1.数据库操作

```sql
show databases;
create database 数据库名;
use 数据库名;
select database();
drop database if exists 数据库名;
```

2.表操作

```sql
show tables;
create tables 表名(字段 字段类型 , 字段 字段类型);
desc 表名;
show create table 表名;
alter table 表名 add/modify/change/drop/rename to ;
drop 表名;
```

实操例子:

```sql
mysql -u root -p
show databases;
use itcast;
desc yuan_gong_biao;
alter table yuan_gong_biao modify nickname varchar(20);
alter table yuan_gong_biao change nickname username varchar(25) comment "用户名";
alter table yuan_gong_biao drop username;
alter table yuan_gong_biao rename to y_g_b;
create table niubi(
    -> id int comment"名字"
    -> );
drop table if exists niubi;
```






