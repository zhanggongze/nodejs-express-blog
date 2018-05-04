"use strict";
/**
 * Created by zhanggongze on 29-9-2017.
 */
var ArticleModel = /** @class */ (function () {
    function ArticleModel(articleModel) {
        this._ArticleModel = articleModel;
    }
    Object.defineProperty(ArticleModel.prototype, "title", {
        get: function () {
            return this._ArticleModel.title;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(ArticleModel.prototype, "content", {
        get: function () {
            return this._ArticleModel.content;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(ArticleModel.prototype, "date", {
        get: function () {
            return this._ArticleModel.date;
        },
        enumerable: true,
        configurable: true
    });
    return ArticleModel;
}());
Object.seal(ArticleModel);
module.exports = ArticleModel;
