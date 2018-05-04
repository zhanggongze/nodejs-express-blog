/**
 * Created by zhanggongze 生产环境
 */

class production {

    static user: string = '';
    static password: string = '';
    static DB_CONNECTION_STRING: string = "mongodb://localhost:38128/quickStart";
    // static DB_CONNECTION_STRING: string = "mongodb://139.224.113.85:27017/quickStart";

}
Object.seal(production);
export = production;