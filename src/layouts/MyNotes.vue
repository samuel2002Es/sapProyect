<!-- eslint-disable vue/no-v-text-v-html-on-component -->
<template>
  <div class="q-pa-md q-gutter-sm">
    <q-editor
      v-model="editor"
      min-height="5rem"
      :definitions="{
        save: {
          tip: 'Save your note',
          icon: 'save',
          label: 'Save',
          handler: saveWork,
        },
      }"
      :toolbar="[
        ['bold', 'italic', 'strike', 'underline'],
        ['upload', 'save'],
      ]"
    />
    <q-card
      class="row"
      flat
      bordered
      v-for="(item, index) in tasks"
      :key="index"
    >
      <q-card-section
        :class="item.estado ? 'tachar' : ''"
        class="col"
        v-html="item.texto"
      />
      <q-btn flat color="blue" @click="item.estado = !item.estado"
        >Accion</q-btn
      >
      <q-btn flat color="red" @click="eliminar(index, item)">Delete</q-btn>
    </q-card>
    <div v-if="tasks.length == 0" class="flex flex-center">
      <p class="text-h6">Sin notas</p>
    </div>
  </div>
</template>

<script setup>
import { useQuasar } from "quasar";
import { ref, onMounted } from "vue";
import { db } from "../database/db";
import { notes } from "../database/notes.js";

const editor = ref("");
const $q = useQuasar();
const tasks = ref([]);

onMounted(async () => {
  await getNotes();
});
async function getNotes() {
  await notes
    .getInstance()
    .get()
    .then((result) => {
      for (let index = 0; index < result.length; index++) {
        tasks.value.push({
          texto: result[index].note,
          estado: false,
          id: result[index].id,
        });
      }
      console.log(result);
    });
}
function saveWork() {
  tasks.value.push({
    texto: editor.value,
    estado: false,
  });
  db.notes.add({
    note: editor.value,
  });
  $q.notify({
    type: "positive",
    message: "Note saved successfully",
  });
  editor.value = "";
}
function eliminar(index, item) {
  $q.dialog({
    title: "Confirm to delete",
    message: "would you like to delete this note?",
    cancel: true,
    persistent: true,
  })
    .onOk(() => {
      // console.log('>>>> OK')
      tasks.value.splice(index, 1);
      db.notes.delete(item.id);
    })
    .onOk(() => {
      // console.log('>>>> second OK catcher')
    })
    .onCancel(() => {
      // console.log('>>>> Cancel')
    })
    .onDismiss(() => {
      // console.log('I am triggered on both OK and Cancel')
    });
}
</script>

<style>
.tachar {
  text-decoration: line-through;
}
</style>
