import { dblocal } from "./db";
export class linksDB {
  get() {
    return dblocal.linksDB.toArray();
  }
  static getInstance() {
    return new linksDB();
  }
}
