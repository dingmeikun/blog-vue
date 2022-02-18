```
---
title: 条件类型
author: 冴羽
date: '2021-12-12'
---
```

# [MySQL前缀索引和索引选择性](https://www.cnblogs.com/balfish/p/9003794.html)

有时候需要索引很长的字符列，这会让索引变得大且慢。通常可以索引开始的部分字符，这样可以大大节约索引空间，从而提高索引效率。但这样也会降低索引的选择性。索引的选择性是指不重复的索引值（也称为基数，cardinality)和数据表的记录总数的比值，范围从1/#T到1之间。索引的选择性越高则查询效率越高，因为选择性高的索引可以让MySQL在查找时过滤掉更多的行。唯一索引的选择性是1，这是最好的索引选择性，性能也是最好的。

一般情况下某个前缀的选择性也是足够高的，足以满足查询性能。对于BLOB，TEXT，或者很长的VARCHAR类型的列，必须使用前缀索引，因为MySQL不允许索引这些列的完整长度。

诀窍在于要选择足够长的前缀以保证较高的选择性，同时又不能太长（以便节约空间）。前缀应该足够长，以使得前缀索引的选择性接近于索引的整个列。换句话说，前缀的”基数“应该接近于完整的列的”基数“。

为了决定前缀的合适长度，需要找到最常见的值的列表，然后和最常见的前缀列表进行比较。下面的示例是mysql官方提供的示例数据库

下载地址如下：

http://downloads.mysql.com/docs/sakila-db.zip

在示例数据库sakila中并没有合适的例子，所以从表city中生成一个示例表，这样就有足够数据进行演示：

```
mysql> select database();                                                           
+------------+
| database() |
+------------+
| sakila     |
+------------+
1 row in set (0.00 sec)

mysql> create table city_demo (city varchar(50) not null);                          
Query OK, 0 rows affected (0.02 sec)

mysql> insert into city_demo (city) select city from city;                          
Query OK, 600 rows affected (0.08 sec)
Records: 600  Duplicates: 0  Warnings: 0

mysql> insert into city_demo (city) select city from city_demo;
Query OK, 600 rows affected (0.07 sec)
Records: 600  Duplicates: 0  Warnings: 0

mysql> update city_demo set city = ( select city from city order by rand() limit 1);
Query OK, 1199 rows affected (0.95 sec)
Rows matched: 1200  Changed: 1199  Warnings: 0

mysql> 
```

因为这里使用了rand（）函数，所以你的数据会与我的不同，当然那不影响聪明的你。

首先找到最常见的城市列表：

```
mysql> select count(*) as cnt, city from city_demo group by city order by cnt desc limit 10;               
+-----+--------------+
| cnt | city         |
+-----+--------------+
|   8 | Garden Grove |
|   7 | Escobar      |
|   7 | Emeishan     |
|   6 | Amroha       |
|   6 | Tegal        |
|   6 | Lancaster    |
|   6 | Jelets       |
|   6 | Ambattur     |
|   6 | Yingkou      |
|   6 | Monclova     |
+-----+--------------+
rows in set (0.01 sec)

mysql>
```

注意到查询结果，上面每个值都出现了6-8次。现在查找到频繁出现的城市前缀。先从3个前缀字母开始，然后4个，5个，6个：

