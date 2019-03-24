const express = require('express');
const router = express.Router();
const response = require('../common/response');
const connection = require('../common/connect-mysql');
const multer = require('multer');
const fs=require('fs');
const path=require('path');

const upload = multer({
    dest: 'upload_tmp/'
});

router.get("/firstcategory", (req, res) => {
    connection.query('SELECT * from categoryname', function (error, data, fields) {
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
router.get("/secondcategory", (req, res) => {
    connection.query('SELECT * from second_category where categoryId=' + req.query.id, function (error, data, fields) {
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
router.get("/queryTopCategoryPaging", (req, res) => {
    let pageSize = parseInt(req.query.pageSize) || 6;
    let curPage = parseInt(req.query.page) || 1;
    let start = (curPage - 1) * pageSize;
    connection.query(`SELECT * from categoryname limit ${start},${pageSize}`, function (error, data, fields) {
        if (error) {
            res.jsonp(new response(false,"服务器错误"));
        } else {
            let response1=new response(true);
            response1.data=data;
            res.jsonp(response1);
        }
    });
});

router.get("/querySecondCategoryPaging", (req, res) => {
    let pageSize = parseInt(req.query.pageSize) || 6;
    let curPage = parseInt(req.query.page) || 1;
    let start = (curPage - 1) * pageSize;
    connection.query(`SELECT * from second_category,categoryname where categoryname.id=second_category.categoryid limit ${start},${pageSize}`, function (error, data, fields) {
        if (error) {
            res.jsonp(new response(false,"服务器错误"));
        } else {
            let response1=new response(true);
            response1.data=data;
            res.jsonp(response1);
        }
    });

});
router.post("/addCategory", function (req, res) {
    let params = req.body;
    let sql = `insert into categoryname (categoryName,isDelete) values ('${params.categoryName}',1)`;
    connection.query(sql, function (error, data, fields) {
        if (error) {
            res.jsonp(new response(false,"服务器错误"));
        } else {
            res.jsonp(new response());
        }
    });
});
router.post("/addSecondCategory", upload.any(), function (req, res) {
    let params = req.body;
    let img = req.files[0];
    let imgtype = img.mimetype;
    let last = imgtype.split('/')[1];
    let newname = img.filename + '.' + last;
    if ((imgtype != 'image/jpg' && imgtype != 'image/png')) {
        fs.unlink(img.path);
        res.jsonp(new response(false,"服务器错误"));
    } else {
        fs.renameSync(img.path, path.join(__dirname, '../public/images/') + newname);
        let sql = `insert into second_category (brandName,categoryId,brandLogo) values ('${params.newCategoryName}',${params.firstCategory},'${newname}')`;
        connection.query(sql, function (error, data, fields) {
            if (error) {
                res.jsonp(new response(false,"服务器错误"));
            } else {
                res.jsonp(new response());
            }
        });
    }
});


module.exports = router;
