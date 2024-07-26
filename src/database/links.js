import { db } from "./db";
export class linksDB {
  get() {
    return db.linksDB.toArray();
  }
  static getInstance() {
    return new linksDB();
  }
}
