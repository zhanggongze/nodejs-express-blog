/**
 * Created by zhanggongze
 */

import Mongoose = require("mongoose");
import production = require("./../../config/constants/production");
import development = require("./../../config/constants/development");

class DataAccess {
    static config:any;
    static mongooseInstance: any;
    static mongooseConnection: Mongoose.Connection;

    constructor () {
        DataAccess.connect();
    }

    static connect (): Mongoose.Connection {

        if(this.mongooseInstance) return this.mongooseInstance;

        this.mongooseConnection  = Mongoose.connection;
        this.mongooseConnection.once("open", () => {
            console.log("Connected to mongodb.");
        });

        // 通过NODE_ENV来设置环境变量，如果没有指定则默认为开发环境
        let env = process.env.NODE_ENV || 'development';

        console.log(env);

        if(env == 'production'){
            this.config = production;
            console.log('Load config: [%s]', env);
        }else if(env == 'development'){
            this.config = development;
              console.log('Load config: [%s]', env);
        }
        
        console.log(this.config.DB_CONNECTION_STRING);

        this.mongooseInstance = Mongoose.connect(this.config.DB_CONNECTION_STRING,{user: this.config.user, pass: this.config.password});
        return this.mongooseInstance;
    }
}

DataAccess.connect();
export = DataAccess;