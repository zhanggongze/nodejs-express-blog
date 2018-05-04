/**
 * Created by zhanggongze on 29-9-2017.
 */

import IUserModel = require('./interfaces/UserInforModel');

class UserModel {

    private _UserModel: IUserModel;

    constructor(userModel: IUserModel) {
        this._UserModel = userModel;
    }
    get name (): string {
        return this._UserModel.name;
    }

    get password (): string {
        return this._UserModel.password;
    }

    // get date (): number {
    //     return this._UserModel.date;
    // }
    
}
Object.seal(UserModel);
export =  UserModel;