/**
 * Created by zhanggongze on 2017-10-7.
 */

class qiniuConfig {
    static AccessKey:string ='zKaJ76-Kpm8cm_KdOEi74MA5z61qS2qKXZIOoMOh';
    static SecretKey:string ='v4aKVhbT9aVTQrNVAiIVL3O6VvJFX9WnogMJwiKf';
    static Bucket:string ='images';
    static Port:string ='3000';
    static UptokenUrl:string ='/image/uptoken';
    static Domain:string ='http://oxcnsn9hv.bkt.clouddn.com/';
 
}
Object.seal(qiniuConfig);
export = qiniuConfig;