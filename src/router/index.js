import Vue from "vue";
import VueRouter from "vue-router";

Vue.use(VueRouter);

const routes = [
  {
    path: "/",
    component: () => import("../layouts/Main.vue"),
    children: [
      {
        path: "/",
        name: "MainLayout",
        component: () => import("../pages/Index.vue"),
      },
      {
        path: "/:breed",
        name: "breed",
        component: () => import("../pages/:Breed.vue"),
      },
      {
        path: "/:breed/single",
        name: "SingleDog",
        component: () => import("../pages/:SingleDog.vue"),
      },
    ],
  },
];

const router = new VueRouter({
  mode: "history",
  routes,
});

export default router;
