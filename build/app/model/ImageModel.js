"use strict";
/**
 * Created by zhanggongze on 29-9-2017.
 */
var ImageModel = /** @class */ (function () {
    function ImageModel(imageModel) {
        this._ImageModel = imageModel;
    }
    Object.defineProperty(ImageModel.prototype, "title", {
        get: function () {
            return this._ImageModel.src;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(ImageModel.prototype, "content", {
        get: function () {
            return this._ImageModel.type;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(ImageModel.prototype, "date", {
        get: function () {
            return this._ImageModel.date;
        },
        enumerable: true,
        configurable: true
    });
    return ImageModel;
}());
Object.seal(ImageModel);
module.exports = ImageModel;
