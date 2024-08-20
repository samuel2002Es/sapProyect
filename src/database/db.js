import Dexie from "dexie";

export const dblocal = new Dexie("vuedbsample");

dblocal.version(1).stores({
  tickets:
    "++id, idTicket, region, Employee, workflow, description, creted, lastUpdated, receivedStatus, finalStatus, volume, comments, whys, measuresR,measuresP,errorSPOC,background,WhoDidQC",
});
dblocal.version(1).stores({
  user: "++id, nameUser, Cnumber",
});
dblocal.version(1).stores({
  notes: "++id, note",
});
dblocal.version(1).stores({
  linksDB: "++id, link, title, caption, type",
});

//db.tickets.add({name: 'samuel espinoza figueroa'})
