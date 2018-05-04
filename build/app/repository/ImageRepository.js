"use strict";
/**
 * Created by zhanggongze
 */
var __extends = (this && this.__extends) || (function () {
    var extendStatics = Object.setPrototypeOf ||
        ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
        function (d, b) { for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p]; };
    return function (d, b) {
        extendStatics(d, b);
        function __() { this.constructor = d; }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    };
})();
var ImageSchema = require("./../dataAccess/schemas/ImageSchema");
var RepositoryBase = require("./BaseRepository");
var ImageRepository = /** @class */ (function (_super) {
    __extends(ImageRepository, _super);
    function ImageRepository() {
        return _super.call(this, ImageSchema) || this;
    }
    return ImageRepository;
}(RepositoryBase));
Object.seal(ImageRepository);
module.exports = ImageRepository;
