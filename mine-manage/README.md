

# 使用技术说明

前端使用vue-cli构建项目，基于Vue3

使用axios向后端发送请求

在终端使用npm run serve运行前端程序

# **功能清单**

一、管理系统侧边栏的路由

二、点击路由跳转后主体区域显示的内容

目前写了人员信息和设备信息的管理前端，主要包括以下内容：

1.数据分页模糊查询

2.表格导出

3.表格单行数据的增删改查



# 详细设计

#### 人员信息

文件名称：device.vue

级别类型下拉框信息：   参数名：levelOptions。    变量属性信息：

| value | label    |
| ----- | -------- |
| 1     | 普通员工 |
| 2     | 班长     |
| 3     | 组长     |

技术类型下拉框信息：    参数名：skillOptions。     变量属性信息：

| value | label    |
| ----- | -------- |
| 1     | 卡车司机 |
| 2     | 铲车司机 |

添加新员工弹窗：

![image-20221129160054342](C:\Users\神话\AppData\Roaming\Typora\typora-user-images\image-20221129160054342.png)

导出excel表信息：

![image-20221129160207738](C:\Users\神话\AppData\Roaming\Typora\typora-user-images\image-20221129160207738.png)

#### 设备信息

文件名称：staff.vue

设备类型下拉框信息：   参数名：deviceOptions。   变量属性信息：

| value | label |
| ----- | ----- |
| 1     | 卡车  |
| 2     | 铲车  |

操作员下拉框信息：     参数名：principalOptions。    变量属性信息：

| value            | label              |
| ---------------- | ------------------ |
| 后端传来的人员id | 后端传来的人员姓名 |

添加新设备弹窗：

![image-20221129160255889](C:\Users\神话\AppData\Roaming\Typora\typora-user-images\image-20221129160255889.png)

导出excel表信息：

![image-20221129160327441](C:\Users\神话\AppData\Roaming\Typora\typora-user-images\image-20221129160327441.png)