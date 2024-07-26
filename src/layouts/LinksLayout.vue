<template>
  <div class="q-ma-md">
    <section>
      <div class="q-pa-md text-center row">
        <p class="col text-h5">Tickets basicos</p>
        <q-btn flat color="blue" @click="promptBasic = !promptBasic">New</q-btn>
      </div>
      <div class="q-gutter-xl row">
        <LinkFormat v-for="link in links" :key="link.title" v-bind="link" />
      </div>
    </section>
    <section>
      <div class="q-pa-md text-center row">
        <p class="col text-h5">Links videos</p>
        <q-btn flat color="blue" @click="promptVideos = !promptVideos"
          >New</q-btn
        >
      </div>
      <div class="q-gutter-xl row">
        <LinkFormat v-for="link in videos" :key="link.title" v-bind="link" />
      </div>
    </section>
    <section>
      <div class="q-pa-md text-center row">
        <p class="col text-h5">My links</p>
        <q-btn flat color="blue" @click="promptMy = !promptMY">New</q-btn>
      </div>
      <div class="q-gutter-xl row">
        <LinkFormat v-for="link in Myowns" :key="link.title" v-bind="link" />
      </div>
    </section>
  </div>
  <q-dialog v-model="promptBasic" persistent>
    <q-card style="min-width: 350px">
      <q-card-section>
        <div class="text-h6 text-center">Add basic</div>
      </q-card-section>
      <q-card-section>
        <div class="text-h6">Title</div>
      </q-card-section>

      <q-card-section class="q-pt-none">
        <q-input
          dense
          v-model="newTitle"
          autofocus
          @keyup.enter="prompt = false"
        />
      </q-card-section>
      <q-card-section>
        <div class="text-h6">Description</div>
      </q-card-section>

      <q-card-section class="q-pt-none">
        <q-input
          dense
          v-model="newDescription"
          autofocus
          @keyup.enter="prompt = false"
        />
      </q-card-section>
      <q-card-section>
        <div class="text-h6">Link</div>
      </q-card-section>

      <q-card-section class="q-pt-none">
        <q-input
          dense
          v-model="newLink"
          autofocus
          @keyup.enter="prompt = false"
        />
      </q-card-section>

      <q-card-actions align="right" class="text-primary">
        <q-btn flat label="Cancel" v-close-popup />
        <q-btn @click="newTicketsBasic" flat label="Add Link" v-close-popup />
      </q-card-actions>
    </q-card>
  </q-dialog>
  <q-dialog v-model="promptVideos" persistent>
    <q-card style="min-width: 350px">
      <q-card-section>
        <div class="text-h6 text-center">Add videos</div>
      </q-card-section>
      <q-card-section>
        <div class="text-h6">Title</div>
      </q-card-section>

      <q-card-section class="q-pt-none">
        <q-input
          dense
          v-model="newTitle"
          autofocus
          @keyup.enter="prompt = false"
        />
      </q-card-section>
      <q-card-section>
        <div class="text-h6">Description</div>
      </q-card-section>

      <q-card-section class="q-pt-none">
        <q-input
          dense
          v-model="newDescription"
          autofocus
          @keyup.enter="prompt = false"
        />
      </q-card-section>
      <q-card-section>
        <div class="text-h6">Link</div>
      </q-card-section>

      <q-card-section class="q-pt-none">
        <q-input
          dense
          v-model="newLink"
          autofocus
          @keyup.enter="prompt = false"
        />
      </q-card-section>

      <q-card-actions align="right" class="text-primary">
        <q-btn flat label="Cancel" v-close-popup />
        <q-btn @click="newTicketsVideos" flat label="Add Link" v-close-popup />
      </q-card-actions>
    </q-card>
  </q-dialog>
  <q-dialog v-model="promptMy" persistent>
    <q-card style="min-width: 350px">
      <q-card-section>
        <div class="text-h6 text-center">Add your owns</div>
      </q-card-section>
      <q-card-section>
        <div class="text-h6">Title</div>
      </q-card-section>

      <q-card-section class="q-pt-none">
        <q-input
          dense
          v-model="newTitle"
          autofocus
          @keyup.enter="prompt = false"
        />
      </q-card-section>
      <q-card-section>
        <div class="text-h6">Description</div>
      </q-card-section>

      <q-card-section class="q-pt-none">
        <q-input
          dense
          v-model="newDescription"
          autofocus
          @keyup.enter="prompt = false"
        />
      </q-card-section>
      <q-card-section>
        <div class="text-h6">Link</div>
      </q-card-section>

      <q-card-section class="q-pt-none">
        <q-input
          dense
          v-model="newLink"
          autofocus
          @keyup.enter="prompt = false"
        />
      </q-card-section>

      <q-card-actions align="right" class="text-primary">
        <q-btn flat label="Cancel" v-close-popup />
        <q-btn @click="newTicketsMy" flat label="Add Link" v-close-popup />
      </q-card-actions>
    </q-card>
  </q-dialog>
