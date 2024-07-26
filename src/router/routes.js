const routes = [
  {
    path: "/",
    component: () => import("layouts/MainLayout.vue"),
    children: [
      {
        path: "",
        name: "index",
        component: () => import("pages/IndexPage.vue"),
      },
      { path: "/tickets", component: () => import("layouts/ticketsCheck.vue") },
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
];

export default routes;
