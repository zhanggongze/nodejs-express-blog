/**
 * Created by zhanggongze
 */

import ArticleModel = require("./../model/ArticleModel");
import IArticleModel = require("./../model/interfaces/ArticleModel");
import ArticleSchema = require("./../dataAccess/schemas/ArticleSchema");
import RepositoryBase = require("./BaseRepository");

class ArticleRepository  extends RepositoryBase<IArticleModel> {
    constructor () {
        super(ArticleSchema);
    }
}

Object.seal(ArticleRepository);
export = ArticleRepository;