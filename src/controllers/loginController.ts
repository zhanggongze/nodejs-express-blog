/**
 * Created by zhanggongze
 */

import express = require("express");
import UserBusiness = require("./../app/business/UserInfroBusiness");
import IBaseController = require("./BaseController");
import UserModel = require("./../app/model/interfaces/UserInforModel");
import passport = require('passport');
import passportLocal = require('passport-local');
import qiniu = require("qiniu");
import config = require("./../config/constants/qiniu.config");
import jwt = require('jsonwebtoken');
import crypto = require("crypto");

//引入生成随机数的
import Base64 = require("./../utils/base64");
//引入baset64加密的
import Random = require("./../utils/random");

class UserController implements IBaseController<UserBusiness>{

    auth(req, res): void {

        let uerInfor = req["body"];
        let password = uerInfor.password;
        let userBusiness = new UserBusiness();

        userBusiness.findOne({ "name": uerInfor['name'] }, (error, result) => {

            if (error) {
                res.status(400).send({ ret_code: 400, ret_msg: 'error' });
            } else if (!result) {
                res.status(401).send({ ret_code: 401, ret_msg: '用户不存在！！' });
            } else {

                //1.获取到的密码截取前面随机数通过base64加密的结果
                let base64Random = result['password'].substring(0, 12);
                //2.将第一步的结果与用户输入的密码拼接
                let newPas = base64Random + password;
                //3.将第二步的结果进行MD5加密
                let md5 = crypto.createHash("md5");
                let md5Pas = md5.update(newPas).digest("hex");
                //4.将第三步进行base64加密
                let base64 = new Base64();
                let base64Md5 = base64.encode(md5Pas);
                //5.将第一步与第四步拼接
                let lastPassword = base64Random + base64Md5;



                if (lastPassword != result['password']) {
                    res.status(401).send({ ret_code: 401, ret_msg: '密码错误！！' });

                } else {
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

    }

    logout(req, res) {
        res.clearCookie('zhanggongze');
        res.json({ ret_code: 0, ret_msg: '退出成功' });
    };

    register(req: express.Request, res: express.Response): void {

        let uerInfor = req["body"];

        //1.生成8位的随机数
        let random = new Random();
        let randomWord = random.random(false, 8);
        let base64 = new Base64();
        //2.对生成的随机数加密
        let base64Random = base64.encode(randomWord);

        //3.将第二步的值与密码拼接
        let password = uerInfor.password;
        let newPas = base64Random + password;
        let md5 = crypto.createHash("md5");
        //4.将第三步的进行md5加密
        let md5Pas = md5.update(newPas).digest("hex");
        //5.将第四步进行base64加密
        let base64Md5 = base64.encode(md5Pas);
        //6.将第二步与第五步拼接
        let lastPassword = base64Random + base64Md5;

        uerInfor.password = lastPassword;

        var userBusiness = new UserBusiness();

        userBusiness.findOne({ "name": uerInfor['name'] }, (error, result) => {

            if (error) {
                res.status(400).send({ "error": "error" });
            } else if (result) {
                res.status(401).send({ "success": '用户已注册！！！' });
            } else {
                userBusiness.create(uerInfor, (error, result) => {

                    if (error) res.send({ "error": "error" });
                    else res.send({ "success": '用户注册成功！！！' });

                });
            }

        });

    }

    uptoken(req, res) {
        var mac = new qiniu.auth.digest.Mac(config.AccessKey, config.SecretKey);
        var options = {
            scope: config.Bucket,
            deleteAfterDays: 7,
        };
        var putPolicy = new qiniu.rs.PutPolicy(options);
        var token = putPolicy.uploadToken(mac);

        res.json({ "uptoken": token });
    }

    create(req: express.Request, res: express.Response): void {
        res.send({ "success": 'afasfaf' });
    }

    update(req: express.Request, res: express.Response): void {
        try {

            var article: UserModel = <UserModel>req["body"];
            var _id: string = req.params._id;
            var UserBusiness = new UserBusiness();
            UserBusiness.update(_id, article, (error, result) => {
                if (error) res.send({ "error": "error" });
                else res.send({ "success": "success" });
            });

        }
        catch (e) {
            res.send({ "error": "error in your request" });

        }
    }
    delete(req: express.Request, res: express.Response): void {
        try {

            var _id: string = req.params._id;
            var UserBusiness = new UserBusiness();
            UserBusiness.delete(_id, (error, result) => {
                if (error) res.send({ "error": "error" });
                else res.send({ "success": "success" });
            });

        }
        catch (e) {
            // console.log(e);
            res.send({ "error": "error in your request" });

        }
    }
    retrieve(req: express.Request, res: express.Response): void {
        try {

            var type = req['body'].type;

            //分页
            let page = parseInt(req['body'].page);
            let rows = parseInt(req['body'].rows);

            var UserBusiness = new UserBusiness();
            UserBusiness.retrieve(page, rows, (error, rs) => {
                //总数
                UserBusiness.listType(type, 0, 0, (error, result) => {
                    let oRsJson = {
                        items: rs,
                        total: result.length,
                        page: page,
                        rows: rows
                    }
                    if (error) res.send({ "error": "error" });
                    else res.send(oRsJson);
                });
            });

        }
        catch (e) {
            res.send({ "error": "error in your request" });

        }
    }
    listType(req: express.Request, res: express.Response): void {
        try {

            var type = req['body'].type;

            //分页
            let page = parseInt(req['body'].page);
            let rows = parseInt(req['body'].rows);


            var _type: string = req.params._type;
            var UserBusiness = new UserBusiness();
            UserBusiness.listType(type, page, rows, (error, rs) => {
                //总数
                UserBusiness.listType(type, 0, 0, (error, result) => {
                    let oRsJson = {
                        items: rs,
                        total: result.length,
                        page: page,
                        rows: rows
                    }
                    if (error) res.send({ "error": "error" });
                    else res.send(oRsJson);
                });
            });

        }
        catch (e) {
            res.send({ "error": "error in your request" });

        }
    }
    findById(req: express.Request, res: express.Response): void {
        try {

            var _id: string = req.params._id;
            var UserBusiness = new UserBusiness();

            UserBusiness.findById(_id, (error, result) => {
                if (error) res.send({ "error": "error" });
                else res.send(result);
            });
        }
        catch (e) {
            res.send({ "error": "error in your request" });

        }
    }


}
export = UserController;