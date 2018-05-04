/**
 * Created by zhanggongze
 */

import BaseBusiness = require("./../BaseBusiness");
import IImageModel = require("./../../model/interfaces/ImageModel");

interface ImageBusiness extends BaseBusiness<IImageModel> {}
export = ImageBusiness;