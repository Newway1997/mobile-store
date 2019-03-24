const express = require('express');
const router = express.Router();
const response = require('../common/response');
const connection = require('../common/connect-mysql');
const validator = require('validator');
router.get("/queryAddress", (req, res) => {
    let userName = req.session.userName;
    if (userName) {
        userName = decodeURI(userName);
    } else {
        userName = '';
    }
    let sql = `SELECT * from address where userId in (select userid from user where username='${userName}')`;
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


router.post("/addaddress", function (req, res) {
    let params = req.body;
    let sql = `insert into address (userid,receiver,address,zipcode,addressDetail,isDelete) values((SELECT id from user WHERE username = '${req.session.userName}'),'${params.receiver}','${params.address}','${params.zipcode}','${params.addressDetail}',1)`;
    connection.query(sql, function (error, data, fields) {
        if (error) {
            console.log(error);
            res.jsonp(new response(false,"服务器错误"));
        } else {
            res.jsonp(new response());
        }
    });
});

router.get("/deleteAddress", (req, res) => {
    let id=req.query.id;
    if(validator.isEmpty(id)){
        res.jsonp(new response(false,"请输入ID"))
    }
    if(!validator.isNumeric(id)){
        res.jsonp(new response(false,"无效ID号"))
    }
    let sql = `delete from address where id=${id}`;
    console.log(sql);
    connection.query(sql, function (error, data, fields) {
        if (error) {
            res.jsonp(new response(false,"服务器错误"));
        } else {
            res.jsonp(new response());
        }
    });
});
router.post("/updateAddress", function (req, res) {
    let params = req.body;
    let url = `update address set receiver='${params.receiver}',zipcode='${params.zipcode}',address='${params.address}',addressDetail='${params.addressDetail}' where id=${params.id}`;
    connection.query(url, function (error, data, fields) {
        if (error) {
            console.log(error);
            res.jsonp(new response(false,"服务器错误"));
        } else {
            res.jsonp(new response());
        }
    });
});
module.exports = router;