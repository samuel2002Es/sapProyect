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
        <!-- {{ store.user }} -->
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
        <q-item clickable tag="a" exact v-ripple to="/auth">
          <q-item-section>
            <q-item-label>SignOut</q-item-label>
            <q-item-label caption>SignOut</q-item-label>
          </q-item-section>
        </q-item>
      </q-list>
    </q-drawer>

    <q-page-container>
      <router-view />
    </q-page-container>
  </q-layout>
</template>

<script setup>
import { ref } from "vue";
import EssentialLink from "components/EssentialLink.vue";

import { useCounterStore } from "../stores/example-store";
const store = useCounterStore();

defineOptions({
  name: "MainLayout",
});

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
