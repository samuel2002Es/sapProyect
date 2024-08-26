<template>
  <q-item class="" clickable>
    <q-item-section v-if="props.icon" avatar>
      <q-icon
        :name="props.icon"
        @click="store.copyTextToClipboard(props.link)"
      />
    </q-item-section>

    <q-item :target="props.target" :href="props.link">
      <q-item-section>
        <q-item-label>{{ props.title }}</q-item-label>
        <q-item-label caption>{{ props.caption }}</q-item-label>
      </q-item-section>
    </q-item>
  </q-item>
</template>

<script setup>
import { useCounterStore } from "../stores/example-store.js";
const store = useCounterStore();
defineOptions({
  name: "EssentialLink",
});

const props = defineProps({
  title: {
    type: String,
    required: true,
  },

  caption: {
    type: String,
    default: "",
  },

  link: {
    type: String,
    default: "#",
  },

  target: {
    type: String,
    default: "#",
  },

  icon: {
    type: String,
    default: "mdi-content-copy",
  },
});
</script>
