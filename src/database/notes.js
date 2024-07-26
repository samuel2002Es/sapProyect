import { db } from "./db";
export class notes {
  get() {
    return db.notes.toArray();
  }
  static getInstance() {
    return new notes();
  }
}
