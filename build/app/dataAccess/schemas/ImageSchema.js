"use strict";
/**
 * Created by zhanggongze
 */
var DataAccess = require("../DataAccess");
var mongoose = DataAccess.mongooseInstance;
var mongooseConnection = DataAccess.mongooseConnection;
var ImageSchema = /** @class */ (function () {
    function ImageSchema() {
    }
    Object.defineProperty(ImageSchema, "schema", {
        get: function () {
            var schema = mongoose.Schema({
                src: {
                    type: String,
                    required: true
                },
                type: {
                    type: String,
                    required: true
                },
                date: {
                    type: String,
                    required: true
                }
            });
            return schema;
        },
        enumerable: true,
        configurable: true
    });
    return ImageSchema;
}());
var schema = mongooseConnection.model("ImageView", ImageSchema.schema);
"";
module.exports = schema;
