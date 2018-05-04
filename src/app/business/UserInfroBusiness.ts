/**
 * Created by zhanggongze on 1-10-2017.
 */

import UserRepository = require("./../repository/UserInforRepository");
import IUserBusiness = require("./interfaces/UserInforBusiness");
import IUserModel = require("./../model/interfaces/UserInforModel");
import UserModel = require("./../model/UserModel");


class UserBusiness implements IUserBusiness {

    private _userRepository: UserRepository;

    constructor () {
        this._userRepository = new UserRepository();
    }

    auth (page,rows,callback: (error: any, result: any) => void) {
        this._userRepository.retrieve(page,rows,callback);
    }
    create (item: any, callback: (error: any, result: any) => void) {
        this._userRepository.create(item, callback);
    }

    retrieve (page,rows,callback: (error: any, result: any) => void) {
        this._userRepository.retrieve(page,rows,callback);
    }
    listType (type,page,rows,callback: (error: any, result: any) => void) {
        this._userRepository.listType(type,page,rows,callback);
    }

    update (_id: string, item: any, callback: (error: any, result: any) => void) {

        this._userRepository.findById(_id, (err, res) => {
            if(err) callback(err, res);

            else
                this._userRepository.update(res._id, item, callback);

        });
    }

    delete (_id: string, callback:(error: any, result: any) => void) {
        this._userRepository.delete(_id , callback);
    }

    findById (_id: string, callback: (error: any, result: any) => void) {
        this._userRepository.findById(_id, callback);
    }
    
    findOne (query: any, callback: (error: any, result: any) => void) {
        this._userRepository.findOne(query, callback);
    }

}


Object.seal(UserBusiness);
export = UserBusiness;