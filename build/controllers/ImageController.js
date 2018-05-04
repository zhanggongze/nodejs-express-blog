"use strict";
/**
 * Created by zhanggongze
 */
var ImageBusiness = require("./../app/business/ImageBusiness");
var qiniu = require("qiniu");
var config = require("./../config/constants/qiniu.config");
var ImageController = /** @class */ (function () {
    function ImageController() {
    }
    ImageController.prototype.uptoken = function (req, res) {
        var mac = new qiniu.auth.digest.Mac(config.AccessKey, config.SecretKey);
        var options = {
            scope: config.Bucket,
            deleteAfterDays: 7,
        };
        var putPolicy = new qiniu.rs.PutPolicy(options);
        var token = putPolicy.uploadToken(mac);
        res.json({ "uptoken": token });
    };
    ImageController.prototype.create = function (req, res) {
        try {
            var article = req['body'];
            article.date = new Date();
            var imageBusiness = new ImageBusiness();
            imageBusiness.create(article, function (error, result) {
                if (error)
                    res.send({ "error": "error" });
                else
                    res.send({ "success": "success" });
            });
            //res.send(hero);
        }
        catch (e) {
            console.log(e);
            res.send({ "error": "error in your request" });
        }
    };
    ImageController.prototype.update = function (req, res) {
        try {
            var article = req["body"];
            var _id = req.params._id;
            var imageBusiness = new ImageBusiness();
            imageBusiness.update(_id, article, function (error, result) {
                if (error)
                    res.send({ "error": "error" });
                else
                    res.send({ "success": "success" });
            });
        }
        catch (e) {
            console.log(e);
            res.send({ "error": "error in your request" });
        }
    };
    ImageController.prototype.delete = function (req, res) {
        try {
            var _id = req.params._id;
            var imageBusiness = new ImageBusiness();
            imageBusiness.delete(_id, function (error, result) {
                if (error)
                    res.send({ "error": "error" });
                else
                    res.send({ "success": "success" });
            });
        }
        catch (e) {
            console.log(e);
            res.send({ "error": "error in your request" });
        }
    };
    ImageController.prototype.retrieve = function (req, res) {
        try {
            var type = req['body'].type;
            console.log(req['body']);
            //分页
            var page_1 = parseInt(req['body'].page);
            var rows_1 = parseInt(req['body'].rows);
            var imageBusiness = new ImageBusiness();
            imageBusiness.retrieve(page_1, rows_1, function (error, rs) {
                //总数
                imageBusiness.listType(type, 0, 0, function (error, result) {
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
            console.log(e);
            res.send({ "error": "error in your request" });
        }
    };
    ImageController.prototype.listType = function (req, res) {
        try {
            var type = req['body'].type;
            console.log(req['body']);
            //分页
            var page_2 = parseInt(req['body'].page);
            var rows_2 = parseInt(req['body'].rows);
            var _type = req.params._type;
            var imageBusiness = new ImageBusiness();
            imageBusiness.listType(type, page_2, rows_2, function (error, rs) {
                //总数
                imageBusiness.listType(type, 0, 0, function (error, result) {
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
            console.log(e);
            res.send({ "error": "error in your request" });
        }
    };
    ImageController.prototype.findById = function (req, res) {
        try {
            var _id = req.params._id;
            var imageBusiness = new ImageBusiness();
            imageBusiness.findById(_id, function (error, result) {
                if (error)
                    res.send({ "error": "error" });
                else
                    res.send(result);
            });
        }
        catch (e) {
            console.log(e);
            res.send({ "error": "error in your request" });
        }
    };
    return ImageController;
}());
module.exports = ImageController;
