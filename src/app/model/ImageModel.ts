/**
 * Created by zhanggongze on 29-9-2017.
 */

import IImageModel = require('./interfaces/ImageModel');

class ImageModel {

    private _ImageModel: IImageModel;

    constructor(imageModel: IImageModel) {
        this._ImageModel = imageModel;
    }
    get title (): string {
        return this._ImageModel.src;
    }

    get content (): string {
        return this._ImageModel.type;
    }

    get date (): number {
        return this._ImageModel.date;
    }
    
}
Object.seal(ImageModel);
export =  ImageModel;