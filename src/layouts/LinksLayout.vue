<template>
  <div class="q-ma-md">
    <section>
      <div class="q-pt-md text-center row">
        <p class="col text-h6">My links</p>
        <q-btn flat color="blue" @click="promptMy = !promptMY">New</q-btn>
      </div>
      <div class="q-gutter-xl row">
        <LinkFormat v-for="link in Myowns" :key="link.title" v-bind="link" />
      </div>
    </section>
    <section>
      <div class="q-pt-md text-center row">
        <p class="col text-h6">Tickets basicos</p>
        <q-btn flat color="blue" @click="promptBasic = !promptBasic">New</q-btn>
      </div>
      <div class="q-gutter-xl row">
        <LinkFormat v-for="link in links" :key="link" v-bind="link" />
      </div>
    </section>
    <section>
      <div class="q-pt-md text-center row">
        <p class="col text-h6">Links videos</p>
        <q-btn flat color="blue" @click="promptVideos = !promptVideos"
          >New</q-btn
        >
      </div>
      <div class="q-gutter-xl row">
        <LinkFormat v-for="link in videos" :key="link.title" v-bind="link" />
      </div>
    </section>
  </div>
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
</template>
<script setup>
import { useQuasar } from "quasar";
import { ref, onMounted } from "vue";
import { dblocal } from "../database/db";
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
    dblocal.linksDB.add({
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
    title: "Validation sources",
    caption: "Validation sources",
    link: "https://sap.sharepoint.com/:x:/r/teams/IDM/_layouts/15/Doc.aspx?sourcedoc=%7BF441FB36-5377-40E9-A898-2AC5E4F9E419%7D&file=Global%20Account%20Validation%20Sources.xlsx&_DSL=1&action=default&mobileredirect=true&CID=C97D50B9-1C5B-4861-8BD3-21EFCB30C751&wdLOR=c20403ABA-7853-4628-A917-346BCD5F04B2&isSPOFile=1&clickparams=eyJBcHBOYW1lIjoiVGVhbXMtRGVza3RvcCIsIkFwcFZlcnNpb24iOiIyNy8yMzExMDIyNDcwNSIsIkhhc0ZlZGVyYXRlZFVzZXIiOmZhbHNlfQ%3D%3D",
    target: "_blank",
  },
  {
    title: "Creation Mapping File",
    caption: "Creation Mapping File",
    link: "https://sap.sharepoint.com/:x:/t/IDAKnowledgeHub-ExistingProcesses/ESfkBY2PKd9EgdXplF6WRQgB-LYF_HLpvKl_KBqUyMoDYw?e=8O9hJC&CID=20C65216-29CB-4593-AB68-DC46597CCE61&wdLOR=c81144D7D-77AE-4E1D-A34E-B53139A55150",
    target: "_blank",
  },
  {
    title: "IBU to MC mapping",
    caption: "IBU to MC mapping",
    link: "https://sap.sharepoint.com/:x:/t/IDAKnowledgeHub-ExistingProcesses/EUlqMoJNVuNFpJllb4lYSa4Byy2u3PMZmgIAkXdDK6Nr8g?e=4Poa7J&wdOrigin=TEAMS-ELECTRON.p2p_ns.bim&wdExp=TEAMS-CONTROL&wdhostclicktime=1701902551433&web=1",
    target: "_blank",
  },
  {
    title: "Phone format",
    caption: "Phone format",
    link: "https://sap.sharepoint.com/:x:/r/teams/IDAKnowledgeHub-ExistingProcesses/_layouts/15/Doc.aspx?sourcedoc=%7B83745438-11C1-4D0B-A5D6-7519CB0B6EA2%7D&file=EMEA_MEE%20Checklist%20-%2029.10.2021.xlsb&action=default&mobileredirect=true&cid=1ce6da47-720f-4fd2-af8c-db396f11fa43&isSPOFile=1&clickparams=eyJBcHBOYW1lIjoiVGVhbXMtRGVza3RvcCIsIkFwcFZlcnNpb24iOiIyNy8yNDAyMjkyMDYwMiIsIkhhc0ZlZGVyYXRlZFVzZXIiOmZhbHNlfQ%3D%3D",
    target: "_blank",
  },
  {
    title: "Hierarchy Tracker-Consolidated",
    caption: "Hierarchy Tracker-Consolidated",
    link: "https://sap.sharepoint.com/:x:/t/IDAKnowledgeHub-ExistingProcesses/Ec2GiVKi-j5Hu1LXrf37zCUBbWNr4NJor3V0hCsyknybOg?e=HQ9mRM",
    target: "_blank",
  },
  {
    title: "Tax Type",
    caption: "Tax Type",
    link: "https://sap.sharepoint.com/:x:/t/IDM/EZIEHfJknGhOqs_wcbR-uqcBz3NOTRuUJ85uJW0Woj_iZw?e=80PwWA&CID=A0922361-2418-4C3C-B707-98C99D3EA3A6&wdLOR=cA2DA50B9-C911-42EA-99F5-CD571790921C&isSPOFile=1&clickparams=eyJBcHBOYW1lIjoiVGVhbXMtRGVza3RvcCIsIkFwcFZlcnNpb24iOiIyNy8yNDAzMjgyMTIwMCIsIkhhc0ZlZGVyYXRlZFVzZXIiOmZhbHNlfQ%3D%3D",
    target: "_blank",
  },
  {
    title: "Tax Brazil",
    caption: "Tax page",
    link: "https://solucoes.receita.fazenda.gov.br/Servicos/cnpjreva/cnpjreva_solicitacao.asp",
    target: "_blank",
  },
  {
    title: "Tax EU",
    caption: "Tax page",
    link: "https://www.secstates.com/%20%C2%A0,%20OpenCorporates%20::%20The%20Open%20Database%20Of%20The%20Corporate%20World",
    target: "_blank",
  },
  {
    title: "Tax France",
    caption: "Tax page",
    link: "https://www.societe.com/",
    target: "_blank",
  },
  {
    title: "Tax India",
    caption: "Tax page",
    link: "https://services.gst.gov.in/services/searchtp",
    target: "_blank",
  },
  {
    title: "Tax Germany",
    caption: "Tax page",
    link: "https://www.unternehmensregister.de/ureg/index.html;jsessionid=2D44105F7174289532B9972934B795B7.web04-1",
    target: "_blank",
  },
  {
    title: "Tax VIES europa",
    caption: "Tax page",
    link: "https://ec.europa.eu/taxation_customs/vies/#/vat-validation",
    target: "_blank",
  },
  {
    title: "Learning",
    caption: "Learning",
    link: "https://sap.plateau.com/learning/user/personal/landOnPortalHome.do",
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
    title: "Hoovers",
    caption: "Hoovers",
    link: "https://app.avention.com/login?F1613359196983VDOHS5=_",
    target: "_blank",
  },
  {
    title: "Tickets",
    caption: "tickets",
    link: "https://sfp.bss.net.sap/sap(bD1lbiZjPTAwMSZkPW1pbg==)/bc/bsp/sap/crm_ui_start/default.htm",
    target: "_blank",
  },
  {
    title: "CRM",
    caption: "CRM",
    link: "https://icp.wdf.sap.corp/sap(bD1lbiZjPTAwMSZkPW1pbg==)/bc/bsp/sap/crm_ui_start/default.htm",
    target: "_blank",
  },
  {
    title: "CIC Tool",
    caption: "CIC Tool",
    link: "https://sapit-dataandintegration-prod-otter-edt-cic-frontend.cfapps.eu10-004.hana.ondemand.com/cic/index.html#/batchQueue",
    target: "_blank",
  },
  {
    title: "Customer Gobernance",
    caption: "MDG",
    link: "https://mdp.bss.net.sap/nwbc/?sap-nwbc-node=0000000221&sap-nwbc-context=03HM333035D633D5333674320082785F97807837CF78476767FF50BF104F3FF7785F57BF500343630388320323036390420363A04A10D3D000844D0C324A4A0A8AADF4F581C27A4EC1C17A7EAE217AC18E01562626C6FA79E549C9FAF6C58905BAC93999A97925B6402D6A206E4E625E7A69627AAAADAB1F00&sap-client=001&sap-language=EN&sap-nwbc-history_item=&sap-theme=sap_corbu",
    target: "_blank",
  },
  {
    title: "Vacation file",
    caption: "Vacation file",
    link: "https://sap-my.sharepoint.com/:x:/r/personal/jose_leopoldo_morales_luna_sap_com/_layouts/15/Doc.aspx?sourcedoc=%7BB76AA2D9-23BA-425E-B221-31F037E1097D%7D&file=vacation%20file%20.xlsx&wdLOR=c76EB06EB-BF9B-4766-A921-B4469F277CCC&fromShare=true&action=default&mobileredirect=true",
    target: "_blank",
  },
  {
    title: "Machine Translation Portal",
    caption: "Machine Translation Portal",
    link: "https://mtportal.int.sap/?rc=1",
    target: "_blank",
  },
  {
    title: "SOP",
    caption: "Digital Library",
    link: "https://dam.sap.com/mac/app/cs/dman/8c9300da2194bee5ebc0a8cc1a73d27052ab3033?assetUploadOpened=true",
    target: "_blank",
  },
  {
    title: "Chat GPT SAP",
    caption: "Chat GPT SAP",
    link: "https://gpt-demo.internal.cfapps.eu12.hana.ondemand.com/webclient/standalone/",
    target: "_blank",
  },
  {
    title: "Scenario document ",
    caption: "Scenario document",
    link: "https://sap.sharepoint.com/:f:/r/teams/DSBOperations/Shared%20Documents/SHARE_DRIVE/DQF_Account,%20Contact%20and%20Tax/2024/Scenario%20Document?csf=1&web=1&e=aUny0J",
    target: "_blank",
  },
  {
    title: "Job console",
    caption: "Job console",
    link: "https://n1p.cloud.sap.corp/irj/portal",
    target: "_blank",
  },
  {
    title: "Tickets IT",
    caption: "Tickets IT",
    link: "https://sapit-home-prod-004.launchpad.cfapps.eu10.hana.ondemand.com/site#unifiedticketing-Display?sap-ui-app-id-hint=51a3f75c-7f9d-4c1a-8c3e-079e8e3e1a45/sites#Help-Inbox&/create/",
    target: "_blank",
  },
]);
</script>
