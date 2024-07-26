import {db} from './db'
export class tickets { 
    get(){
        return db.tickets.toArray();
    }
    static getInstance(){
        return new tickets();
    }
}