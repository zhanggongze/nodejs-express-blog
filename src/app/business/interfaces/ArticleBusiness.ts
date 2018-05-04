/**
 * Created by zhanggongze
 */

import BaseBusiness = require("./../BaseBusiness");
import IArticleModel = require("./../../model/interfaces/ArticleModel");

interface ArticleBusiness extends BaseBusiness<IArticleModel> {}
export = ArticleBusiness;