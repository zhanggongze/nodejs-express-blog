/**
 * Created by zhanggongze
 */
import express = require('express');
import path = require('path');

import ArticleRoutes = require('../routes/ArticleRoutes');
import ImageRoutes = require('../routes/ImageRoutes');
import loginRoutes = require('../routes/loginRoutes');

let app = express();

class Routes {

    get routes() {

        app.use("/article", new ArticleRoutes().routes);
        app.use("/image", new ImageRoutes().routes);
        app.use("/login", new loginRoutes().routes);
        
        return app;
    }
    
}
export = Routes;