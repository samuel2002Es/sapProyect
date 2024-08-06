import { defineStore } from "pinia";
import { ref, computed, onMounted, inject, watch } from "vue";
import { tickets } from "../database/tickets";
import { db } from "../database/db";
import { useQuasar } from "quasar";
import { users } from "../database/users";

export const useCounterStore = defineStore("counter", () => {
  const $q = useQuasar();
  const counter = ref([{ name: "prueba" }]);
  const nombre = ref('')
  const data = ref([]);
  const ticketsData = ref({
    Workflow: ["SSF", "MDG", "SAP STORES"],
    Regions: ["NA", "LAC", "MEE", "EMEA", "APJ"],
    Description: [
      "Account Creation Status",
      "ASN",
      "Contact Function & Department",
      "Contact Person Support",
      "CRM to ERP Conversion",
      "D&B / Hoovers – Access / Support",
      "De-duplication",
      "Deactivate and Activate Accounts",
      "Enrichment",
      "GTM 2024",
      "GTM Segmentation Update",
      "L2 Forward",
      "Master Code Update",
      "Master Data Extraction & Analysis",
      "Material Master Support (On Prem & On Cloud)",
      "MDG",
      "Other Master Data Support",
      "Out of Scope",
      "OutReach Process",
      "PAC",
      "PCCC",
      "PE Uploads",
      "Planning Entity Update",
      "Master Data Extraction & Analysis",
      "Pre-BP Enrichment",
      "RDMC - Support",
      "Sales Area Data Update",
      "Sales Team Update- Non Quota Carrier",
      "Sales Team Update- Quota Carrier",
      "SAP Store",
      "SEET",
      "Tax ID Updates",
      "Territory Management",
      "ZEIDOS",
    ],
    ReceivedEstatus: ["New", "Forwarded", "Reopened", "Answer Received"],
    FinalEstatus: ["Author Action", "Forwarded", "Solution Provided", "On Hold","In Process","Forwarded to IT","Closed by Followings"],
  });
  async function copyTextToClipboard(texto) {
    try {
      await navigator.clipboard.writeText(texto);

      // Puedes agregar aquí lógica adicional, como mostrar un mensaje de éxito
      $q.notify({
        type: "positive",
        message: "Text copied to clipboard",
      });
    } catch (error) {
      console.error("Error al copiar texto al portapapeles:", error);
      // Puedes manejar el error aquí, por ejemplo, mostrando un mensaje de error al usuario
    }
  }
  function getToday() {
    const today = new Date();
    const month = String(today.getMonth() + 1).padStart(2, "0");
    ticketsOutput.value.fecha_hoyf = `${
      today.getFullYear() + 1
    }-${month}-${today.getDate()}`;
    ticketsOutput.value.fecha_hoyi = `${
      today.getFullYear() + 1
    }-${month}-${today.getDate()}`;
  }
  async function name() {
    await users
      .getInstance()
      .get()
      .then((result) => {
        console.log('sam', result[0]);
        nombre.value = result[0].nameUser
      })
  }
  onMounted(async () => {
    name();
    getToday();
    //console.log("Hello world");
    await getTable();
  });
  async function getTable() {
    await tickets
      .getInstance()
      .get()
      .then((result) => {
        data.value = result;
        console.log(result);
      });
  }
  const loading = ref(false);
  function addingTable() {
    //console.log('a cambiado');
    loading.value = true;
    setTimeout(() => {
      getTable();
      loading.value = false;
    }, 500);
  }
  const ticketsOutput = ref({
    ticketID: null,
    region: null,
    name:nombre.value,
    workflow: undefined,
    description: undefined,
    fecha_hoyi: "",
    fecha_hoyf: "",
    ReceivedEstatus: undefined,
    FinalEstatus: undefined,
    volume: 1,
    comments: undefined,
  });
  async function save(ticket) {
    console.log("salvando");
    console.log(ticket);
    db.tickets.add({
      idTicket: ticket.ticketID,
      region: ticket.region,
      Employee: nombre.value,
      workflow: ticket.workflow,
      description: ticket.description,
      creted: ticket.fecha_hoyi,
      lastUpdated: ticket.fecha_hoyf,
      receivedStatus: ticket.ReceivedEstatus,
      finalStatus: ticket.FinalEstatus,
      volume: ticket.volume,
      comments: ticket.comments,
      whys: ticket.whys,
      measuresR: ticket.measuresR,
      measuresP: ticket.measuresP,
      errorSPOC: ticket.errorSPOC,
      background: ticket.background,
      WhoDidQC: ticket.WhoDidQC,
    })
    await addingTable()
    //se comenta con kc y se descomenta con ku
  }
  return {
    nombre,
    counter,
    data,
    ticketsData,
    save,
    ticketsOutput,
    getTable,
    loading,
    copyTextToClipboard,
  };
});
