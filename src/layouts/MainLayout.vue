<template>
  <q-layout view="hHh lpR lFr">
    <q-header elevated>
      <q-toolbar>
        <q-btn
          flat
          dense
          round
          icon="menu"
          aria-label="Menu"
          @click="toggleLeftDrawer"
        />

        <q-toolbar-title> SAP Tracker </q-toolbar-title>
        <div class="q-mr-md">Welcome</div>
        <div class="q-gutter-md flex justify-end">
          <q-btn
            outline
            rounded
            color="white"
            label="start Day"
            @click="startday()"
          />
          <q-btn
            outline
            rounded
            color="white"
            label="End Day"
            @click="endday()"
          />
          <q-btn
            outline
            rounded
            color="white"
            label="lunch"
            @click="startlunch()"
          />
          <q-btn
            outline
            rounded
            color="white"
            label="lunch end"
            @click="endlunch()"
          />
          <q-btn
            outline
            rounded
            color="white"
            label="breather"
            @click="startbreather()"
          />
          <q-btn
            outline
            rounded
            color="white"
            label="breather end"
            @click="endbreather()"
          />
        </div>
      </q-toolbar>
    </q-header>

    <q-drawer v-model="leftDrawerOpen" show-if-above bordered>
      <q-list>
        <EssentialLink
          v-for="link in linksList"
          :key="link.title"
          v-bind="link"
        />
        <q-btn
          label="SignOut"
          color="negative"
          outline
          class="q-ml-sm"
          @click="handleSignOut"
        />
      </q-list>
    </q-drawer>

    <q-page-container>
      <router-view />
    </q-page-container>
  </q-layout>
</template>

<script setup>
import { ref, onMounted } from "vue";
import EssentialLink from "components/EssentialLink.vue";
import { useRouter } from "vue-router";
const router = useRouter();

import { useCounterStore } from "../stores/example-store";
const store = useCounterStore();

import { getAuth, onAuthStateChanged, signOut } from "firebase/auth";
const isLoggedin = ref(false);
import {
  doc,
  setDoc,
  getDocs,
  collection,
  updateDoc,
  getDoc,
} from "firebase/firestore";
import { db } from "src/boot/firebase";
import { useQuasar } from "quasar";

