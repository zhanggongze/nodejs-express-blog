/**
 * Created by zhanggongze on 29-9-2017.
 */

import IArticleModel = require('./interfaces/ArticleModel');

class ArticleModel {

    private _ArticleModel: IArticleModel;

    constructor(articleModel: IArticleModel) {
        this._ArticleModel = articleModel;
    }
    get title (): string {
        return this._ArticleModel.title;
    }

    get content (): string {
        return this._ArticleModel.content;
    }

    get date (): number {
        return this._ArticleModel.date;
    }
    
}
Object.seal(ArticleModel);
export =  ArticleModel;