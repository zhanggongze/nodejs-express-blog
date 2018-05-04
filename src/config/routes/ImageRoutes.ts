/**
 * Created by zhanggongze
 */

import express = require("express");
import ImageController = require("./../../controllers/ImageController");
import tokenCheck = require('../routes/TokenCheck');



let router = express.Router();

class ImageRoutes {

    private _imageController: ImageController;

    constructor() {
        this._imageController = new ImageController();
    }

    get routes() {

        let controller = this._imageController;
        let $token = new tokenCheck().check_api_token;


        router.post("/create", $token, controller.create);
        router.get("/uptoken", $token, controller.uptoken);
        router.put("/update/:_id", $token, controller.update);
        router.post("/list", $token, controller.retrieve);
        router.post("/listType", $token, controller.listType);
        router.get("/findOne/:_id", $token, controller.findById);
        router.delete("/delete/:_id", $token, controller.delete);

        return router;
    }


}

Object.seal(ImageRoutes);
export = ImageRoutes;