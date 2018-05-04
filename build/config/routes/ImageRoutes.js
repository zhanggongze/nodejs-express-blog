"use strict";
/**
 * Created by zhanggongze
 */
var express = require("express");
var ImageController = require("./../../controllers/ImageController");
var tokenCheck = require("../routes/TokenCheck");
var router = express.Router();
var ImageRoutes = /** @class */ (function () {
    function ImageRoutes() {
        this._imageController = new ImageController();
    }
    Object.defineProperty(ImageRoutes.prototype, "routes", {
        get: function () {
            var controller = this._imageController;
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
    return ImageRoutes;
}());
Object.seal(ImageRoutes);
module.exports = ImageRoutes;
