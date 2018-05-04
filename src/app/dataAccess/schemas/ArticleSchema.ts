/**
 * Created by zhanggongze
 */

import DataAccess = require('../DataAccess');
import IArticleModel = require("./../../model/interfaces/ArticleModel");

var mongoose = DataAccess.mongooseInstance;
var mongooseConnection = DataAccess.mongooseConnection;

class ArticleSchema {

    static get schema () {
        var schema =  mongoose.Schema({
            title : {
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
    }
}
var schema = mongooseConnection.model<IArticleModel>("article", ArticleSchema.schema);
export = schema;""