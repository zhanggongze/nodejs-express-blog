/**
 * Created by zhanggongze
 */

import DataAccess = require('../DataAccess');
import IImageModel = require("./../../model/interfaces/ImageModel");

var mongoose = DataAccess.mongooseInstance;
var mongooseConnection = DataAccess.mongooseConnection;

class ImageSchema {

    static get schema () {
        var schema =  mongoose.Schema({
            src : {
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
    }
}
var schema = mongooseConnection.model<IImageModel>("ImageView", ImageSchema.schema);
export = schema;""