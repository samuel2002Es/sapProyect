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
    const querySnapshot = await getDocs(collection(db, "WorkDays"));
    console.log("esto que es", querySnapshot);
    querySnapshot.forEach((doc) => {
      // doc.data() is never undefined for query doc snapshots
      console.log(doc);
    });
  } catch (error) {
    console.log("aqui andamos", error);
  }
});
</script>
