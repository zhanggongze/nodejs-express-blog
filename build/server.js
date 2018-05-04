"use strict";
/// <reference path="../typings/index.d.ts" />
var express = require("express");
var ArticleRoutes = require("./config/routes/Routes");
var bodyParser = require("body-parser");
var logger = require("morgan");
var favicon = require("serve-favicon");
var cookieParser = require("cookie-parser");
var path = require("path");
var port = process.env.PORT || 3000;
var env = process.env.NODE_ENV || 'developement';
var app = express();
app.set('port', port);
app.use(bodyParser.json());
app.use(cookieParser());
app.use(logger('dev'));
app.use(bodyParser.urlencoded({ extended: false }));
//设置静态资源路径
app.use(favicon(path.join(__dirname, '../static', 'favicon.ico')));
app.use(express.static(path.join(__dirname, '../static')));
//跨域请求设置
app.all('*', function (req, res, next) {
    res.header('Access-Control-Allow-Origin', '*');
    // res.header('Access-Control-Max-Age', '3600');
    res.header('Access-Control-Allow-Headers', 'Content-Type, Content-Length, Authorization, Accept, X-Requested-With , yourHeaderFeild');
    res.header('Access-Control-Allow-Methods', 'PUT, POST, GET, DELETE, OPTIONS');
    if (req.method == 'OPTIONS') {
        res.send(200);
        /让options请求快速返回/;
    }
    else {
        next();
    }
});
// 接口路由
app.use('/api', new ArticleRoutes().routes);
//默认访问地址
var renderIndex = function (req, res) {
    res.sendFile(path.resolve(__dirname, '../views/client/index.html'));
};
var imgIndex = function (req, res) {
    res.sendFile(path.resolve(__dirname, '../views/admin/image.html'));
};
var loginHtml = function (req, res) {
    res.sendFile(path.resolve(__dirname, '../views/admin/login.html'));
};
var registerHtml = function (req, res) {
    res.sendFile(path.resolve(__dirname, '../views/admin/register.html'));
};
app.get('/', loginHtml);
app.get('/login', loginHtml);
app.get('/article', renderIndex);
// app.get('/image', imgIndex);
app.get('/image', imgIndex);
app.get('/register', registerHtml);
if (env === 'developement') {
    app.use(function (err, req, res, next) {
        res.status(err.status || 500);
        res.json({
            error: err,
            message: err.message
        });
    });
}
// catch 404 and forward to error handler
app.use(function (req, res, next) {
    var err = new Error("Not Found");
    next(err);
});
// production error handler
// no stacktrace leaked to user
app.use(function (err, req, res, next) {
    res.status(err.status || 500);
    res.json({
        error: {},
        message: err.message
    });
});
module.exports = app;
