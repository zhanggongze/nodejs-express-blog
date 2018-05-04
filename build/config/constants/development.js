"use strict";
/**
 * Created by zhanggongze 开发环境
 */
var development = /** @class */ (function () {
    function development() {
    }
    development.user = '';
    development.password = '';
    development.DB_CONNECTION_STRING = "mongodb://localhost:27017/quickStart";
    return development;
}());
Object.seal(development);
module.exports = development;
