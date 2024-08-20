import {dblocal} from './db'
export class users {
    get(){
        return dblocal.user.toArray();
    }
    static getInstance(){
        return new users();
    }
}
