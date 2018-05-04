"use strict";
/**
 * Created by zhanggongze
 */
var express = require("express");
var loginController = require("./../../controllers/loginController");
var router = express.Router();
var LoginRoutes = /** @class */ (function () {
    function LoginRoutes() {
        this._loginController = new loginController();
    }
    Object.defineProperty(LoginRoutes.prototype, "routes", {
        get: function () {
            var controller = this._loginController;
            router.post("/auth", controller.auth);
            router.post("/logout", controller.logout);
            router.post("/register", controller.register);
            return router;
        },
        enumerable: true,
        configurable: true
    });
    return LoginRoutes;
}());
Object.seal(LoginRoutes);
module.exports = LoginRoutes;
