/**
 * Created by zhanggongze on 1-10-2017.
 */

import ImageRepository = require("./../repository/ImageRepository");
import IImageBusiness = require("./interfaces/ImageBusiness");
import IImageModel = require("./../model/interfaces/ImageModel");
import ImageModel = require("./../model/ImageModel");


class ImageBusiness implements IImageBusiness {

    private _imageRepository: ImageRepository;

    constructor () {
        this._imageRepository = new ImageRepository();
    }

    create (item: IImageModel, callback: (error: any, result: any) => void) {
        this._imageRepository.create(item, callback);
    }

    retrieve (page,rows,callback: (error: any, result: any) => void) {
        this._imageRepository.retrieve(page,rows,callback);
    }
    listType (type,page,rows,callback: (error: any, result: any) => void) {
        this._imageRepository.listType(type,page,rows,callback);
    }

    update (_id: string, item: IImageModel, callback: (error: any, result: any) => void) {

        this._imageRepository.findById(_id, (err, res) => {
            if(err) callback(err, res);

            else
                this._imageRepository.update(res._id, item, callback);

        });
    }

    delete (_id: string, callback:(error: any, result: any) => void) {
        this._imageRepository.delete(_id , callback);
    }

    findById (_id: string, callback: (error: any, result: IImageModel) => void) {
        this._imageRepository.findById(_id, callback);
    }

}


Object.seal(ImageBusiness);
export = ImageBusiness;