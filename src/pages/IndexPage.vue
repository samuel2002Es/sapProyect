<template>
  <q-page class="q-pa-md flex justify-center">
    <div style="width: 90%">
      <q-card
        class="my-card q-pa-xl row wrap justify-center items-center content-center"
      >
        <div class="col-12 text-h6">My tickets</div>
        <form
          @submit.prevent.stop="onSubmit"
          @reset.prevent.stop="onReset"
          class="col-12 q-gutter-xl row"
        >
          <div class="col">
            <q-card-section>
              <div class="q-gutter-md">
                <q-input
                  ref="ticketIDRef"
                  v-model="ticketID"
                  label="Ticket / CR#"
                  mask="#########"
                  unmasked-value
                  lazy-rules
                  :rules="ticketIDRules"
                />
              </div>
            </q-card-section>
            <q-card-section>
              <div class="q-gutter-md">
                <q-select
                  ref="regionRef"
                  v-model="region"
                  :options="store.ticketsData.Regions"
                  label="Region"
                  lazy-rules
                  :rules="regionRules"
                />
              </div>
            </q-card-section>
            <q-card-section>
              <div class="q-gutter-md">
                <q-input
                  v-model="store.nombre"
                  label="Employee Responsible"
                  disable
                />
              </div>
            </q-card-section>
            <q-card-section>
              <div class="q-gutter-md">
                <q-select
                  ref="workflowRef"
                  v-model="workflow"
                  :options="store.ticketsData.Workflow"
                  label="Workflow"
                  lazy-rules
                  :rules="workflowRules"
                />
              </div>
            </q-card-section>
            <q-card-section>
              <div class="q-gutter-md">
                <q-select
                  ref="descriptionRef"
                  v-model="description"
                  :options="store.ticketsData.Description"
                  label="Description"
                  lazy-rules
                  :rules="descriptionRules"
                />
              </div>
            </q-card-section>
            <q-card-section>
              <div class="q-gutter-md">
                <q-input
                  v-model="store.ticketsOutput.fecha_hoyi"
                  type="date"
                  hint="Created or received on"
                />
              </div>
            </q-card-section>
          </div>
          <div class="col">
            <q-card-section>
              <div class="q-gutter-md">
                <q-input
                  v-model="store.ticketsOutput.fecha_hoyf"
                  type="date"
                  hint="Last update on"
                />
              </div>
            </q-card-section>
            <q-card-section>
              <div class="q-gutter-md">
                <q-select
                  ref="ReceivedEstatusRef"
                  v-model="ReceivedEstatus"
                  :options="store.ticketsData.ReceivedEstatus"
                  label="Received Status"
                  lazy-rules
                  :rules="ReceivedEstatusRules"
                />
              </div>
            </q-card-section>
            <q-card-section>
              <div class="q-gutter-md">
                <q-select
                  ref="FinalEstatusRef"
                  v-model="FinalEstatus"
                  :options="store.ticketsData.FinalEstatus"
                  label="Final Status"
                  lazy-rules
                  :rules="FinalEstatusRules"
                />
              </div>
            </q-card-section>
            <q-card-section>
              <div class="q-gutter-md">
                <q-input
                  ref="volumesRef"
                  v-model="store.ticketsOutput.volume"
                  type="number"
                  lazy-rules
                  :rules="volumeRules"
                />
              </div>
            </q-card-section>
            <q-card-section>
              <div class="q-gutter-md">
                <q-input
                  ref="commentsRef"
                  v-model="store.ticketsOutput.comments"
                  label="Comments"
                />
              </div>
            </q-card-section>
            <q-card-section>
              <div class="q-gutter-md">
                <q-input
                  ref="errorSPOCRef"
                  v-model="errorSPOC"
                  label="SPOC ERROR"
                  lazy-rules
                  :rules="errorSPOCRules"
                />
              </div>
            </q-card-section>
          </div>
          <div class="col">
            <q-card-section>
              <div class="q-gutter-md">
                <q-input
                  ref="WhoDidQCRef"
                  v-model="WhoDidQC"
                  label="Who did the QC"
                  lazy-rules
                  :rules="WhoDidQCRules"
                />
              </div>
            </q-card-section>
            <q-card-section>
              <div class="q-gutter-md">
                <q-input
                  ref="backgroundRef"
                  v-model="background"
                  label="BACKGROUND"
                  lazy-rules
                  :rules="backgroundRules"
                />
              </div>
            </q-card-section>
            <q-card-section>
              <div class="q-gutter-md">
                <q-input
                  ref="whysRef"
                  v-model="whys"
                  label="WHY'S"
                  lazy-rules
                  :rules="whysRules"
                />
              </div>
            </q-card-section>
            <q-card-section>
              <div class="q-gutter-md">
                <q-input
                  ref="measuresRRef"
                  v-model="measuresR"
                  label="REACTIVE MEASURES"
                  lazy-rules
                  :rules="measuresRRules"
                />
              </div>
            </q-card-section>
            <q-card-section>
              <div class="q-gutter-md">
                <q-input
                  ref="measuresPRef"
                  v-model="measuresP"
                  label="PREVENTIVE MEASURES"
                  azy-rules
                  :rules="measuresPRules"
                />
              </div>
            </q-card-section>
            <q-card-section>
              <div class="q-gutter-md flex justify-end">
                <q-btn
                  outline
                  rounded
                  color="primary"
                  label="clear"
                  type="reset"
                />
                <q-btn
                  outline
                  rounded
                  color="primary"
                  label="Save"
                  type="submit"
                />
              </div>
            </q-card-section>
          </div>
        </form>
      </q-card>
    </div>
  </q-page>
