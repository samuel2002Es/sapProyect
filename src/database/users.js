import {db} from './db'
export class users {
    get(){
        return db.user.toArray();
    }
    static getInstance(){
        return new users();
    }
}
