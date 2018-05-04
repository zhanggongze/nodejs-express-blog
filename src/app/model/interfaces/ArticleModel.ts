/**
 * Created by zhanggongze
 */

import mongoose = require("mongoose");

interface ArticleModel extends mongoose.Document {
    title: string;
    content: string;
    date:any ;
    type:any ;
}

export = ArticleModel;