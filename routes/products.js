const express = require('express');
const router = express.Router();
const multer = require('multer');
const path=require('path');
const fs=require('fs')
const response = require('../common/response');
const connection = require('../common/connect-mysql');
const validator = require('validator');
const upload = multer({
    dest: 'upload_tmp/'
});

router.get("/queryProduct", (req, res) => {
    let proName = req.query.proName;
    if (proName) {
        proName = decodeURI(proName);
    } else {
        proName = '';
    }
    let pageSize = parseInt(req.query.pageSize) || 6;
    let curPage = parseInt(req.query.page) || 1;
    let start = (curPage - 1) * pageSize;
    let price = req.query.price;
    let secondCategory=req.query.secondCategory;

    let sql = 'SELECT * from product ';
    if(proName){
        sql+=`where proName like '%${proName}%' and status=1`;
    }
    else if(secondCategory){
        sql+=`where brandId=${secondCategory} and status=1`
    }else{
        sql+='where status=1'
    }
    if (price == 1) {
        sql +=` ORDER BY curprice limit ${start} , ${pageSize}`;
    } else if (price == 2) {
        sql +=` ORDER BY curprice DESC limit ${start} , ${pageSize}`;
    }
    console.log(sql)
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
router.get("/queryProductDetail", (req, res) => {
    let id = req.query.id;
    if(validator.isEmpty(id)){
        res.jsonp(new response(false,"请输入ID"))
    }
    if(!validator.isNumeric(id)){
        res.jsonp(new response(false,"无效ID号"))
    }
    let sql = `SELECT * from product where id=${id} and status=1`;
    connection.query(sql, function (error, data, fields) {
        if (error) {
            res.jsonp(new response(false,"服务器错误"));
        } else {
            let response1=new response(true);
            response1.data=data;
            res.jsonp(response1);
        }
    });

});

//管理员操作
router.get("/queryProductDetailList", (req, res) => {
    let pageSize = parseInt(req.query.pageSize) || 6;
    let curPage = parseInt(req.query.page) || 1;
    let start = (curPage - 1) * pageSize;
    connection.query(`SELECT * from product limit ${start},${pageSize}`, function (error, data, fields) {
        if (error) {
            res.jsonp(new response(false,"服务器错误"));
        } else {
            let response1=new response(true);
            response1.data=data;
            res.jsonp(response1);
        }
    });

});

router.post("/addProduct", upload.any(), function (req, res) {
    if(req.files.length<1){
        return response(false,"请输入文件");
    }
    let params = req.body;
    let img = req.files[0];
    let imgtype = img.mimetype;
    let last = imgtype.split('/')[1];
    let newname = img.filename + '.' + last;
    if ((imgtype != 'image/jpg' && imgtype != 'image/png')) {
        fs.unlink(img.path);
        res.jsonp(new response(false,"文件格式错误"));
    } else {
        fs.renameSync(img.path, path.join(__dirname, '../public/images/') + newname);
        let sql = `insert into product (proName,proDesc,curPrice,num,originPrice,size,status,imgUrl,brandId) values ('${params.proName}','${params.proDesc}','${params.curPrice}','${params.num}','${params.originPrice}','${params.size}',1,'${newname}','${params.firstCategory}')`;
        connection.query(sql, function (error, data, fields) {
            if (error) {
                res.jsonp(new response(false,"服务器错误"));
            } else {
                res.jsonp(new response());
            }
        });
    }


});

router.get("/disableProduct", (req, res) => {
    let id = req.query.id;
    if(validator.isEmpty(id)){
        res.jsonp(new response(false,"请输入ID"))
    }
    if(!validator.isNumeric(id)){
        res.jsonp(new response(false,"无效ID号"))
    }
    let sql = ` update product set status=1 where id=${id}`;
    connection.query(sql, function (error, data, fields) {
        if (error) {
            res.jsonp(new response(false,"服务器错误"));
        } else {
            res.jsonp(new response());
        }
    });

});
router.get("/enableProduct", (req, res) => {
    let id = req.query.id;
    if(validator.isEmpty(id)){
        res.jsonp(new response(false,"请输入ID"))
    }
    if(!validator.isNumeric(id)){
        res.jsonp(new response(false,"无效ID号"))
    }
    let sql = ` update product set status=0 where id=${id}`;
    connection.query(sql, function (error, data, fields) {
        if (error) {
            res.jsonp(new response(false,"服务器错误"));
        } else {
            res.jsonp(new response());
        }
    });

});

module.exports = router;