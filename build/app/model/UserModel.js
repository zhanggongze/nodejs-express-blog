"use strict";
/**
 * Created by zhanggongze on 29-9-2017.
 */
var UserModel = /** @class */ (function () {
    function UserModel(userModel) {
        this._UserModel = userModel;
    }
    Object.defineProperty(UserModel.prototype, "name", {
        get: function () {
            return this._UserModel.name;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(UserModel.prototype, "password", {
        get: function () {
            return this._UserModel.password;
        },
        enumerable: true,
        configurable: true
    });
    return UserModel;
}());
Object.seal(UserModel);
module.exports = UserModel;
