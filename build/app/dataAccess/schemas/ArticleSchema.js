"use strict";
/**
 * Created by zhanggongze
 */
var DataAccess = require("../DataAccess");
var mongoose = DataAccess.mongooseInstance;
var mongooseConnection = DataAccess.mongooseConnection;
var ArticleSchema = /** @class */ (function () {
    function ArticleSchema() {
    }
    Object.defineProperty(ArticleSchema, "schema", {
        get: function () {
            var schema = mongoose.Schema({
                title: {
                    type: String,
                    required: true
                },
                content: {
                    type: String,
                    required: true
                },
                date: {
                    type: String,
                    required: true
                },
                type: {
                    type: String,
                    required: true
                }
            });
            return schema;
        },
        enumerable: true,
        configurable: true
    });
    return ArticleSchema;
}());
var schema = mongooseConnection.model("article", ArticleSchema.schema);
"";
module.exports = schema;
