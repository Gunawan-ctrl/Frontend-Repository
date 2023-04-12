const routes = [
  {
    path: "/",
    component: () => import("layouts/MainLayout.vue"),
    children: [
      {
        path: "",
        name: "home",
        component: () => import("pages/admin/IndexPage.vue"),
      },
      {
        path: "all-repository",
        name: "allRepository",
        component: () => import("pages/admin/repository/AllRepository.vue"),
      },
      {
        path: "add-repository",
        name: "addRepository",
        component: () => import("pages/admin/repository/AddRepository.vue"),
      },
      {
        path: "all-categories",
        name: "allCategories",
        component: () => import("pages/admin/categories/AllCategories.vue"),
      },
      {
        path: "add-categories",
        name: "addCategories",
        component: () => import("pages/admin/categories/AddCategories.vue"),
      },
    ],
  },

  //  path no children
  {
    path: "/login",
    name: "login",
    component: () => import("pages/access/SigInPage.vue"),
  },
  {
    path: "/:catchAll(.*)*",
    component: () => import("pages/ErrorNotFound.vue"),
  },
];

export default routes;
