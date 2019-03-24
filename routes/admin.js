const express = require('express');
const router = express.Router();
const connection = require('../common/connect-mysql');
const response = require('../common/response');
const validator = require('validator');
router.post("/login", function (req, res) {
    let params = req.body;
    let username=params.username;
    let password=params.password;
    if(validator.isEmpty(username)){
        return res.jsonp(new response(false,"请输入用户名"));
    }
    if(!validator.isLength(password,{min:6,max:30})){
        return res.jsonp(new response(false,"密码的长度不能小于6位并且不能大于30位！"));
    }
    if(validator.isEmpty(password)){
        return res.jsonp(new response(false,"请输入密码"));
    }
    let url = `select * from admin where username='${username}' limit 1`;
    connection.query(url, function (error, data) {
        if (error) {
            console.log(error);
            return res.jsonp(new response(false));
        } else {
            if (data.length > 0 && data[0].password == password) {
                req.session.adminId = data[0].id; // 登录成功，设置 session
                res.jsonp(new response(true))
            } else {
                res.jsonp(new response(false, '密码错误'))
            }
        }
    });
});

router.get("/logout", (req, res) => {
    req.session.adminId = null; // 删除session
    res.json(new response(true))
});
router.get("/checkLogin", (req, res) => {
    if (req.session.adminId != null) {
        res.json(new response(true))
    } else {
        res.json(new response(false))
    }
});

module.exports = router;