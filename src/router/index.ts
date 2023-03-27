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
      path: "/morelibrary",
      name: "MoreLibrary",
      component: () => import("../views/caseLibrary/MoreLibrary.vue"),
    },
    {
      path: "/casedetail",
      name: "CaseDetail",
      component: () => import("../views/caseLibrary/CaseDetail.vue"),
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
      redirect: {name: 'SubmissionManage'},
      component: () => import("../views/about/AboutView.vue"),
      children: [
        {
          path: "submissionManage",
          name: 'SubmissionManage',
          component: () => import("../views/about/SubmissionManage.vue")
        },
        {
          path: "myCollection",
          name: 'MyCollection',
          component: () => import("../views/about/MyCollection.vue")
        },
        {
          path: "myCollection",
          name: 'MyCollection',
          component: () => import("../views/about/MyCollection.vue")
        },
        {
          path: "collectionsclassify",
          name: 'CollectionsClassify',
          component: () => import("../views/about/CollectionsClassify.vue")
        },
        {
          path: "mycaseList",
          name: 'MyCaseList',
          component: () => import("../views/about/MyCaseList.vue")
        },
        {
          path: "myCaseLibraryList",
          name: 'MyCaseLibraryList',
          component: () => import("../views/about/MyCaseLibraryList.vue")
        },
        {
          path: "myLike",
          name: 'MyLike',
          component: () => import("../views/about/MyLike.vue")
        },
        {
          path: "myComments",
          name: 'MyComments',
          component: () => import("../views/about/MyComments.vue")
        },
        {
          path: "messages",
          name: 'Messages',
          component: () => import("../views/about/Messages.vue")
        },
        {
          path: "Authentication",
          name: 'Authentication',
          component: () => import("../views/about/Authentication.vue")
        },
        {
          path: "personInfo",
          name: 'PersonInfo',
          component: () => import("../views/about/PersonInfo.vue")
        }
      ]
    },
  ],
});

export default router;
