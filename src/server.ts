/// <reference path="../typings/index.d.ts" />

import express = require('express');
import ArticleRoutes = require("./config/routes/Routes");
import bodyParser = require("body-parser");
import logger = require('morgan');
import favicon = require('serve-favicon');
import cookieParser = require('cookie-parser');
import path = require('path');
import jwt = require('jsonwebtoken');

let port: any = process.env.PORT || 3000;
let env:string = process.env.NODE_ENV || 'developement';

let app = express();

app.set('port', port);

app.use(bodyParser.json());
app.use(cookieParser());
app.use(logger('dev'));
app.use(bodyParser.urlencoded({ extended: false }));

//设置静态资源路径
app.use(favicon(path.join(__dirname, '../static', 'favicon.ico')));
app.use(express.static(path.join(__dirname, '../static')));

//跨域请求设置
app.all('*',function (req, res, next) {
    res.header('Access-Control-Allow-Origin', '*');
    // res.header('Access-Control-Max-Age', '3600');
    res.header('Access-Control-Allow-Headers', 'Content-Type, Content-Length, Authorization, Accept, X-Requested-With , yourHeaderFeild');
    res.header('Access-Control-Allow-Methods', 'PUT, POST, GET, DELETE, OPTIONS');
  
    if (req.method == 'OPTIONS') {
      res.send(200); /让options请求快速返回/
    }
    else {
      next();
    }
  });


// 接口路由
app.use('/api', new ArticleRoutes().routes);

//默认访问地址
let renderIndex = (req: express.Request, res: express.Response) => {
    res.sendFile(path.resolve(__dirname, '../views/client/index.html'));
}
let imgIndex = (req: express.Request, res: express.Response) => {
      res.sendFile(path.resolve(__dirname, '../views/admin/image.html'));
  }

let loginHtml = (req: express.Request, res: express.Response) => {
        res.sendFile(path.resolve(__dirname, '../views/admin/login.html'));
}

let registerHtml = (req: express.Request, res: express.Response) => {
        res.sendFile(path.resolve(__dirname, '../views/admin/register.html'));
}
app.get('/', loginHtml);
app.get('/login', loginHtml);
app.get('/article', renderIndex);
// app.get('/image', imgIndex);
app.get('/image', imgIndex);
app.get('/register', registerHtml);


if(env === 'developement'){
    app.use(function(err, req: express.Request, res: express.Response, next: express.NextFunction) {
        res.status(err.status || 500);
        res.json({
            error: err,
            message: err.message
        });
    });
}

// catch 404 and forward to error handler
app.use(function(req, res, next) {
    let err = new Error("Not Found");
    next(err);
});

// production error handler
// no stacktrace leaked to user
app.use(function(err: any, req: express.Request, res: express.Response, next: express.NextFunction) {
    res.status(err.status || 500);
    res.json({
        error: {},
        message: err.message
    });
});

export = app 