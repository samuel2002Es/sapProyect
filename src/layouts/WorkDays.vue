<template>
  <div class="q-pa-md">
    <div class="q-pb-sm">Model: {{ days }}</div>
    <div class="text-center">{{ getMonth() }} - {{ getToday() }}</div>
    <q-date v-model="days" multiple />
  </div>
  <div class="q-pa-md">
    <div v-if="!days">Kindly select a day!</div>
    <div v-if="days">
      <div v-for="(item, index) in days" :key="index">
        {{ index }} {{ item }}
        <q-table
          class="my-sticky-column-table"
          flat
          bordered
          title="Work Days"
          :rows="rows"
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
const days = ref([getToday()]);

watch(days, () => {
  console.log("selecciono algo nuevo");
});
function getToday() {
  const today = new Date();
  const month = String(today.getMonth() + 1).padStart(2, "0");
  return `${today.getFullYear()}/${month}/${today.getDate()}`;
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
      collection(db, getToday())
    );
    console.log("algo bien", querySnapshot);
    querySnapshot.forEach((doc) => {
      // doc.data() is never undefined for query doc snapshots
      console.log(doc.id, " => ", doc.data());
    });
  } catch (error) {
    console.log("aqui andamos", error);
  }
});
const columns = [
  {
    name: "name",
    required: true,
    label: "Dessert (100g serving)",
    align: "left",
    field: (row) => row.name,
    format: (val) => `${val}`,
    sortable: true,
  },
  {
    name: "Email",
    align: "center",
    label: "Email",
    field: "Email",
    sortable: true,
  },
  { name: "fat", label: "Fat (g)", field: "fat", sortable: true },
  { name: "carbs", label: "Carbs (g)", field: "carbs" },
  { name: "protein", label: "Protein (g)", field: "protein" },
  { name: "sodium", label: "Sodium (mg)", field: "sodium" },
  {
    name: "calcium",
    label: "Calcium (%)",
    field: "calcium",
    sortable: true,
    sort: (a, b) => parseInt(a, 10) - parseInt(b, 10),
  },
  {
    name: "iron",
    label: "Iron (%)",
    field: "iron",
    sortable: true,
    sort: (a, b) => parseInt(a, 10) - parseInt(b, 10),
  },
];

const rows = [
  {
    name: "Frozen Yogurt",
    calories: 159,
    fat: 6.0,
    carbs: 24,
    protein: 4.0,
    sodium: 87,
    calcium: "14%",
    iron: "1%",
  },
  {
    name: "Ice cream sandwich",
    calories: 237,
    fat: 9.0,
    carbs: 37,
    protein: 4.3,
    sodium: 129,
    calcium: "8%",
    iron: "1%",
  },
  {
    name: "Eclair",
    calories: 262,
    fat: 16.0,
    carbs: 23,
    protein: 6.0,
    sodium: 337,
    calcium: "6%",
    iron: "7%",
  },
  {
    name: "Cupcake",
    calories: 305,
    fat: 3.7,
    carbs: 67,
    protein: 4.3,
    sodium: 413,
    calcium: "3%",
    iron: "8%",
  },
];
</script>