</template>
<script setup>
import { useQuasar } from "quasar";
import { ref, onMounted } from "vue";
import { db } from "../database/db";
import { linksDB } from "../database/links.js";
import LinkFormat from "components/LinkFormat.vue";
const promptBasic = ref(false);
const promptVideos = ref(false);
const promptMy = ref(false);
const newTitle = ref("");
const newDescription = ref("");
const newLink = ref("");
const $q = useQuasar();
onMounted(async () => {
  await getLinks();
});
async function getLinks() {
  await linksDB
    .getInstance()
    .get()
    .then((result) => {
      for (let index = 0; index < result.length; index++) {
        if (result[index].type == "basic") {
          links.value.push(result[index]);
        } else if (result[index].type == "videos") {
          videos.value.push(result[index]);
        } else if (result[index].type == "mine") {
          Myowns.value.push(result[index]);
        }
        //console.log(result[index]);
      }
      //console.log("los links perros: ", result);
    });
}
function notificacion() {
  $q.notify({
    type: "positive",
    message: "Link saved successfully",
  });
}
function saveLink(type, title, link, description) {
  try {
    db.linksDB.add({
      title: title,
      type: type,
      link: link,
      caption: description,
    });
  } catch (error) {
    console.log("este es el error", error);
  }
}
const newTicketsBasic = () => {
  links.value.push({
    title: newTitle,
    caption: newDescription,
    link: newLink,
    target: "_blank",
  });
  const type = "basic";
  saveLink(type, newTitle.value, newLink.value, newDescription.value);
  notificacion();
};
const newTicketsVideos = () => {
  videos.value.push({
    title: newTitle,
    caption: newDescription,
    link: newLink,
    target: "_blank",
  });
  saveLink("videos", newTitle.value, newLink.value, newDescription.value);
  notificacion();
};
const newTicketsMy = () => {
  Myowns.value.push({
    title: newTitle,
    caption: newDescription,
    link: newLink,
    target: "_blank",
  });
  saveLink("mine", newTitle.value, newLink.value, newDescription.value);
  notificacion();
};
const links = ref([
  {
    title: "The future",
    caption: "Future Development",
    link: "https://www.sap.com/index.html",
    target: "_blank",
  },
  {
    title: "google",
    caption: "google more and more",
    link: "https://www.google.com",
    target: "_blank",
  },
  {
    title: "google",
    caption: "google more and more",
    link: "https://www.google.com",
    target: "_blank",
  },
  {
    title: "google",
    caption: "google more and more",
    link: "https://www.google.com",
    target: "_blank",
  },
]);
const videos = ref([
  {
    title: "google",
    caption: "google more and more",
    link: "https://www.google.com",
    target: "_blank",
  },
  {
    title: "google",
    caption: "google more and more",
    link: "https://www.google.com",
    target: "_blank",
  },
  {
    title: "google",
    caption: "google more and more",
    link: "https://www.google.com",
    target: "_blank",
  },
]);
const Myowns = ref([
  {
    title: "google",
    caption: "google more and more",
    link: "https://www.google.com",
    target: "_blank",
  },
  {
    title: "google",
    caption: "google more and more",
    link: "https://www.google.com",
    target: "_blank",
  },
]);
</script>
