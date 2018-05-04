/**
 * Created by zhanggongze
 */

import express = require("express");
import ArticleBusiness = require("./../app/business/ArticleBusiness");
import IBaseController = require("./BaseController");
import ArticleModel = require("./../app/model/interfaces/ArticleModel");

import qiniu = require("qiniu");
import config = require("./../config/constants/qiniu.config");

class ArticleController implements IBaseController<any>{

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
            try {

                  var article: ArticleModel = <ArticleModel>req['body'];

                  article.date = new Date();

                  var articleBusiness = new ArticleBusiness();

                  articleBusiness.create(article, (error, result) => {
                        if (error) res.send({ "error": "error" });
                        else res.send({ "success": "success" });
                  });

                  //res.send(hero);

            }
            catch (e) {
                  console.log(e);
                  res.send({ "error": "error in your request" });

            }
      }
      update(req: express.Request, res: express.Response): void {
            try {

                  var article: ArticleModel = <ArticleModel>req["body"];
                  var _id: string = req.params._id;
                  var articleBusiness = new ArticleBusiness();
                  articleBusiness.update(_id, article, (error, result) => {
                        if (error) res.send({ "error": "error" });
                        else res.send({ "success": "success" });
                  });

            }
            catch (e) {
                  console.log(e);
                  res.send({ "error": "error in your request" });

            }
      }
      delete(req: express.Request, res: express.Response): void {
            try {

                  var _id: string = req.params._id;
                  var articleBusiness = new ArticleBusiness();
                  articleBusiness.delete(_id, (error, result) => {
                        if (error) res.send({ "error": "error" });
                        else res.send({ "success": "success" });
                  });

            }
            catch (e) {
                  console.log(e);
                  res.send({ "error": "error in your request" });

            }
      }
      
      retrieve(req, res: express.Response): void {
            try {

                  //分页
                  let page = parseInt(req['body'].page);
                  let rows = parseInt(req['body'].rows);

                  var articleBusiness = new ArticleBusiness();

                  articleBusiness.retrieve(page, rows, (error, rs) => {
                        //获取总条数
                        articleBusiness.retrieve(0, 0, (error, result) => {

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
                  console.log(e);
                  res.send({ "error": "error in your request" });

            }
      }
      listType(req: express.Request, res: express.Response): void {
            try {
                  var type = req['body'].type;

                //   console.log(req['body']);
                  //分页
                  let page = parseInt(req['body'].page);
                  let rows = parseInt(req['body'].rows);

                  var articleBusiness = new ArticleBusiness();
                  articleBusiness.listType(type, page, rows, (error, rs) => {
                        //总数
                        articleBusiness.listType(type, 0, 0, (error, result) => {
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
                  console.log(e);
                  res.send({ "error": "error in your request" });

            }
      }
      findById(req: express.Request, res: express.Response): void {
            try {

                  var _id: string = req.params._id;

                  var articleBusiness = new ArticleBusiness();
                  articleBusiness.findById(_id, (error, result) => {
                        if (error) res.send({ "error": "error" });
                        else res.send(result);
                  });
            }
            catch (e) {
                  console.log(e);
                  res.send({ "error": "error in your request" });

            }
      }


}
export = ArticleController;