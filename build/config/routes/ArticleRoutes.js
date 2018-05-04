"use strict";
/**
 * Created by zhanggongze
 */
var express = require("express");
var ArticleController = require("./../../controllers/ArticleController");
var tokenCheck = require("../routes/TokenCheck");
var router = express.Router();
var ArticleRoutes = /** @class */ (function () {
    function ArticleRoutes() {
        this._articleController = new ArticleController();
    }
    Object.defineProperty(ArticleRoutes.prototype, "routes", {
        get: function () {
            var controller = this._articleController;
            //校验token
            var $token = new tokenCheck().check_api_token;
            router.post("/create", $token, controller.create);
            router.get("/uptoken", $token, controller.uptoken);
            router.put("/update/:_id", $token, controller.update);
            router.post("/list", $token, controller.retrieve);
            router.post("/listType", $token, controller.listType);
            router.get("/findOne/:_id", $token, controller.findById);
            router.delete("/delete/:_id", $token, controller.delete);
            return router;
        },
        enumerable: true,
        configurable: true
    });
    return ArticleRoutes;
}());
Object.seal(ArticleRoutes);
module.exports = ArticleRoutes;
