/*!
 * Moajs Middle
 * Copyright(c) 2015-2019 Alfred Sang <shiren1118@126.com>
 * MIT Licensed
 */

import jwt = require('jsonwebtoken');//用来创建和确认用户信息摘要
// 检查用户会话

class TokenCheck {

    check_api_token(req, res, next) {
console.log(jwt);

        // console.log('检查post的信息或者url查询参数或者头信息');
        //检查post的信息或者url查询参数或者头信息
        var token = req.body.token || req.query.token || req.headers['x-access-token'] || req.headers['authorization'];
        // console.log(req.headers);
        // token = ;
        // 解析 token
        if (token) {
            // 确认token
            jwt.verify(token.split(' ')[1], 'shhhhh', function (err, decoded) {
                if (err) {
                    return res.json({ success: false, message: 'token信息错误.' });
                } else {
                    // 如果没问题就把解码后的信息保存到请求中，供后面的路由使用
                    req.api_user = decoded;
                    // console.dir(req.api_user);
                    next();
                }
            });
        } else {
            // 如果没有token，则返回错误
            return res.status(403).send({
                success: false,
                message: '没有提供token！'
            });
        }
    };

}

export = TokenCheck;