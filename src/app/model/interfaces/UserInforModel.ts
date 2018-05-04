/**
 * Created by zhanggongze
 */

import mongoose = require("mongoose");

interface UserInforModel extends mongoose.Document {
    name: string;
    password: string;
}

export = UserInforModel;