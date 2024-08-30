<template>
  <div class="q-pa-md row items-start q-gutter-md">
    <q-card class="my-card" flat bordered v-for="item in templates" :key="item">
      <q-card-section @click="store.copyTextToClipboard(item.texto)">
        <div class="text-h7 q-mt-sm q-mb-xs text-center">{{ item.titulo }}</div>
      </q-card-section>
      <q-card-actions>
        <q-space />
        <q-btn
          color="grey"
          round
          flat
          dense
          :icon="expanded ? 'keyboard_arrow_up' : 'keyboard_arrow_down'"
          @click="toggleExpanded(item)"
        />
      </q-card-actions>
      <q-slide-transition>
        <div v-show="item.expanded">
          <q-separator />
          <q-card-section
            class="text-h9"
            :style="{ whiteSpace: 'pre-line' }"
          >
            {{ item.texto }}
          </q-card-section>
        </div>
      </q-slide-transition>
    </q-card>
  </div>
</template>
<style lang="sass" scoped>
.my-card
  width: 20%
  max-width: 300px
</style>
<script setup>
import { ref, computed, onMounted, inject, watch } from "vue";
import { useCounterStore } from "../stores/example-store";
const store = useCounterStore();
const expanded = ref(false);
const toggleExpanded = (index) => {
  console.log(index.expanded);
  index.expanded = !index.expanded;
};
const templates = ref([
  {
    expanded: false,
    titulo: "EDX",
    texto: `Note: EDX: For your next ticket please use the EDX Service Catalog to submit your request for Data Management topics https://edx.int.sap/edx-services/ . This will allow us to process your ticket faster.`,
  },

  {
    expanded: false,
    titulo: "First message",
    texto: `Hi
Thank you for reaching out to us.
We have received your request and currently looking into the details.
We will reach out asap if there is any clarification or additional information needed.
Thanks
[name]
Data services Bureau
IDM Data Operations Excellence`,
  },
  {
    expanded: false,
    titulo: "Complete ticket",
    texto: `Hi
We are pleased to inform you that this request is now completed.
You may refer to the attached working file for full details.
Please don't hesitate to reach out for any feedback or clarifications.
Best regards,
[name]
Data services Bureau
IDM Data Operations Excellence`,
  },
  {
    expanded: false,
    titulo: "Close ticket",
    texto: `Hi ,

As we haven't heard from you since our last update, please be informed that we are scheduled to mark this ticket as closed.
Please open a new ticket if you have any other concerns, or reopen this ticket if you want us to follow up with this request.
As always, we are more than happy to assist you.

Thanks
[name]
Data services Bureau
IDM Data Operations Excellence`,
  },
  {
    expanded: false,
    titulo: "Unable to validate the account",
    texto: `We are unable to validate the requested account name with the address details in the 3rd party data vendor and local government authority websites approved by Compliance. Kindly provide us valid supporting documents to validate the requested account name and address details. Once provided and verified, we can proceed further with account update.

Accepted supporting documents:
•Link to local government authority websites or registry confirming requested details.
•Legally valid documentation (such as Corporate Incorporation Certificate).
•Tax certificates/government certificate.
Please keep in mind that for Compliance purposes, screenshots, company website or any customer mail are not considered as valid supporting document.
`,
  },
  {
    expanded: false,
    titulo: "Accepted documents",
    texto: `
Accepted supporting documents:
•Link to local government authority websites or registry confirming requested details.
•Legally valid documentation (such as Corporate Incorporation Certificate).
•Tax certificates/government certificate.
Please keep in mind that for Compliance purposes, screenshots, company website or any customer mail are not considered as valid supporting document.
`,
  },
  {
    expanded: false,
    titulo: "Follow up",
    texto: `
Hello 

I hope you are doing fine.
Continuing with your request, do you have any update? please let me know.

Thanks and Regards
[name]
Data services Bureau
IDM Data Operations Excellence
`,
  },
  {
    expanded: false,
    titulo: "Forwarded",
    texto: `Dear Colleague,
Please look into below requestor requirement and kindly extend your support.
Reason for Handover: Out of Scope from DSB
Close or Return Ticket: Notify the user after changes are done then close the ticket (change if necessary)
Thanks
[name]
Data services Bureau
IDM Data Operations Excellence
`,
  },
  {
    expanded: false,
    titulo: "Hierarchy",
    texto: `All hierarchy updates in CRM must be supported with one or more of the following sources/approvals below
a. Written agreement from senior management
b. Written approval from both the GRO Planners
c. Written letter from the customer
d. Proof of legal structure as defined by approved third party vendor
e. Proof of legal structure as shown in official government website
f. Proof of legal structure as shown in latest financial report`,
  },
  {
    expanded: false,
    titulo: "Name update EU",
    texto: `Hi,
Good day.
Please be informed that the provide account id has active status of Customer Tech Install, due to it we are not able to update CRM account name, requestor should be directed to submit a Contract Request Form (CRF) for a NAMECHANGE AMENDMENT NORTH AMERICA (within the ON PREM DIRECT Section) to engage the Shared Service Centre Contracting team to do the Amendment in this
https://one.int.sap/functional_areas/sales_and_presales/cxd_contracting_technology/contract_request_forms#91fc84f9-937a-4296-bab5-b78e680d0663_c586
you need to include the Secretary of State Certificate indicating name change only
Once the SSC team receives a CRF with all required info, they will prepare a Name Change Amendment. Once such Amendment is executed, the SSC will upload into CMS, and then O2I team will log a SALES direct ticket under the category Account Name & Address Update with the subject “Name/Address change Amendment – Data Action Required” and the name/address change document that has been signed attached requesting for DSB to make the update in CRM. DSB will only process changes with the subject information as instructed before. If ticket with amendment is not created by O2I, DSB must inform requestor that we only accept requests from O2Ito “ensure the tracking of the request for future reference”.
All questions regarding CMS submission including the contract type that should be select should be instructed to channel them through CDS/PSC teams. (GCF PSCAmericas) GCF_PSC_AMERICAS@sap.com
For more information on the contracting side, you can check the legal portal

We appreciate your understanding.
Thanks
[name]
Data services Bureau
IDM Data Operations Excellence`,
  },
  {
    expanded: false,
    titulo: "ship to address",
    texto: `Hi ,
the account has Active Status, kindly send a request to the SSC Contracting team to performa Delivery Address Change Amendment. Include the Contracting team contact information inthe template below according to the contract type displayed in CMS.
SLA On Premise (Direct)
Cloud Renewal
Cloud Subscription
  GCF_PSC_AMERICAS@sap.com mailto: GCF_PSC_AMERICAS@sap.com
  GCF_PSC_EMEA@sap.com mailto: GCF_PSC_EMEA@sap.com
  GCF_PSC_MEE@sap.com mailto: GCF_PSC_MEE@sap.com
  GCF_PSC_APJ_GC@sap.com mailto: GCF_PSC_APJ_GC@sap.com
SLA On Premise (Indirect)
  NA_Channel_Legal_Contracts@sap.com

Once such Amendment is executed, the SSC will upload into CMS, and the O2Ibooking team will log a  SALESdirect ticket under the category Account Name &Address Update with the subject “Name/Address change Amendment – Data Action Required” and the name/address change document that has been signed attached requesting for DSB to make the update in CRM. DSB will only process changes with the subject information as instructed before. If ticket with amendment is not created by O2I, DSB must inform requestor that we only accept requests from O2I to “ensure the tracking of the request for future reference
Thanks and regards
[name]
Data Services Bureau – DSB
IDM Data Operations Excellence`,
  },
  {
    expanded: false,
    titulo: "Reopened Additional Asks/Requirements",
    texto: `Reopened due to Additional Asks/Requirements`,
  },
  {
    expanded: false,
    titulo: "Reopened Data Replication Delay in Other Systems",
    texto: `Reopened due to Data Replication Delay in Other Systems`,
  },
  {
    expanded: false,
    titulo: "Reopened IT issues",
    texto: `Reopened due to IT issues`,
  },
  {
    expanded: false,
    titulo: "Reopened Out of Scope Tickets",
    texto: `Reopened due to Out of Scope Tickets`,
  },
  {
    expanded: false,
    titulo: "Reopened Unauthorized Requestor",
    texto: `Reopened due to Unauthorized Requestor`,
  },
  {
    expanded: false,
    titulo: "Reopened Convey Thanks",
    texto: `Reopened to Convey Thanks`,
  },
  {
    expanded: false,
    titulo: "Reopened Missing Info/Requirements",
    texto: `Reopened to Provide Missing Info/Requirements`,
  },
  {
    expanded: false,
    titulo: "Reopened Quality Issue with Processing",
    texto: `Reopened due to Quality Issue with Processing`,
  },
  {
    expanded: false,
    titulo: "Reopened Duplicate BP",
    texto: `Reopened due to Duplicate BP`,
  },
  {
    expanded: false,
    titulo: "Internal Account",
    texto: `Unfortunately we, the data management team, are not authorized to make any changes   on   such   SAP   internal   accounts.   Please   enter   your   ticket   requests   in FINANCE direct here
https://fiorilaunchpad-sapitcloud.dispatcher.hana.ondemand.com/sites#Help-Inbox&/create/ZFAR/ZFAR_CFR/null/03/null/null/null)`,
  },
  {
    expanded: false,
    titulo: "Change email account level",
    texto: `Email at account level is not possible to be maintained any longer (for a couple of years now) – it was agreed long ago and is in the backlog to completely remove this field from the system for a couple of reasons –
1) Email at company level is rarely used – only emails at contact level really make any sense
2) and more importantly – there are GDPR issues as frequently there are personal email addresses in this field, although maintained at company level, is actually for a person working at the company and this is a breach of GDPR as this should only be maintained at contact relationship level.
 
At company level we have another form of communication e.g. Telephone or Website – until this is done the field remains but is not open for editing, it should not be used in any business processes any longer.
 
We are closing this ticket here and for any further doubt on this, please reach out to our colleague Jacqui Gilmore (I023854`,
  },

]);
</script>
