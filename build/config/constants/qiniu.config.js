"use strict";
/**
 * Created by zhanggongze on 2017-10-7.
 */
var qiniuConfig = /** @class */ (function () {
    function qiniuConfig() {
    }
    qiniuConfig.AccessKey = 'zKaJ76-Kpm8cm_KdOEi74MA5z61qS2qKXZIOoMOh';
    qiniuConfig.SecretKey = 'v4aKVhbT9aVTQrNVAiIVL3O6VvJFX9WnogMJwiKf';
    qiniuConfig.Bucket = 'images';
    qiniuConfig.Port = '3000';
    qiniuConfig.UptokenUrl = '/image/uptoken';
    qiniuConfig.Domain = 'http://oxcnsn9hv.bkt.clouddn.com/';
    return qiniuConfig;
}());
Object.seal(qiniuConfig);
module.exports = qiniuConfig;
