/**
 * Created by zhanggongze
 */

import express = require("express");
import passport = require('passport');
import passportLocal = require('passport-local');

import loginController = require("./../../controllers/loginController");


let router = express.Router();

class LoginRoutes {

      private _loginController: loginController;

      constructor() {
            this._loginController = new loginController();

      }

      get routes() {

            let controller = this._loginController;

            router.post("/auth", controller.auth);
            router.post("/logout", controller.logout);
            router.post("/register", controller.register);

            return router;
      }


}

Object.seal(LoginRoutes);
export = LoginRoutes;