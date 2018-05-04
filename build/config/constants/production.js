"use strict";
/**
 * Created by zhanggongze 生产环境
 */
var production = /** @class */ (function () {
    function production() {
    }
    production.user = '';
    production.password = '';
    production.DB_CONNECTION_STRING = "mongodb://localhost:38128/quickStart";
    return production;
}());
Object.seal(production);
module.exports = production;
