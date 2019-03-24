const express = require('express');
const path = require('path');
const cookieParser = require('cookie-parser');
const logger = require('morgan');
const session = require('express-session');

const indexRouter = require('./routes/index');
const usersRouter = require('./routes/users');
const productRouter = require('./routes/products');
const adminRouter = require('./routes/admin');
const categoryRouter = require('./routes/category');
const addressRouter = require('./routes/address');
const cartRouter = require('./routes/cart')
const app = express();

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({extended: false}));
app.use(cookieParser());
app.use(session({
    secret: 'secret', // 对session id 相关的cookie 进行签名
    resave: true,
    saveUninitialized: false, // 是否保存未初始化的会话
    cookie: {
        maxAge: 1000 * 60 * 60 * 24, // 设置 session 的有效时间，单位毫秒
    },
}));


app.use('/page', function (req, res, next) {
    //未登录
    if (req.url.match('admin')) {
        if (!req.session.adminId) {
            if (!req.url.match('login')&& !req.url.match('index')) {
                let arr = req.url.split('/');
                res.redirect('/page' + arr.slice(0, arr.length - 1).join('/') + "/login.html");
                return;
            }
        }else{
            if(req.url.match('login')){
                res.redirect('/page/admin/user.html');
                return;
            }
        }
    } else {
        //未登录
        if (!req.session.userName) {
            if (!req.url.match('login') && !req.url.match('index')&&!req.url.match('register')) {
                let arr = req.url.split('/');
                res.redirect('/page' + arr.slice(0, arr.length - 1).join('/') + "/login.html");
                return;
            }
        }else{
            if(req.url.match('login')){
                res.redirect('/page/user.html');
                return;
            }
        }
    }
    if (req.url.indexOf('.html') == -1) {
        req.url += '.html';
    }
    next();
});

app.use(express.static(path.join(__dirname, 'public')));
app.use(express.static(path.join(__dirname, 'node_modules')));
app.use('/', indexRouter);
app.use('/user', usersRouter);
app.use('/product', productRouter);
app.use('/admin', adminRouter);
app.use('/category', categoryRouter);
app.use('/address', addressRouter);
app.use('/cart', cartRouter);
module.exports = app;
