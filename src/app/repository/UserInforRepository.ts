/**
 * Created by zhanggongze
 */

import UserModel = require("./../model/UserModel");
import IUserInforModel = require("./../model/interfaces/UserInforModel");
import UserSchema = require("./../dataAccess/schemas/UserInforSchema");
import RepositoryBase = require("./BaseRepository");

class UserRepository  extends RepositoryBase<IUserInforModel> {
    constructor () {
        super(UserSchema);
    }
}

Object.seal(UserRepository);
export = UserRepository;