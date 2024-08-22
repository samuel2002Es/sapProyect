<template>
  <div>Hi</div>
</template>

<script setup>
import { ref, onMounted } from "vue";
import { doc, getDocs, collection } from "firebase/firestore";
import { db } from "src/boot/firebase";
onMounted(async () => {
  try {
    console.log("samuel");
//     firestore.doc(`/myCollection/myDocument`).getCollections().then(collections => {
//   for (let collection of collections) {
//     console.log(`Found collection with id: ${collection.id}`);
//   }
// });
    ///WorkDays/August/2025-08-22
    //const querySnapshot = await getDocs(collection(db, "WorkDays", "MES", "FECHA"));
    //la collection
    const querySnapshot = await getDocs(collection(db, "WorkDays"));
    querySnapshot.forEach((doc) => {
      // doc.data() is never undefined for query doc snapshots
      console.log(doc.id, " => ", doc.data());
    });
  } catch (error) {
    console.log("aqui andamos", error);
  }
});
</script>