</template>

<script setup>
import { useQuasar } from "quasar";
import { ref } from "vue";
import { useCounterStore } from "../stores/example-store";
const store = useCounterStore();
const $q = useQuasar();

const accept = ref(false);

////////////////////////////////////////////////////////////////////////

const ticketID = ref(null);
const ticketIDRef = ref(null);

const region = ref(null);
const regionRef = ref(null);

const workflow = ref(null);
const workflowRef = ref(null);

const description = ref(null);
const descriptionRef = ref(null);

const ReceivedEstatus = ref(null);
const ReceivedEstatusRef = ref(null);

const FinalEstatus = ref(null);
const FinalEstatusRef = ref(null);

const volumesRef = ref(null);
const commentsRef = ref(null);

const errorSPOC = ref(null);
const errorSPOCRef = ref(null);

const WhoDidQC = ref(null);
const WhoDidQCRef = ref(null);

const background = ref(null);
const backgroundRef = ref(null);

const whys = ref(null);
const whysRef = ref(null);

const measuresR = ref(null);
const measuresRRef = ref(null);

const measuresP = ref(null);
const measuresPRef = ref(null);
const ticketIDRules = [
  (val) => (val && val.length > 0) || "Please type something",
];
const regionRules = [(val) => !!val || "Field is required"];
const workflowRules = [(val) => !!val || "Field is required"];
const descriptionRules = [(val) => !!val || "Field is required"];
const ReceivedEstatusRules = [(val) => !!val || "Field is required"];
const FinalEstatusRules = [(val) => !!val || "Field is required"];
const volumeRules = [(val) => (val && val > 0) || "Please type something"];
const errorSPOCRules = [
  (val) => (val && val.length >= 3) || "Please type something",
];
const WhoDidQCRules = [
  (val) => (val && val.length >= 3) || "Please type something",
];
const backgroundRules = [
  (val) => (val && val.length >= 3) || "Please write more",
];
const whysRules = [(val) => (val && val.length >= 15) || "Please write more"];

const measuresRRules = [
  (val) => (val && val.length >= 15) || "Please write more",
];
const measuresPRules = [
  (val) => (val && val.length >= 15) || "Please write more",
];
function onSubmit() {
  ticketIDRef.value.validate();
  regionRef.value.validate();
  workflowRef.value.validate();
  descriptionRef.value.validate();
  ReceivedEstatusRef.value.validate();
  FinalEstatusRef.value.validate();
  errorSPOCRef.value.validate();
  WhoDidQCRef.value.validate();
  backgroundRef.value.validate();
  whysRef.value.validate();
  measuresRRef.value.validate();
  measuresPRef.value.validate();

  if (
    ticketIDRef.value.hasError ||
    regionRef.value.hasError ||
    workflowRef.value.hasError ||
    descriptionRef.value.hasError ||
    ReceivedEstatusRef.value.hasError ||
    FinalEstatusRef.value.hasError ||
    errorSPOCRef.value.hasError ||
    WhoDidQCRef.value.hasError ||
    backgroundRef.value.hasError ||
    whysRef.value.hasError ||
    measuresRRef.value.hasError ||
    measuresPRef.value.hasError
  ) {
    // form has error
  } else if (accept.value == true) {
    $q.notify({
      color: "negative",
      message: "You need to accept the license and terms first",
    });
  } else {
    store.save({
      ticketID: ticketID.value,
      region: region.value,
      name: store.ticketsOutput.name,
      workflow: workflow.value,
      description: description.value,
      fecha_hoyi: store.ticketsOutput.fecha_hoyi,
      fecha_hoyf: store.ticketsOutput.fecha_hoyf,
      ReceivedEstatus: ReceivedEstatus.value,
      FinalEstatus: FinalEstatus.value,
      volume: store.ticketsOutput.volume,
      comments: store.ticketsOutput.comments,
      errorSPOC: errorSPOC.value,
      WhoDidQC: WhoDidQC.value,
      background: background.value,
      whys: whys.value,
      measuresR: measuresR.value,
      measuresP: measuresP.value,
    })
    $q.notify({
      icon: "done",
      color: "positive",
      message: "Submitted",
    });
    onReset();
  }
}
function onReset() {
  ticketID.value = null;
  region.value = null;
  workflow.value = null;
  description.value = null;
  ReceivedEstatus.value = null;
  FinalEstatus.value = null;
  store.ticketsOutput.volume = 1;
  store.ticketsOutput.comments = "";
  errorSPOC.value = "";
  WhoDidQC.value = "";
  background.value = "";
  whys.value = "";
  measuresR.value = "";
  measuresP.value = "";

  ticketIDRef.value.resetValidation();
  regionRef.value.resetValidation();
  workflowRef.value.resetValidation();
  descriptionRef.value.resetValidation();
  ReceivedEstatusRef.value.resetValidation();
  FinalEstatusRef.value.resetValidation();
  volumesRef.value.resetValidation();
  commentsRef.value.resetValidation();
  errorSPOCRef.value.resetValidation();
  WhoDidQCRef.value.resetValidation();
  backgroundRef.value.resetValidation();
  whysRef.value.resetValidation();
  measuresRRef.value.resetValidation();
  measuresPRef.value.resetValidation();
}

defineOptions({
  name: "IndexPage",
});
</script>
