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
create table 表名(字段 字段类型 , 字段 字段类型);
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

## DML部分总结

```sql
insert into (字段1,字段2  ) values (值1,值2 ),(值1,值2  );   --添加数据

update 表名 set 字段1 = 值1 , 字段2 = 值2 where 条件;        --修改数据

delete from 表名 where 条件;                                --删除数据
```

## DQL部分总结 

```sql

select 字段列表 from 表名 where 条件列表 group by 分组字段列表 having 分组后条件列表 group by 排序字段列表;

```

```text
dql查询十分重要 

升序默认asc，降序desc
```


## DCL部分总结


```sql
用户管理：
create user '用户名'@'主机名' indentified by '密码';   --添加用户
alter user '用户名'@'主机名' identified with mysql_native_password by '密码';   --更改密码
drop user '用户名'@'主机名';   --删除用户

权限控制：
grant 权限列表 on 数据库名.表名 to '用户名'@'主机名';
revoke 权限列表 on 数据库名.表名 from '用户名'@'主机名';
```

## 函数


```sql
字符串：
concat , lower , upper ,lpad(左填充),rpad(右填充) , trim substring
数值函数：
ceil , floor , mod , rand , round
日期函数：
curdate , curtime , now , year , month , day , date ,date_add , datediff
流程函数：
if , ifnull case [  ]  when then else end;
```

## 约束


```sql
not null   --非空
unique    --唯一
primary key (auto_increment)   --主键
default   --默认
check   --检查
foreign key   --外键
ALTER TABLE 表名 ADD CONSTRAINT 外键名称 FOREIGN KEY(外键字段名) REFERENCES 主表(表列名); 
--外键语法
alter table 表名 drop foreign key 外键名称;
--删除外键
-- 外键是为了确保表可以与另外一张表关联，确保数据完整性
```


学到这里的心得体会：
进入mysql之后先查看现在有多少个数据库，除了默认库之外建库，在库里再建表，可以建多张表
建表的时候可以运用约束来确定主键，一般用自增，可以用约束条件来约束后面表格内容，建好表之后插入数据才是一张完整的表格，然后可以选择添加外键。接下来就是对数据库表的操作，比如查询，
简单来说，前置操作就是： 建表 -> 插数据 ->添加外键
实例：
```text
 create table dept(
    -> id int auto_increment comment 'ID' primary key,
    -> name varchar(50) not null comment'部门名称'
    ->  )comment '部门表';

insert into dept (id , name )values (1,'研发部'),(2,'市场部'),(3,'财务部'),(4,'销售部'),(5,'总经办'),(6,'人事部');

create table emp (
    -> id int auto_increment comment 'ID' primary key,
    -> name varchar(50) not null comment '姓名',
    -> age int comment '年龄',
    -> job varchar(20) comment '职位',
    -> salary int comment '薪资',
    -> entrydate date comment '入职时间',
    -> managerid int comment '直属领导ID',
    -> dept_id int comment '部门ID'
    -> )comment '员工表';

alter table emp add constraint fk_emp_dept_id foreign key (dept_id) references dept(id);

INSERT INTO emp (id, name, age, job,salary, entrydate, managerid, dept_id)
    -> values
    -> (1,'张居正',60,'总裁',20000,'2000-01-01',null,5),
    -> (2,'杨慎',20,'项目经理',12500, '2005-12-05', 1,1),
    -> (3, '绫波丽', 18, '开发', 8400,'2000-11-03', 2,1),
    -> (4, '碇真嗣', 14, '开发',11000, '2002-02-05', 2,1),
    -> (5, '方源', 43, '开发',10500, '2004-09-07', 3,1),
    -> (6, '沈翠', 19, '指挥官',6600, '2004-10-12', 2,1),
    -> (7, '齐夏', 60, '财务总监',8500, '2002-09-12', 1,3),
    ->  (8, '周芷若', 19, '会计',4800, '2006-06-02', 7,3),
    -> (10, '赵敏', 20, '市场部总监',12500, '2004-10-12', 1,2),
    -> (11, '鸣人', 56, '职员',3750, '2006-10-03', 10,2),
    -> (12, '哥布林', 19, '职员',3750, '2007-05-09', 10,2),
    ->  (13, '小明', 19, '职员',5500, '2009-02-12', 10,2),
    -> (14, '张老哥', 88, '销售总监',14000, '2004-10-12', 1,4),
    -> (15, '肖授王', 38, '销售',4600, '2004-10-12', 14,4),
    -> (16, '柳永', 40, '销售',4600, '2004-10-12', 14,4),
    -> (17, '贾谊', 42, null,2000, '2011-10-12', 1,null);

```






