const $q = useQuasar();
let auth;
onMounted(() => {
  auth = getAuth();
  onAuthStateChanged(auth, (user) => {
    if (user) {
      isLoggedin.value = true;
    } else {
      isLoggedin.value = false;
    }
  });
});
defineOptions({
  name: "MainLayout",
});
function getToday() {
  const today = new Date();
  const month = String(today.getMonth() + 1).padStart(2, "0");
  const day = String(today.getDate()).padStart(2, "0");
  return `${today.getFullYear()}-${month}-${day}`;
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
function getTime() {
  const today = new Date();
  //checar si esto funciona
  return today;
}

let valueinitialTime;
let valuefinalTime;
let valueinitiallunch;
let valuefinallunch;
let valueinitialbreather;
let valuefinalbreather;
const consultexistdata = async () => {
  const docRef = doc(db, "WorkDays", getMonth(), getToday(), store.user.uid);
  const docSnap = await getDoc(docRef);
  valueinitialbreather = docSnap.data().initialbreather;
  valuefinalbreather = docSnap.data().finalbreather;
  return {
    docExist,
    valueinitialTime,
    valuefinalTime,
    valueinitiallunch,
    valuefinallunch,
    valueinitialbreather,
    valuefinalbreather,
  };
};
const startday = async () => {
  const docRef = doc(db, "WorkDays", getMonth(), getToday(), store.user.uid);
  const docSnap = await getDoc(docRef);
  const docExist = docSnap.exists();
  if (!docExist) {
    try {
      await setDoc(
        doc(db, "WorkDays", getMonth(), getToday(), store.user.uid),
        {
          email: store.user.email,
          user: store.user.uid,
          initialTime: getTime(),
          finalTime: null,
          initiallunch: null,
          finallunch: null,
          initialbreather: null,
          finalbreather: null,
        }
      ).then(() => {
        $q.notify({
          icon: "done",
          color: "positive",
          message: "Have an excellent day of work",
        });
      });
    } catch (error) {
      console.log(error);
      $q.notify({
        icon: "done",
        color: "negative",
        message: error,
      });
    }
  } else {
    $q.notify({
      icon: "done",
      color: "negative",
      message: "the information about the start day has been sent before",
    });
  }
};
const endday = async () => {
  const docRef = doc(db, "WorkDays", getMonth(), getToday(), store.user.uid);
  const docSnap = await getDoc(docRef);
  const valuefinalTime = docSnap.data().finalTime;
  if (!valuefinalTime) {
    try {
      await updateDoc(
        doc(db, "WorkDays", getMonth(), getToday(), store.user.uid),
        {
          finalTime: getTime(),
        }
      ).then(() => {
        $q.notify({
          icon: "done",
          color: "positive",
          message: "Excellent work",
        });
      });
    } catch (error) {
      console.log(error);
      $q.notify({
        icon: "done",
        color: "negative",
        message: error,
      });
    }
  } else {
    $q.notify({
      icon: "done",
      color: "negative",
      message: "the information about the end day has been sent before",
    });
  }
};
const startlunch = async () => {
  const docRef = doc(db, "WorkDays", getMonth(), getToday(), store.user.uid);
  const docSnap = await getDoc(docRef);
  const valueinitiallunch = docSnap.data().initiallunch;
  if (!valueinitiallunch) {
    try {
      await updateDoc(
        doc(db, "WorkDays", getMonth(), getToday(), store.user.uid),
        {
          initiallunch: getTime(),
        }
      ).then(() => {
        $q.notify({
          icon: "done",
          color: "positive",
          message: "Bon Appétit",
        });
      });
    } catch (error) {
      console.log(error);
      $q.notify({
        icon: "done",
        color: "negative",
        message: error,
      });
    }
  } else {
    $q.notify({
      icon: "done",
      color: "negative",
      message: "the information about the start lunch has been sent before",
    });
  }
};
const endlunch = async () => {
  const docRef = doc(db, "WorkDays", getMonth(), getToday(), store.user.uid);
  const docSnap = await getDoc(docRef);
  const valuefinallunch = docSnap.data().finallunch;
  if (!valuefinallunch) {
    try {
      await updateDoc(
        doc(db, "WorkDays", getMonth(), getToday(), store.user.uid),
        {
          finallunch: getTime(),
        }
      ).then(() => {
        $q.notify({
          icon: "done",
          color: "positive",
          message: "End lunch",
        });
      });
    } catch (error) {
      console.log(error);
      $q.notify({
        icon: "done",
        color: "negative",
        message: error,
      });
    }
  } else {
    $q.notify({
      icon: "done",
      color: "negative",
      message: "the information about the final lunch has been sent before",
    });
  }
};
const startbreather = async () => {
  const docRef = doc(db, "WorkDays", getMonth(), getToday(), store.user.uid);
  const docSnap = await getDoc(docRef);
  const valueinitialbreather = docSnap.data().initialbreather;
  if (!valueinitialbreather) {
    try {
      await updateDoc(
        doc(db, "WorkDays", getMonth(), getToday(), store.user.uid),
        {
          initialbreather: getTime(),
        }
      ).then(() => {
        $q.notify({
          icon: "done",
          color: "positive",
          message: "Breathe please",
        });
      });
    } catch (error) {
      console.log(error);
      $q.notify({
        icon: "done",
        color: "negative",
        message: error,
      });
    }
  } else {
    $q.notify({
      icon: "done",
      color: "negative",
      message: "the information about the initial brather has been sent before",
    });
  }
};
const endbreather = async () => {
  const docRef = doc(db, "WorkDays", getMonth(), getToday(), store.user.uid);
  const docSnap = await getDoc(docRef);
  const valuefinalbreather = docSnap.data().finalbreather;
  if (!valuefinalbreather) {
    try {
      await updateDoc(
        doc(db, "WorkDays", getMonth(), getToday(), store.user.uid),
        {
          finalbreather: getTime(),
        }
      ).then(() => {
        $q.notify({
          icon: "done",
          color: "positive",
          message: "End breather",
        });
      });
    } catch (error) {
      console.log(error);
      $q.notify({
        icon: "done",
        color: "negative",
        message: error,
      });
    }
  } else {
    $q.notify({
      icon: "done",
      color: "negative",
      message: "the information about the final brather has been sent before",
    });
  }
};
const handleSignOut = () => {
  signOut(auth).then(() => {
    router.push("/auth");
  });
};
const linksList = [
  {
    title: "Tracker",
    caption: "quasar.dev",
    icon: "mdi-account-star",
    caption: "My Tickets",
    link: "/",
  },
  {
    title: "My work",
    caption: "quasar.dev",
    icon: "mdi-chart-line",
    caption: "Consult my tickets",
    link: "/tickets",
  },
  {
    title: "Links",
    caption: "quasar.dev",
    icon: "mdi-link",
    caption: "looking for links",
    link: "/links",
  },
  {
    title: "Templates",
    caption: "quasar.dev",
    icon: "mdi-content-copy",
    caption: "looking for templates",
    link: "/templates",
  },
  {
    title: "Notes",
    caption: "Save notes",
    icon: "mdi-content-copy",
    caption: "looking for notes",
    link: "/notes",
  },
  {
    title: "Checklist",
    caption: "quasar.dev",
    icon: "mdi-content-copy",
    caption: "looking for templates",
    link: "/checklist",
  },
  {
    title: "The future",
    caption: "Future Development",
    icon: "code",
    href: "https://www.sap.com/index.html",
    target: "_blank",
  },
  {
    title: "New Joiners",
    caption: "New Coworkers",
    icon: "code",
    link: "/newJoiners",
  },
  {
    title: "Work Days",
    caption: "The time worked by the team",
    icon: "code",
    link: "/workdays",
  },
];

const leftDrawerOpen = ref(false);

function toggleLeftDrawer() {
  leftDrawerOpen.value = !leftDrawerOpen.value;
}
</script>
