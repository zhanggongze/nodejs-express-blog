/**
 * Created by zhanggongze
 */

interface Read<T> {
    retrieve: (page,rows,callback: (error: any, result: T)=> void)=> void ;
    findById: (_id: string, callback: (error:any, result: T) => void) => void;

}

export = Read;