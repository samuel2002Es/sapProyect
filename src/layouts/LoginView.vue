<template>
  <div
    class="q-pa-md flex justify-center items-center content-center"
    style="height: 100vh"
  >
    <form
      @submit.prevent.stop="onSubmit"
      @reset.prevent.stop="onReset"
      class="q-gutter-md"
      style="width: 300px"
    >
      <div class="text-center">{{ acceder ? "Login" : "Registration" }}</div>
      <q-input
        ref="emailRef"
        type="email"
        filled
        v-model="email"
        label="Your Email "
        hint="Email"
        lazy-rules
      />
      <q-input
        ref="nameRef"
        filled
        v-model="name"
        label="Your name *"
        hint="Name and surname"
        lazy-rules
        :rules="nameRules"
      />
      <q-input
        ref="cnumberRef"
        filled
        v-model="cnumber"
        label="Your C number"
        hint="C number compleate"
        lazy-rules
        :rules="cnumberRules"
      />
      <div>
        <q-btn label="Submit" type="submit" color="primary" />
        <q-btn
          v-if="!acceder"
          label="I have an account"
          color="primary"
          outline
          class="q-ml-sm"
          @click="acceder = true"
        />
        <q-btn
          v-if="acceder"
          label="I don't have an account"
          color="negative"
          outline
          class="q-ml-sm"
          @click="acceder = false"
        />
        <q-btn
          label="Reset"
          type="reset"
          color="primary"
          flat
          class="q-ml-sm"
        />
      </div>
    </form>
  </div>
</template>

<script>
import { db } from "../database/db";
import { useQuasar } from "quasar";
import { ref } from "vue";
import { useRouter } from "vue-router";
import {
  getAuth,
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
} from "firebase/auth";
import { useCounterStore } from "../stores/example-store";
const store = useCounterStore();

export default {
  setup() {
    const acceder = ref(true);

    const router = useRouter();
    const $q = useQuasar();

    const name = ref(null);
    const nameRef = ref(null);

    const email = ref(null);
    const emailRef = ref(null);

    const cnumber = ref(null);
    const cnumberRef = ref(null);

    return {
      acceder,
      email,
      emailRef,
      name,
      nameRef,
      nameRules: [(val) => (val && val.length > 0) || "Please type something"],

      cnumber,
      cnumberRef,
      cnumberRules: [
        (val) => (val && val.length == 8) || "Please type your C number again",
        (val) => (val && val[0] == "C") || "Please start with C",
      ],

      onSubmit() {
        nameRef.value.validate();
        cnumberRef.value.validate();

        if (nameRef.value.hasError || cnumberRef.value.hasError) {
          // form has error
          $q.notify({
            icon: "done",
            color: "negative",
            message: "We have a problem to submit your data. Please try again",
          });
        } else {
          if (acceder.value == false) {
            //registro
            createUserWithEmailAndPassword(
              getAuth(),
              email.value,
              cnumber.value
            )
              .then((data) => {
                console.log("mirar si funciona", data);
                store.user = data;
                $q.notify({
                  icon: "done",
                  color: "positive",
                  message: "Submitted",
                });
                db.user.add({
                  nameUser: name.value,
                  Cnumber: cnumber.value,
                });
              })
              .catch((error) => {
                console.log(error.code);
                $q.notify({
                  icon: "done",
                  color: "negative",
                  message:
                    "We have a problem to submit your data. Please try again creation problem ",
                });
              });
            setTimeout(() => {
              router.push({ name: "index" });
            }, 2000);
          } else {
            //login
            signInWithEmailAndPassword(getAuth(), email.value, cnumber.value)
              .then((data) => {
                console.log("mirar si funciona", data);
                store.user = data;
                $q.notify({
                  icon: "done",
                  color: "positive",
                  message: "Submitted",
                });
                db.user.add({
                  nameUser: name.value,
                  Cnumber: cnumber.value,
                });
              })
              .catch((error) => {
                console.log(error.code);
                $q.notify({
                  icon: "done",
                  color: "negative",
                  message:
                    "We have a problem to submit your data. Please try again login problem ",
                });
              });
            setTimeout(() => {
              router.push({ name: "index" });
            }, 2000);
          }
        }
      },

      onReset() {
        name.value = null;
        cnumber.value = null;
        email.value = null;

        nameRef.value.resetValidation();
        cnumberRef.value.resetValidation();
      },
    };
  },
};
</script>
