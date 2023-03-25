import { createRouter, createWebHistory } from "vue-router";
import HomeView from "../views/home/HomeView.vue";

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: "/",
      name: "home",
      component: HomeView,
    },
    {
      path: "/contribute",
      name: "Contribute",
      component: () => import("../views/contribute/Contribute.vue"),
    },
    {
      path: "/caselibrary",
      name: "CaseLibrary",
      component: () => import("../views/caseLibrary/CaseLibrary.vue"),
    },
    {
      path: "/casespectrum",
      name: "CaseSpectrum",
      component: () => import("../views/caseSpectrum/CaseSpectrum.vue"),
    },
    {
      path: "/visualization",
      name: "Visualization",
      component: () => import("../views/visualization/Visualization.vue"),
    },
    {
      path: "/advancedSearch",
      name: "AdvancedSearch",
      component: () => import("../views/advancedSearch/AdvancedSearch.vue"),
    },
    {
      path: "/about",
      name: "About",
      // route level code-splitting
      // this generates a separate chunk (About.[hash].js) for this route
      // which is lazy-loaded when the route is visited.
      component: () => import("../views/AboutView.vue"),
    },
  ],
});

export default router;
