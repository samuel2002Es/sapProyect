import Dexie from "dexie";

export const db = new Dexie("vuedbsample");

db.version(1).stores({
  tickets:
    "++id, idTicket, region, Employee, workflow, description, creted, lastUpdated, receivedStatus, finalStatus, volume, comments, whys, measuresR,measuresP,errorSPOC,background,WhoDidQC",
});
db.version(1).stores({
  user: "++id, nameUser, Cnumber",
});
db.version(1).stores({
  notes: "++id, note",
});
db.version(1).stores({
  linksDB: "++id, link, title, caption, type",
});

//db.tickets.add({name: 'samuel espinoza figueroa'})
