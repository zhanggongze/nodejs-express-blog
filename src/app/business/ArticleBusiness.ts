/**
 * Created by zhanggongze on 1-10-2017.
 */

import ArticleRepository = require("./../repository/ArticleRepository");
import IArticleBusiness = require("./interfaces/ArticleBusiness");
import IArticleModel = require("./../model/interfaces/ArticleModel");
import ArticleModel = require("./../model/ArticleModel");


class ArticleBusiness implements IArticleBusiness {

    private _articleRepository: ArticleRepository;

    constructor () {
        this._articleRepository = new ArticleRepository();
    }

    create (item: IArticleModel, callback: (error: any, result: any) => void) {
        this._articleRepository.create(item, callback);
    }

    retrieve (page,rows,callback: (error: any, result: any) => void) {
        this._articleRepository.retrieve(page,rows,callback);
    }
    listType (type,page,rows,callback: (error: any, result: any) => void) {
        this._articleRepository.listType(type,page,rows,callback);
    }

    update (_id: string, item: IArticleModel, callback: (error: any, result: any) => void) {

        this._articleRepository.findById(_id, (err, res) => {
            if(err) callback(err, res);

            else
                this._articleRepository.update(res._id, item, callback);

        });
    }

    delete (_id: string, callback:(error: any, result: any) => void) {
        this._articleRepository.delete(_id , callback);
    }

    findById (_id: string, callback: (error: any, result: IArticleModel) => void) {
        this._articleRepository.findById(_id, callback);
    }

}


Object.seal(ArticleBusiness);
export = ArticleBusiness;