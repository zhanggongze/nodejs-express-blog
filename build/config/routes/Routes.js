"use strict";
/**
 * Created by zhanggongze
 */
var express = require("express");
var ArticleRoutes = require("../routes/ArticleRoutes");
var ImageRoutes = require("../routes/ImageRoutes");
var loginRoutes = require("../routes/loginRoutes");
var app = express();
var Routes = /** @class */ (function () {
    function Routes() {
    }
    Object.defineProperty(Routes.prototype, "routes", {
        get: function () {
            app.use("/article", new ArticleRoutes().routes);
            app.use("/image", new ImageRoutes().routes);
            app.use("/login", new loginRoutes().routes);
            return app;
        },
        enumerable: true,
        configurable: true
    });
    return Routes;
}());
module.exports = Routes;
