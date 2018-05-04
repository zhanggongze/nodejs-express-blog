"use strict";
/**
 * Created by zhanggongze
 */
var UserBusiness = require("./../app/business/UserInfroBusiness");
var qiniu = require("qiniu");
var config = require("./../config/constants/qiniu.config");
var jwt = require("jsonwebtoken");
var crypto = require("crypto");
//引入生成随机数的
var Base64 = require("./../utils/base64");
//引入baset64加密的
var Random = require("./../utils/random");
var UserController = /** @class */ (function () {
    function UserController() {
    }
    UserController.prototype.auth = function (req, res) {
        var uerInfor = req["body"];
        var password = uerInfor.password;
        var userBusiness = new UserBusiness();
        userBusiness.findOne({ "name": uerInfor['name'] }, function (error, result) {
            if (error) {
                res.status(400).send({ ret_code: 400, ret_msg: 'error' });
            }
            else if (!result) {
                res.status(401).send({ ret_code: 401, ret_msg: '用户不存在！！' });
            }
            else {
                //1.获取到的密码截取前面随机数通过base64加密的结果
                var base64Random = result['password'].substring(0, 12);
                //2.将第一步的结果与用户输入的密码拼接
                var newPas = base64Random + password;
                //3.将第二步的结果进行MD5加密
                var md5 = crypto.createHash("md5");
                var md5Pas = md5.update(newPas).digest("hex");
                //4.将第三步进行base64加密
                var base64 = new Base64();
                var base64Md5 = base64.encode(md5Pas);
                //5.将第一步与第四步拼接
                var lastPassword = base64Random + base64Md5;
                if (lastPassword != result['password']) {
                    res.status(401).send({ ret_code: 401, ret_msg: '密码错误！！' });
                }
                else {
                    console.log(jwt);
                    // 创建token
                    var o = JSON.stringify(result);
                    var token = jwt.sign({ token: o, iat: 30 }, 'shhhhh');
                    // json格式返回token
                    res.json({
                        success: true,
                        message: 'Enjoy your token!',
                        token: token
                    });
                }
            }
        });
    };
    UserController.prototype.logout = function (req, res) {
        res.clearCookie('zhanggongze');
        res.json({ ret_code: 0, ret_msg: '退出成功' });
    };
    ;
    UserController.prototype.register = function (req, res) {
        var uerInfor = req["body"];
        //1.生成8位的随机数
        var random = new Random();
        var randomWord = random.random(false, 8);
        var base64 = new Base64();
        //2.对生成的随机数加密
        var base64Random = base64.encode(randomWord);
        //3.将第二步的值与密码拼接
        var password = uerInfor.password;
        var newPas = base64Random + password;
        var md5 = crypto.createHash("md5");
        //4.将第三步的进行md5加密
        var md5Pas = md5.update(newPas).digest("hex");
        //5.将第四步进行base64加密
        var base64Md5 = base64.encode(md5Pas);
        //6.将第二步与第五步拼接
        var lastPassword = base64Random + base64Md5;
        uerInfor.password = lastPassword;
        var userBusiness = new UserBusiness();
        userBusiness.findOne({ "name": uerInfor['name'] }, function (error, result) {
            if (error) {
                res.status(400).send({ "error": "error" });
            }
            else if (result) {
                res.status(401).send({ "success": '用户已注册！！！' });
            }
            else {
                userBusiness.create(uerInfor, function (error, result) {
                    if (error)
                        res.send({ "error": "error" });
                    else
                        res.send({ "success": '用户注册成功！！！' });
                });
            }
        });
    };
    UserController.prototype.uptoken = function (req, res) {
        var mac = new qiniu.auth.digest.Mac(config.AccessKey, config.SecretKey);
        var options = {
            scope: config.Bucket,
            deleteAfterDays: 7,
        };
        var putPolicy = new qiniu.rs.PutPolicy(options);
        var token = putPolicy.uploadToken(mac);
        res.json({ "uptoken": token });
    };
    UserController.prototype.create = function (req, res) {
        res.send({ "success": 'afasfaf' });
    };
    UserController.prototype.update = function (req, res) {
        try {
            var article = req["body"];
            var _id = req.params._id;
            var UserBusiness = new UserBusiness();
            UserBusiness.update(_id, article, function (error, result) {
                if (error)
                    res.send({ "error": "error" });
                else
                    res.send({ "success": "success" });
            });
        }
        catch (e) {
            res.send({ "error": "error in your request" });
        }
    };
    UserController.prototype.delete = function (req, res) {
        try {
            var _id = req.params._id;
            var UserBusiness = new UserBusiness();
            UserBusiness.delete(_id, function (error, result) {
                if (error)
                    res.send({ "error": "error" });
                else
                    res.send({ "success": "success" });
            });
        }
        catch (e) {
            // console.log(e);
            res.send({ "error": "error in your request" });
        }
    };
    UserController.prototype.retrieve = function (req, res) {
        try {
            var type = req['body'].type;
            //分页
            var page_1 = parseInt(req['body'].page);
            var rows_1 = parseInt(req['body'].rows);
            var UserBusiness = new UserBusiness();
            UserBusiness.retrieve(page_1, rows_1, function (error, rs) {
                //总数
                UserBusiness.listType(type, 0, 0, function (error, result) {
                    var oRsJson = {
                        items: rs,
                        total: result.length,
                        page: page_1,
                        rows: rows_1
                    };
                    if (error)
                        res.send({ "error": "error" });
                    else
                        res.send(oRsJson);
                });
            });
        }
        catch (e) {
            res.send({ "error": "error in your request" });
        }
    };
    UserController.prototype.listType = function (req, res) {
        try {
            var type = req['body'].type;
            //分页
            var page_2 = parseInt(req['body'].page);
            var rows_2 = parseInt(req['body'].rows);
            var _type = req.params._type;
            var UserBusiness = new UserBusiness();
            UserBusiness.listType(type, page_2, rows_2, function (error, rs) {
                //总数
                UserBusiness.listType(type, 0, 0, function (error, result) {
                    var oRsJson = {
                        items: rs,
                        total: result.length,
                        page: page_2,
                        rows: rows_2
                    };
                    if (error)
                        res.send({ "error": "error" });
                    else
                        res.send(oRsJson);
                });
            });
        }
        catch (e) {
            res.send({ "error": "error in your request" });
        }
    };
    UserController.prototype.findById = function (req, res) {
        try {
            var _id = req.params._id;
            var UserBusiness = new UserBusiness();
            UserBusiness.findById(_id, function (error, result) {
                if (error)
                    res.send({ "error": "error" });
                else
                    res.send(result);
            });
        }
        catch (e) {
            res.send({ "error": "error in your request" });
        }
    };
    return UserController;
}());
module.exports = UserController;
