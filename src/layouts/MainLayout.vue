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
          <q-btn outline rounded color="white" label="start Day" type="reset" />
          <q-btn outline rounded color="white" label="End Day" type="submit" />
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
];

const leftDrawerOpen = ref(false);

function toggleLeftDrawer() {
  leftDrawerOpen.value = !leftDrawerOpen.value;
}
</script>
