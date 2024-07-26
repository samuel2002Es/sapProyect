
<template>
  <div class="q-pa-md">
    <q-btn class="q-mb-md" @click="descargarExcel" color="white" text-color="black" label="Descargar Data" />
    <q-table
      flat bordered
      title="Tickets"
      :rows="store.data"
      :columns="columns"
      color="primary"
      row-key="name"
      :loading="store.loading"
    />
  </div>
</template>

<script setup>
import * as XLSX from 'xlsx';
import { useCounterStore } from '../stores/example-store';
const store = useCounterStore()

import { ref, computed, onMounted, inject, watch } from 'vue'

const columns = [
  { name: 'idTicket',align: 'center', label: 'Tickets ID', field: 'idTicket' },
  { name: 'region', label: 'Region', align: 'center', field: 'region' },
  { name: 'employee', align: 'center', label: 'Employee', field: 'Employee', sortable: true },
  { name: 'description',align: 'center', label: 'Description', field: 'description', sortable: true },
  { name: 'creted',align: 'center', label: 'Creted on', field: 'creted',sortable: true, sort: (a, b) => {const dateA = new Date(a);const dateB = new Date(b);return dateA - dateB;}},
  { name: 'lastUpdated',align: 'center', label: 'last Updated on', field: 'lastUpdated',sortable: true, sort: (a, b) => {const dateA = new Date(a);const dateB = new Date(b);return dateA - dateB;}},
  { name: 'workflow',align: 'center', label: 'Workflow', field: 'workflow' },
  { name: 'volume',align: 'center', label: 'Volume', field: 'volume', sortable: true, sort: (a, b) => parseInt(a, 10) - parseInt(b, 10) },
  { name: 'comments',align: 'center', label: 'Comments', field: 'comments', sortable: true, sort: (a, b) => parseInt(a, 10) - parseInt(b, 10) },
  { name: 'whys',align: 'center', label: 'Whys', field: 'whys', sortable: true, sort: (a, b) => parseInt(a, 10) - parseInt(b, 10) },
  { name: 'measuresR',align: 'center', label: 'Measures Reactive', field: 'measuresR', sortable: true, sort: (a, b) => parseInt(a, 10) - parseInt(b, 10) },
  { name: 'measuresP',align: 'center', label: 'Measures Preventive', field: 'measuresP', sortable: true, sort: (a, b) => parseInt(a, 10) - parseInt(b, 10) },
  { name: 'errorSPOC',align: 'center', label: 'error', field: 'errorSPOC', sortable: true, sort: (a, b) => parseInt(a, 10) - parseInt(b, 10) },
  { name: 'background',align: 'center', label: 'Background', field: 'background', sortable: true, sort: (a, b) => parseInt(a, 10) - parseInt(b, 10) },
  { name: 'WhoDidQC',align: 'center', label: 'Who Did QC', field: 'WhoDidQC', sortable: true, sort: (a, b) => parseInt(a, 10) - parseInt(b, 10) }
]
const labels = columns.map(column => column.label);
function descargarExcel(){
      // Crear un nuevo libro de Excel
      const wb = XLSX.utils.book_new();

      // Crear una hoja de Excel
      const ws = XLSX.utils.aoa_to_sheet([labels]);
      const worksheet = XLSX.utils.json_to_sheet(store.data);

      // Agregar la hoja al libro
      XLSX.utils.book_append_sheet(wb, worksheet, "Hoja1");

      // Convertir el libro a un archivo binario
      const wbout = XLSX.write(wb, { type: "binary", bookType: "xlsx" });

      // Función para convertir un binario a Blob
      const s2ab = (s) => {
        const buf = new ArrayBuffer(s.length);
        const view = new Uint8Array(buf);
        for (let i = 0; i < s.length; i++) view[i] = s.charCodeAt(i) & 0xff;
        return buf;
      };

      // Crear un Blob desde el archivo binario
      const blob = new Blob([s2ab(wbout)], { type: "application/octet-stream" });

      // Crear un enlace de descarga
      const url = URL.createObjectURL(blob);
      const link = document.createElement("a");
      link.href = url;
      link.download = "archivo_excel.xlsx"; // Nombre del archivo
      link.click();
}
const loading = ref(false)
</script>
