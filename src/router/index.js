import { route } from "quasar/wrappers";
import {
  createRouter,
  createMemoryHistory,
  createWebHistory,
  createWebHashHistory,
} from "vue-router";
import { users } from "../database/users";
import { getAuth, onAuthStateChanged } from "firebase/auth";

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: "/",
      component: () => import("layouts/MainLayout.vue"),
      meta: { requiresAuth: true },
      children: [
        {
          path: "",
          name: "index",
          component: () => import("pages/IndexPage.vue"),
        },
        {
          path: "/tickets",
          component: () => import("layouts/ticketsCheck.vue"),
        },
        { path: "/links", component: () => import("layouts/LinksLayout.vue") },
        {
          path: "/templates",
          component: () => import("layouts/TemplatesLayout.vue"),
        },
        {
          path: "/notes",
          component: () => import("layouts/MyNotes.vue"),
        },
        {
          path: "/checklist",
          component: () => import("layouts/CheckList.vue"),
        },
        {
          path: "/newJoiners",
          component: () => import("layouts/NewJoiners.vue"),
        },
      ],
    },
    {
      path: "/auth",
      name: "auth",
      component: () => import("layouts/LoginView.vue"),
    },

    // Always leave this as last one,
    // but you can also remove it
    {
      path: "/:catchAll(.*)*",
      component: () => import("layouts/LoginView.vue"),
    },
  ],
});

const getCurrentUser = () => {
  return new Promise((resolve, reject) => {
    const removeListener = onAuthStateChanged(
      getAuth(),
      (user) => {
        removeListener();
        resolve(user);
      },
      reject
    );
  });
};
//ejecutar antes de mandar informacion
//to = pagina donde vamos. from = de donde venimos. next =
router.beforeEach(async (to, from, next) => {
  //validamos si requiere validacion la ruta, si requiere autenticacion enviamos peticion al backend y si aun esta vigente
  const requiresAuth = to.matched.some((url) => url.meta.requiresAuth);
  if (requiresAuth) {
    try {
      //aqui con lo que esta comentado traemos la informacion del usuario, esto nos serviria el guardarlo en lo que es el estore, para presentarlo cuando sea necesario
      /* const {data} = await AuthAPI.auth()
      console.log(data) */
      console.log(getAuth().currentUser);
      if (await getCurrentUser) {
        console.log("samuel es un genio y este es el user");
        next();
      } else {
        console.log("aqui debera retornar al login");
        next({
          name: "auth",
        });
      }

      // esto ya no sirve y era cuando usaba base de datos local
      // await users
      //   .getInstance()
      //   .get()
      //   .then((result) => {
      //     console.log(result);
      //     if (result[0] != undefined) {
      //       next();
      //     } else {
      //       next({
      //         name: "auth",
      //       });
      //     }
      //   });
      //await AuthAPI.auth()
      //next()
    } catch (error) {
      //que hacer cuando el token no es valido
      next({
        name: "auth",
      });
    }
  } else {
    next();
  }
  console.log(requiresAuth);
});
export default router;
