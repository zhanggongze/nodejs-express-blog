/**
 * Created by zhanggongze
 */

import ImageModel = require("./../model/ImageModel");
import IImageModel = require("./../model/interfaces/ImageModel");
import ImageSchema = require("./../dataAccess/schemas/ImageSchema");
import RepositoryBase = require("./BaseRepository");

class ImageRepository  extends RepositoryBase<IImageModel> {
    constructor () {
        super(ImageSchema);
    }
}

Object.seal(ImageRepository);
export = ImageRepository;