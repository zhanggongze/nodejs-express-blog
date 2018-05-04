"use strict";
/**
 * Created by zhanggongze
 */
var Mongoose = require("mongoose");
var production = require("./../../config/constants/production");
var development = require("./../../config/constants/development");
var DataAccess = /** @class */ (function () {
    function DataAccess() {
        DataAccess.connect();
    }
    DataAccess.connect = function () {
        if (this.mongooseInstance)
            return this.mongooseInstance;
        this.mongooseConnection = Mongoose.connection;
        this.mongooseConnection.once("open", function () {
            console.log("Connected to mongodb.");
        });
        // 通过NODE_ENV来设置环境变量，如果没有指定则默认为开发环境
        var env = process.env.NODE_ENV || 'development';
        console.log(env);
        if (env == 'production') {
            this.config = production;
            console.log('Load config: [%s]', env);
        }
        else if (env == 'development') {
            this.config = development;
            console.log('Load config: [%s]', env);
        }
        console.log(this.config.DB_CONNECTION_STRING);
        this.mongooseInstance = Mongoose.connect(this.config.DB_CONNECTION_STRING, { user: this.config.user, pass: this.config.password });
        return this.mongooseInstance;
    };
    return DataAccess;
}());
DataAccess.connect();
module.exports = DataAccess;
