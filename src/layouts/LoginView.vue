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
      <q-input
        ref="emailRef"
        type="email"
        filled
        v-model="Email"
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
import { getAuth, createUserWithEmailAndPassword } from "firebase/auth";

export default {
  setup() {
    const router = useRouter();
    const $q = useQuasar();

    const name = ref(null);
    const nameRef = ref(null);

    const email = ref(null);
    const emailRef = ref(null);

    const cnumber = ref(null);
    const cnumberRef = ref(null);

    return {
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
          try {
            createUserWithEmailAndPassword(getAuth(), email.value, name.value)
              .then((data) => {
                $q.notify({
                  icon: "done",
                  color: "positive",
                  message: "Submitted",
                });
              })
              .catch((error) => {
                console.log(error.code);
                $q.notify({
                  icon: "done",
                  color: "negative",
                  message:
                    "We have a problem to submit your data. Please try again",
                });
              });
            // db.user.add({
            //   nameUser: name.value,
            //   Cnumber: cnumber.value,
            // });
            // $q.notify({
            //   icon: "done",
            //   color: "positive",
            //   message: "Submitted",
            // });
            setTimeout(() => {
              router.push({ name: "index" });
            }, 2000);
          } catch (error) {
            $q.notify({
              icon: "done",
              color: "negative",
              message:
                "We have a problem to submit your data. Please try again",
            });
          }
        }
      },

      onReset() {
        name.value = null;
        cnumber.value = null;

        nameRef.value.resetValidation();
        cnumberRef.value.resetValidation();
      },
    };
  },
};
</script>
