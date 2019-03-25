# Mobile-store
## 一、 简介
mobile前端采用mui+zepto开发，后端使用node+express进行开发。前端通过zepto发送ajax请求，后端接受请求并返回json文件
运行方式：
` cd mobile-store`
`npm start`
## 二、演示
* 手机端用户测试账号：user,密码:123456，测试地址：http://112.74.35.49:8888/page/index.html
* PC端管理员测试账号:root,密码:123456，测试地址: http://112.74.35.49:8888/page/admin/login.html
<img src=".\md_img\首页.PNG" width="50%" >
<img src=".\md_img\商品.PNG" width="50%" >
<img src=".\md_img\buy.PNG" width="50%">
<img src=".\md_img\后台.PNG" width="100%" >
## 三、API
1. ### Admin管理端

    1. #### 管理员登录

        请求路径 | /admin/login 
        --------|--------
        请求方法 | post 
        参数    | username,password
        返回值   | 

    1. ####  管理员注销

        请求路径 | /admin/logout
        --------|--------
        请求方法 | get
        参数    | 
        返回值   | 

    1. #### 管理员检查登录状态

        请求路径 | /admin/checkLogin
        --------|--------
        请求方法 | get
        参数    | 
        返回值   | 

1. ### 用户管理
    1. #### 用户登录

        请求路径 | /user/login 
        --------|--------
        请求方法 | post 
        参数    | username,password
        返回值   | 

    1. ####  用户注销

        请求路径 | /user/logout
        --------|--------
        请求方法 | get
        参数    | 
        返回值   | 

    1. #### 获取用户信息

        请求路径 | /user/getUserInfo
        --------|--------
        请求方法 | get 
        参数    | 
        返回值   | user
    
    1. #### 用户注册

        请求路径 | /user/register
        --------|--------
        请求方法 | post 
        参数    | username，password，mobile
        返回值   | 
    1. #### 用户修改密码
        
        请求路径 | /user/modifypass
        --------|--------
        请求方法 | post 
        参数    | newpass,oldpass
        返回值   | 
    
    ###  _管理员操作_
    1. #### 查询所有用户
        
        请求路径 | /user/queryUser
        --------|--------
        请求方法 | get 
        参数    | 
        返回值   | 
    1. #### 禁用用户
        
        请求路径 | /user/disableUser
        --------|--------
        请求方法 | get
        参数    | id
        返回值   | 
    1. #### 启用用户
        
        请求路径 | /user/enableUser
        --------|--------
        请求方法 | get
        参数    | id
        返回值   | 
1. ### 产品管理
    1. #### 搜索产品

        请求路径 | /product/queryProduct
        --------|--------
        请求方法 | get
        参数    | proName,pageSize,curPage
        返回值   | products

    1. ####  产品详情

        请求路径 | /product/queryProductDetail
        --------|--------
        请求方法 | get
        参数    | id
        返回值   | product
    ###  _管理员操作_
    1. #### 获取所有商品

        请求路径 |/product/queryProductDetailList
        --------|--------
        请求方法 | get 
        参数    | pageSize，curpage
        返回值   | products
    
    1. #### 添加商品

        请求路径 | /product/addProduct
        --------|--------
        请求方法 | post 
        参数    | proName,proDesc,curPrice,num,originPrice,size,status,imgUrl,brandId
        返回值   | 
    1. #### 禁用商品
        
        请求路径 | /product/disableProduct
        --------|--------
        请求方法 | get
        参数    | id
        返回值   | 

    1. #### 启用商品
        
        请求路径 | /product/enableProduct
        --------|--------
        请求方法 | get
        参数    | id
        返回值   | 
    
1. ### 分类管理
    1.  #### 获取所有一级分类

        请求路径 |/category/firstcategory
        --------|--------
        请求方法 | get 
        参数    | 
        返回值   | categorys
    1.  #### 获取以及分类下的二级分类

        请求路径 |/category/secondcategory
        --------|--------
        请求方法 | get 
        参数    | id
        返回值   | secondCategorys
    ### _管理员操作_
    1. #### 获取所有一级分类名

        请求路径 |/category/queryTopCategoryPaging
        --------|--------
        请求方法 | get 
        参数    | pageSize,curPage
        返回值   | categorys
    1. #### 获取所有二级分类名

        请求路径 |/category/querySecondCategoryPaging
        --------|--------
        请求方法 | get 
        参数    | pageSize,curPage
        返回值   | secondCategorys
    1. #### 添加一级分类

        请求路径 |/category/addCategory
        --------|--------
        请求方法 | post 
        参数    | categoryName
        返回值   | 
    1. #### 添加二级分类

        请求路径 |/category/addCategory
        --------|--------
        请求方法 | post 
        参数    | categoryName
        返回值   | 
1. ### 购物车管理
    1. #### 添加购物车

        请求路径 |/cart/addCart
        --------|--------
        请求方法 | post
        参数    | productId,num，size
        返回值   | 
    1. #### 查看购物车
         请求路径 |/cart/getCart
        --------|--------
        请求方法 | get
        参数    | productId,num，size
        返回值   | carts
1. ### 地址管理
    1. #### 查看地址
        
        请求路径 |/address/queryAddress
        --------|--------
        请求方法 | get
        参数    | userName
        返回值   | addresses
    1. #### 添加地址
        
        请求路径 |/address/addaddress
        --------|--------
        请求方法 | post
        参数    | receiver,address,zipcode,addressDetail
        返回值   | 

    1. #### 删除地址
        
        请求路径 |/address/updateAddress
        --------|--------
        请求方法 | post
        参数    | receiver,address,zipcode,addressDetail
        返回值   | 
