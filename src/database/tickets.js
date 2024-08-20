import {dblocal} from './db'
export class tickets {
    get(){
        return dblocal.tickets.toArray();
    }
    static getInstance(){
        return new tickets();
    }
}
