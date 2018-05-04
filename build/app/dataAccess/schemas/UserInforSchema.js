"use strict";
/**
 * Created by zhanggongze
 */
var DataAccess = require("../DataAccess");
var mongoose = DataAccess.mongooseInstance;
var mongooseConnection = DataAccess.mongooseConnection;
var UserInforSchema = /** @class */ (function () {
    function UserInforSchema() {
    }
    Object.defineProperty(UserInforSchema, "schema", {
        get: function () {
            var schema = mongoose.Schema({
                name: {
                    type: String,
                    required: true
                },
                password: {
                    type: String,
                    required: true
                }
            });
            return schema;
        },
        enumerable: true,
        configurable: true
    });
    return UserInforSchema;
}());
var schema = mongooseConnection.model("users", UserInforSchema.schema);
"";
module.exports = schema;
