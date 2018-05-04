/**
 * Created by zhanggongze
 */

import mongoose = require("mongoose");

interface ImageModel extends mongoose.Document {
    src: string;
    type: string;
    date:any ;
}

export = ImageModel;