import { dblocal } from "./db";
export class notes {
  get() {
    return dblocal.notes.toArray();
  }
  static getInstance() {
    return new notes();
  }
}
