const express = require('express');
const router = express.Router();
const response = require('../common/response');
const connection = require('../common/connect-mysql');
const validator = require('validator');
/* GET users listing. */
// 登出
router.get("/logout", (req, res) => {
    req.session.userName = null; // 删除session
    res.json(new response(true));
});
// 登录
router.post("/login", function (req, res) {
    let username=req.body.username;
    let password=req.body.password;
    if(validator.isEmpty(username)){
        return res.jsonp(new response(false,"请输入用户名"));
    }
    if(!validator.isLength(password,{min:6,max:30})){
        return res.jsonp(new response(false,"密码的长度不能小于6位并且不能大于30位！"));
    }
    if(validator.isEmpty(password)){
        return res.jsonp(new response(false,"请输入密码"));
    }
    let sql = `select * from user where username='${username}' limit 1`;
    connection.query(sql, function (error, data, fields) {
        if (error) {
            console.log(error);
            res.jsonp(new response(false,"服务器错误"));
        } else {
            if (data.length > 0 && data[0].password === password) {
                if(data[0].status==0){
                    return res.jsonp(new response(false,"账号被封禁，无法登陆"));
                }
                req.session.userName = username; // 登录成功，设置 session
                res.jsonp(new response());
            } else {
                res.jsonp(new response(false,"用户名或密码错误"));
            }
        }
    });
});
//获取用户信息
router.get("/getUserInfo", (req, res) => {
    let username=req.session.userName;
    if (username) {
        connection.query(`select * from user where username='${username}'`, function (error, data, fields) {
            if (error) {
                console.log(error);
                res.jsonp(new response(false,"服务器错误"));
            } else {
                let response1=new response(true);
                response1.data=data[0]
                res.jsonp(response1);
            }
        });
    } else {
        res.jsonp(new response(false,"未登录"))
    }

});
//注册
router.post("/register", function (req, res) {
    let username = req.body.username;
    let password = req.body.password;
    let mobile=req.body.mobile;
    if(validator.isEmpty(username)){
        return res.jsonp(new response(false,"请输入用户名"));
    }
    if(!validator.isLength(password,{min:6,max:30})){
        return res.jsonp(new response(false,"密码的长度不能小于6位并且不能大于30位！"));
    }
    if(validator.isEmpty(password)){
        return res.jsonp(new response(false,"请输入密码"));
    }
    if(validator.isEmpty(mobile)){
        return res.jsonp(new response(false,"请输入手机号码"));
    }
    if(!validator.isMobilePhone(mobile)){
        return res.jsonp(new response(false,"号码不正确"));
    }
    let sql = `insert into user (username,password,mobile,status) values('${username}','${password}','${mobile}',1)`;
    connection.query(sql, function (error, data, fields) {
        if (error) {
            console.log(error);
            res.jsonp(new response(false,"服务器错误"));
        } else {
            res.jsonp(new response());
        }
    });
});

router.post("/modifypass", function (req, res) {
    let params = req.body;
    let newpass=params.newpass;
    let oldpass=params.oldpass;
    let username=req.session.userName;
    if(validator.isEmpty(newpass)){
        return res.jsonp(new response(false,"请输入密码"));
    }
    if(validator.isEmpty(oldpass)){
        return res.jsonp(new response(false,"请输入密码"));
    }
    if(!validator.isLength(oldpass,{min:6,max:30})||!validator.isLength(newpass,{min:6,max:30})){
        return res.jsonp(new response(false,"密码的长度不能小于6位并且不能大于30位！"));
    }
    if(validator.isEmpty(username)){
        return res.jsonp(new response(false,"请登录"));
    }

    let sql = `update user set password='${newpass}' where username='${username}' and password='${oldpass}'`;
    req.session.userName = null;
    connection.query(sql, function (error, data, fields) {
        if (error) {
            return res.jsonp(new response(false,"服务器错误"));
        } else {

            res.jsonp(new response());
        }
    });
});



//管理员操作
router.get("/queryUser", (req, res) => {
    let pageSize = parseInt(req.query.pageSize) || 6;
    let curPage = parseInt(req.query.page) || 1;
    let start = (curPage - 1) * pageSize;
    let sql = `SELECT * from user limit ${start},${pageSize}`;
    connection.query(sql, function (error, data, fields) {
        if (error) {
            return res.jsonp(new response(false,"服务器错误"));
        } else {
            let response1=new response(true);
            response1.data=data;
            res.jsonp(response1);
        }
    });

});
router.get("/disableUser", (req, res) => {
    let id = req.query.id;
    if(validator.isEmpty(id)){
        res.jsonp(new response(false,"请输入ID"))
    }
    if(!validator.isNumeric(id)){
        res.jsonp(new response(false,"无效ID号"))
    }
    let sql = ` update user set status=1 where id=${id}`;
    connection.query(sql, function (error, data, fields) {
        if (error) {
            return res.jsonp(new response(false,"服务器错误"));
        } else {
            res.jsonp(new response());
        }
    });

});
router.get("/enableUser", (req, res) => {
    const id = req.query.id;
    if(validator.isEmpty(id)){
        res.jsonp(new response(false,"请输入ID"))
    }
    if(!validator.isNumeric(id)){
        res.jsonp(new response(false,"无效ID号"))
    }
    const sql = ` update user set status=0 where id=${id}`;
    connection.query(sql, function (error, data, fields) {
        if (error) {
            console.log(error);
            return res.jsonp(new response(false,"服务器错误"));
        } else {
            res.jsonp(new response());
        }
    });
});

module.exports = router;
