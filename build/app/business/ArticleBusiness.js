"use strict";
/**
 * Created by zhanggongze on 1-10-2017.
 */
var ArticleRepository = require("./../repository/ArticleRepository");
var ArticleBusiness = /** @class */ (function () {
    function ArticleBusiness() {
        this._articleRepository = new ArticleRepository();
    }
    ArticleBusiness.prototype.create = function (item, callback) {
        this._articleRepository.create(item, callback);
    };
    ArticleBusiness.prototype.retrieve = function (page, rows, callback) {
        this._articleRepository.retrieve(page, rows, callback);
    };
    ArticleBusiness.prototype.listType = function (type, page, rows, callback) {
        this._articleRepository.listType(type, page, rows, callback);
    };
    ArticleBusiness.prototype.update = function (_id, item, callback) {
        var _this = this;
        this._articleRepository.findById(_id, function (err, res) {
            if (err)
                callback(err, res);
            else
                _this._articleRepository.update(res._id, item, callback);
        });
    };
    ArticleBusiness.prototype.delete = function (_id, callback) {
        this._articleRepository.delete(_id, callback);
    };
    ArticleBusiness.prototype.findById = function (_id, callback) {
        this._articleRepository.findById(_id, callback);
    };
    return ArticleBusiness;
}());
Object.seal(ArticleBusiness);
module.exports = ArticleBusiness;
