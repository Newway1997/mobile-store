const express = require('express');
const router = express.Router();
const response = require('../common/response');
const connection = require('../common/connect-mysql');

router.post("/addCart", function (req, res) {
    let params = req.body;
    let sql = `insert into cart (userId,productId,num,size) values((select id from user where username='${req.session.userName}'),'${params.productId}','${params.num}','${params.size}')`;
    connection.query(sql, function (error, data, fields) {
        if (error) {
            console.log(error);
            res.jsonp(new response(false,"服务器错误"));
        } else {

            res.jsonp(new response());
        }
    });
});

router.get("/getCart", (req, res) => {
    let userName = req.session.userName;
    let sql = `SELECT productId,imgUrl,a.num,a.size,proName,curPrice,originPrice from (SELECT * from cart where userId=(select id from user where username='${userName}')) a,product b where a.productId=b.Id`
    connection.query(sql, function (error, data, fields) {
        if (error) {
            console.log(error);
            res.jsonp(new response(false,"服务器错误"));
        } else {
            let response1=new response(true);
            response1.data=data;
            res.jsonp(response1);
        }
    });

});
module.exports=router;