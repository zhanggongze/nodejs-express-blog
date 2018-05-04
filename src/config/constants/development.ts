/**
 * Created by zhanggongze 开发环境
 */

class development {

    static user: string = '';
    static password: string = '';
    static DB_CONNECTION_STRING: string = "mongodb://localhost:27017/quickStart";
//     static DB_CONNECTION_STRING: string = "mongodb://139.224.113.85:3001/quickStart";

}
Object.seal(development);
export = development;