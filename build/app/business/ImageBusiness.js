"use strict";
/**
 * Created by zhanggongze on 1-10-2017.
 */
var ImageRepository = require("./../repository/ImageRepository");
var ImageBusiness = /** @class */ (function () {
    function ImageBusiness() {
        this._imageRepository = new ImageRepository();
    }
    ImageBusiness.prototype.create = function (item, callback) {
        this._imageRepository.create(item, callback);
    };
    ImageBusiness.prototype.retrieve = function (page, rows, callback) {
        this._imageRepository.retrieve(page, rows, callback);
    };
    ImageBusiness.prototype.listType = function (type, page, rows, callback) {
        this._imageRepository.listType(type, page, rows, callback);
    };
    ImageBusiness.prototype.update = function (_id, item, callback) {
        var _this = this;
        this._imageRepository.findById(_id, function (err, res) {
            if (err)
                callback(err, res);
            else
                _this._imageRepository.update(res._id, item, callback);
        });
    };
    ImageBusiness.prototype.delete = function (_id, callback) {
        this._imageRepository.delete(_id, callback);
    };
    ImageBusiness.prototype.findById = function (_id, callback) {
        this._imageRepository.findById(_id, callback);
    };
    return ImageBusiness;
}());
Object.seal(ImageBusiness);
module.exports = ImageBusiness;
