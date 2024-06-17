const routes = [
  {
    path: "/",
    component: () => import("layouts/MainLayout.vue"),
    children: [
      { path: "",            component: () => import("pages/WalletOverview.vue") },   // not working to change HomePage to another name atm
      { path: "/MyRewards",  component: () => import("pages/WalletRewards.vue")},
      { path: "/MyOutposts", component: () => import("pages/WalletOutposts.vue") },   
      { path: "/Project-Performance",    component: () => import("pages/ProjectTotals.vue")},
      { path: "/Mining-Setup",    component: () => import("pages/MiningSetup.vue")}
    ],
  },

  // Always leave this as last one,
  // but you can also remove it
  {
    path: "/:catchAll(.*)*",
    component: () => import("pages/ErrorNotFound.vue"),
  },
];

export default routes;
