<template>
  <div class="q-pa-md">
    <div class="q-pb-sm">Model: {{ days }}</div>
    <div class="text-center">{{ getMonth() }} - {{ getToday(true) }}</div>
    <q-date v-model="days" multiple />
  </div>
  <div class="q-pa-md">
    <div v-if="!days">Kindly select a day!</div>
    <div v-if="days">
      <div v-for="(item, index) in days" :key="index">
        {{ index }} {{ item }}
        {{ newRows.length }}
        <q-table
          class="my-sticky-column-table"
          flat
          bordered
          title="Work Days"
          :rows="newRows"
          :columns="columns"
        />
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, onMounted, watch } from "vue";
import { doc, getDocs, collection } from "firebase/firestore";
import { db } from "src/boot/firebase";
const days = ref([getToday(true)]);
const newRows = ref([]);
let carros = [[{}], [{}]];
watch(days, () => {
  console.log("selecciono algo nuevo");
});
function getToday(format) {
  const today = new Date();
  const month = String(today.getMonth() + 1).padStart(2, "0");
  if (format) {
    return `${today.getFullYear()}/${month}/${today.getDate()}`;
  } else {
    return `${today.getFullYear()}-${month}-${today.getDate()}`;
  }
}
function getMonth() {
  const month = [
    "January",
    "February",
    "March",
    "April",
    "May",
    "June",
    "July",
    "August",
    "September",
    "October",
    "November",
    "December",
  ];

  const d = new Date();
  return month[d.getMonth()];
}
onMounted(async () => {
  try {
    //     firestore.doc(`/myCollection/myDocument`).getCollections().then(collections => {
    //   for (let collection of collections) {
    //     console.log(`Found collection with id: ${collection.id}`);
    //   }
    // });
    ///WorkDays/August/2025-08-22
    //const querySnapshot = await getDocs(collection(db, "WorkDays", "MES", "FECHA"));
    //la collection
    const querySnapshot = await getDocs(
      collection(db, "WorkDays", getMonth(), getToday())
    );
    console.log("samuel espinoza", querySnapshot);
    querySnapshot.forEach((doc) => {
      // doc.data() is never undefined for query doc snapshots
      // doc.data().finalTime.toDate();
      console.log(doc.data());
      let { email, initialTime, finalTime } = doc.data();
      initialTime = initialTime.toDate().toString();
      finalTime = finalTime.toDate().toString();
      newRows.value.push([{ email, initialTime, finalTime }]);
    });
    console.log(newRows.value[0]);
  } catch (error) {
    console.log("aqui andamos", error);
  }
});
const columns = [
  {
    name: "email",
    align: "center",
    label: "Email",
    field: "email",
    sortable: true,
  },
  { name: "initialTime", label: "Initial Time", field: "initialTime" },
  {
    name: "finalTime",
    label: "Final Time",
    field: "finalTime",
    sortable: true,
  },
];

const rows = [
  {
    email: "Eclair",
    finalTime: 262,
    initialTime: 16.0,
    carbs: 23,
    protein: 6.0,
    sodium: 337,
    calcium: "6%",
    iron: "7%",
  },
  {
    email: "Cupcake",
    finalTime: 305,
    initialTime: 3.7,
    carbs: 67,
    protein: 4.3,
    sodium: 413,
    calcium: "3%",
    iron: "8%",
  },
];
</script>
