<template>
  <div class="q-pa-md">
    <div class="text-center">{{ getMonth() }} - {{ getToday(true) }}</div>
    <q-date v-model="days" multiple />
  </div>
  <div class="q-pa-md">
    <div v-if="!days">Kindly select a day!</div>
    <div v-if="days">
      <div>
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
const days = ref([]);
const newRows = ref([]);
watch(days, async () => {
  //console.log("selecciono algo nuevo", days.value);
  //arreglo = days.value.filter((i) => i !== getToday(true)); // filtramos
  newRows.value = [];
  const daysarray = Object.values(days.value);
  for (let i = 0; i < daysarray.length; i++) {
    let fechaFormatoNuevo = daysarray[i].replace(/\//g, "-");
    let partesFecha = fechaFormatoNuevo.split("-");
    let mesNumero = parseInt(partesFecha[1], 10);
    let nombresMeses = [
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
    let mesNombre = nombresMeses[mesNumero - 1];
    //console.log(mesNombre);
    const querySnapshot = await getDocs(
      collection(db, "WorkDays", mesNombre, fechaFormatoNuevo)
    );
    querySnapshot.forEach((doc) => {
      console.log("informacion obtenida", doc.data());
      let {
        email,
        initialTime,
        finalTime,
        initiallunch,
        finallunch,
        initialbreather,
        finalbreather,
      } = doc.data();
      initialTime = initialTime.toDate().toString();
      if (finalTime) {
        finalTime = finalTime.toDate().toString();
      } else {
        finalTime = "In progess";
      }
      if (initiallunch) {
        initiallunch = initiallunch.toDate().toString();
      } else {
        initiallunch = "In progess";
      }
      if (finallunch) {
        finallunch = finallunch.toDate().toString();
      } else {
        finallunch = "In progess";
      }
      if (initialbreather) {
        initialbreather = initialbreather.toDate().toString();
      } else {
        initialbreather = "In progess";
      }
      if (finalbreather) {
        finalbreather = finalbreather.toDate().toString();
      } else {
        finalbreather = "In progess";
      }
      newRows.value.push({
        email,
        initialTime,
        finalTime,
        day: daysarray[i],
        initiallunch,
        finallunch,
        initialbreather,
        finalbreather,
      });
    });
  }
});
function getToday(format) {
  const today = new Date();
  const month = String(today.getMonth() + 1).padStart(2, "0");
  const day = String(today.getDate()).padStart(2, "0");
  if (format) {
    return `${today.getFullYear()}/${month}/${day}`;
  } else {
    return today.toISOString().split("T")[0];
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
    //     const { collection, getDocs } = require("firebase/firestore");
    // // Query a reference to a subcollection
    // const querySnapshot = await getDocs(collection(db, "cities", "SF", "landmarks"));
    // querySnapshot.forEach((doc) => {
    //   // doc.data() is never undefined for query doc snapshots
    //   console.log(doc.id, " => ", doc.data());
    // });
    days.value.push(getToday(true));
    const day = getToday();
    const querySnapshot = await getDocs(
      collection(db, "WorkDays", getMonth(), day)
    );
    //console.log("samuel espinoza", querySnapshot);
    querySnapshot.forEach((doc) => {
      // doc.data() is never undefined for query doc snapshots
      // doc.data().finalTime.toDate();
      console.log(doc.data());
      let {
        email,
        initialTime,
        finalTime,
        initialbreather,
        finalbreather,
        initiallunch,
        finallunch,
      } = doc.data();
      initialTime = initialTime.toDate().toString();
      if (finalTime) {
        finalTime = finalTime.toDate().toString();
      } else {
        finalTime = "In progess";
      }
      if (initiallunch) {
        initiallunch = initiallunch.toDate().toString();
      } else {
        initiallunch = "In progess";
      }
      if (finallunch) {
        finallunch = finallunch.toDate().toString();
      } else {
        finallunch = "In progess";
      }
      if (initialbreather) {
        initialbreather = initialbreather.toDate().toString();
      } else {
        initialbreather = "In progess";
      }
      if (finalbreather) {
        finalbreather = finalbreather.toDate().toString();
      } else {
        finalbreather = "In progess";
      }
      newRows.value.push({
        email,
        initialTime,
        finalTime,
        day,
        initialbreather,
        finalbreather,
        initiallunch,
        finallunch,
      });
    });
    //console.log(newRows.value[0]);
  } catch (error) {
    //console.log("aqui andamos", error);
  }
});
const columns = [
  {
    name: "day",
    align: "center",
    label: "day",
    field: "day",
    sortable: true,
  },
  {
    name: "email",
    align: "center",
    label: "Email",
    field: "email",
    sortable: true,
  },
  { name: "initialTime", label: "Initial Day", field: "initialTime" },
  {
    name: "finalTime",
    label: "Final Day",
    field: "finalTime",
  },
  {
    name: "initiallunch",
    label: "Initial lunch",
    field: "initiallunch",
  },
  {
    name: "finallunch",
    label: "final lunch",
    field: "finallunch",
  },
  {
    name: "initialbreather",
    label: "Initial breather",
    field: "initialbreather",
  },
  {
    name: "finalbreather",
    label: "Final breather",
    field: "finalbreather",
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
