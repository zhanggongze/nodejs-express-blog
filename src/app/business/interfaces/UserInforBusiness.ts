/**
 * Created by zhanggongze
 */

import BaseBusiness = require("./../BaseBusiness");
import IUserModel = require("./../../model/interfaces/UserInforModel");

interface UserBusiness extends BaseBusiness<IUserModel> {}
export = UserBusiness;