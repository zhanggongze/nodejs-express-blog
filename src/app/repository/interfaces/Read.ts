/**
 * Created by zhanggongze
 */

interface Read<T> {
    retrieve: (page,rows,callback: (error: any, result: any)=> void)=> void;
    findById: (id: string, callback: (error:any, result: T) => void) => void;
}

export = Read;