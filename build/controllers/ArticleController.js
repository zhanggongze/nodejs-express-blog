"use strict";
/**
 * Created by zhanggongze
 */
var ArticleBusiness = require("./../app/business/ArticleBusiness");
var qiniu = require("qiniu");
var config = require("./../config/constants/qiniu.config");
var ArticleController = /** @class */ (function () {
    function ArticleController() {
    }
    ArticleController.prototype.uptoken = function (req, res) {
        var mac = new qiniu.auth.digest.Mac(config.AccessKey, config.SecretKey);
        var options = {
            scope: config.Bucket,
            deleteAfterDays: 7,
        };
        var putPolicy = new qiniu.rs.PutPolicy(options);
        var token = putPolicy.uploadToken(mac);
        res.json({ "uptoken": token });
    };
    ArticleController.prototype.create = function (req, res) {
        try {
            var article = req['body'];
            article.date = new Date();
            var articleBusiness = new ArticleBusiness();
            articleBusiness.create(article, function (error, result) {
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
    ArticleController.prototype.update = function (req, res) {
        try {
            var article = req["body"];
            var _id = req.params._id;
            var articleBusiness = new ArticleBusiness();
            articleBusiness.update(_id, article, function (error, result) {
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
    ArticleController.prototype.delete = function (req, res) {
        try {
            var _id = req.params._id;
            var articleBusiness = new ArticleBusiness();
            articleBusiness.delete(_id, function (error, result) {
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
    ArticleController.prototype.retrieve = function (req, res) {
        try {
            //分页
            var page_1 = parseInt(req['body'].page);
            var rows_1 = parseInt(req['body'].rows);
            var articleBusiness = new ArticleBusiness();
            articleBusiness.retrieve(page_1, rows_1, function (error, rs) {
                //获取总条数
                articleBusiness.retrieve(0, 0, function (error, result) {
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
    ArticleController.prototype.listType = function (req, res) {
        try {
            var type = req['body'].type;
            //   console.log(req['body']);
            //分页
            var page_2 = parseInt(req['body'].page);
            var rows_2 = parseInt(req['body'].rows);
            var articleBusiness = new ArticleBusiness();
            articleBusiness.listType(type, page_2, rows_2, function (error, rs) {
                //总数
                articleBusiness.listType(type, 0, 0, function (error, result) {
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
    ArticleController.prototype.findById = function (req, res) {
        try {
            var _id = req.params._id;
            var articleBusiness = new ArticleBusiness();
            articleBusiness.findById(_id, function (error, result) {
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
    return ArticleController;
}());
module.exports = ArticleController;
