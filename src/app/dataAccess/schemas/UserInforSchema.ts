/**
 * Created by zhanggongze
 */

import DataAccess = require('../DataAccess');
import IUserInforModel = require("./../../model/interfaces/UserInforModel");

var mongoose = DataAccess.mongooseInstance;
var mongooseConnection = DataAccess.mongooseConnection;

class UserInforSchema {

    static get schema () {
        var schema =  mongoose.Schema({
            name : {
                type: String,
                required: true
            },
            password: {
                type: String,
                required: true
            }
        });

        return schema;
    }
}
var schema = mongooseConnection.model<IUserInforModel>("users", UserInforSchema.schema);
export = schema;""