"use strict";
/**
 * Created by zhanggongze on 1-10-2017.
 */
var UserRepository = require("./../repository/UserInforRepository");
var UserBusiness = /** @class */ (function () {
    function UserBusiness() {
        this._userRepository = new UserRepository();
    }
    UserBusiness.prototype.auth = function (page, rows, callback) {
        this._userRepository.retrieve(page, rows, callback);
    };
    UserBusiness.prototype.create = function (item, callback) {
        this._userRepository.create(item, callback);
    };
    UserBusiness.prototype.retrieve = function (page, rows, callback) {
        this._userRepository.retrieve(page, rows, callback);
    };
    UserBusiness.prototype.listType = function (type, page, rows, callback) {
        this._userRepository.listType(type, page, rows, callback);
    };
    UserBusiness.prototype.update = function (_id, item, callback) {
        var _this = this;
        this._userRepository.findById(_id, function (err, res) {
            if (err)
                callback(err, res);
            else
                _this._userRepository.update(res._id, item, callback);
        });
    };
    UserBusiness.prototype.delete = function (_id, callback) {
        this._userRepository.delete(_id, callback);
    };
    UserBusiness.prototype.findById = function (_id, callback) {
        this._userRepository.findById(_id, callback);
    };
    UserBusiness.prototype.findOne = function (query, callback) {
        this._userRepository.findOne(query, callback);
    };
    return UserBusiness;
}());
Object.seal(UserBusiness);
module.exports = UserBusiness;