```
mysql> select count(*) as cnt,left(city,3) as pref from city_demo group by pref order by cnt desc limit 10;
+-----+------+
| cnt | pref |
+-----+------+
|  25 | San  |
|  15 | Cha  |
|  12 | Bat  |
|  12 | Tan  |
|  11 | al-  |
|  11 | Gar  |
|  11 | Yin  |
|  10 | Kan  |
|  10 | Sou  |
|  10 | Bra  |
+-----+------+
10 rows in set (0.00 sec)

mysql> select count(*) as cnt,left(city,4) as pref from city_demo group by pref order by cnt desc limit 10; 
+-----+------+
| cnt | pref |
+-----+------+
|  12 | San  |
|  10 | Sout |
|   8 | Chan |
|   8 | Sant |
|   8 | Gard |
|   7 | Emei |
|   7 | Esco |
|   6 | Ying |
|   6 | Amro |
|   6 | Lanc |
+-----+------+
10 rows in set (0.01 sec)

mysql> select count(*) as cnt,left(city,5) as pref from city_demo group by pref order by cnt desc limit 10; 
+-----+-------+
| cnt | pref  |
+-----+-------+
|  10 | South |
|   8 | Garde |
|   7 | Emeis |
|   7 | Escob |
|   6 | Amroh |
|   6 | Yingk |
|   6 | Moncl |
|   6 | Lanca |
|   6 | Jelet |
|   6 | Tegal |
+-----+-------+
10 rows in set (0.01 sec)
```

```
mysql> select count(*) as cnt,left(city,6) as pref from city_demo group by pref order by cnt desc limit 10; 
+-----+--------+
| cnt | pref   |
+-----+--------+
|   8 | Garden |
|   7 | Emeish |
|   7 | Escoba |
|   6 | Amroha |
|   6 | Yingko |
|   6 | Lancas |
|   6 | Jelets |
|   6 | Tegal  |
|   6 | Monclo |
|   6 | Ambatt |
+-----+--------+
rows in set (0.00 sec)

mysql>
```

通过上面改变不同前缀长度发现，当前缀长度为6时，这个前缀的选择性就接近完整列的选择性了。甚至是一样的。

当然还有另外更方便的方法，那就是计算完整列的选择性，并使其前缀的选择性接近于完整列的选择性。下面显示如何计算完整列的选择性：

```
mysql> select count(distinct city) / count(*) from city_demo;
+---------------------------------+
| count(distinct city) / count(*) |
+---------------------------------+
|                          0.4283 |
+---------------------------------+
row in set (0.05 sec)

mysql>
```

可以在一个查询中针对不同前缀长度的选择性进行计算，这对于大表非常有用，下面给出如何在同一个查询中计算不同前缀长度的选择性：

```
mysql> select count(distinct left(city,3))/count(*) as sel3,
    -> count(distinct left(city,4))/count(*) as sel4,
    -> count(distinct left(city,5))/count(*) as sel5, 
    -> count(distinct left(city,6))/count(*) as sel6 
    -> from city_demo;
+--------+--------+--------+--------+
| sel3   | sel4   | sel5   | sel6   |
+--------+--------+--------+--------+
| 0.3367 | 0.4075 | 0.4208 | 0.4267 |
+--------+--------+--------+--------+
1 row in set (0.01 sec)

mysql> 
```

可以看见当索引前缀为6时的基数是0.4267，已经接近完整列选择性0.4283。

在上面的示例中，已经找到了合适的前缀长度，下面创建前缀索引：

```
mysql> alter table city_demo add key (city(6));
Query OK, 0 rows affected (0.19 sec)
Records: 0  Duplicates: 0  Warnings: 0
```

 

```
mysql> explain select * from city_demo where city like 'Jinch%';
+----+-------------+-----------+-------+---------------+------+---------+------+------+-------------+
| id | select_type | table     | type  | possible_keys | key  | key_len | ref  | rows | Extra       |
+----+-------------+-----------+-------+---------------+------+---------+------+------+-------------+
|  1 | SIMPLE      | city_demo | range | city          | city | 20      | NULL |    2 | Using where |
+----+-------------+-----------+-------+---------------+------+---------+------+------+-------------+
1 row in set (0.00 sec)
```

可以看见正确使用刚创建的索引。

前缀索引是一种能使索引更小，更快的有效办法，但另一方面也有其缺点：

mysql无法使用其前缀索引做ORDER BY和GROUP BY，也无法使用前缀索引做覆盖扫描