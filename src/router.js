import { createRouter, createWebHistory } from "vue-router";

import NotFound from "./pages/NotFound.vue";
import store from "./store/index.js";

const CoachesDetails = () => import("./pages/coaches/CoachesDetails.vue");
const CoachesList = () => import("./pages/coaches/CoachesList.vue");
const CoachesRegister = () => import("./pages/coaches/CoachesRegister.vue");
const ContactCoach = () => import("./pages/requests/ContactCoach.vue");
const RequestReceived = () => import("./pages/requests/RequestReceived.vue");
const AboutUs = () => import("./pages/AboutUs.vue");
const UserAuth = () => import("./pages/auth/UserAuth.vue");

const router = createRouter({
  history: createWebHistory(),
  routes: [
    {
      path: "/",
      redirect: "/coaches",
    },
    {
      path: "/coaches",
      component: CoachesList,
    },
    {
      path: "/coaches/:id",
      component: CoachesDetails,
      props: true,
      children: [
        {
          path: "contact",
          component: ContactCoach,
        },
      ],
    },
    {
      path: "/coaches/register",
      component: CoachesRegister,
      meta: { requiresAuth: true },
    },
    {
      path: "/requests",
      component: RequestReceived,
      meta: { requiresAuth: true },
    },
    {
      path: "/:notFound(.*)",
      component: NotFound,
    },
    {
      path: "/about",
      component: AboutUs,
    },
    {
      path: "/auth",
      component: UserAuth,
      meta: { requiresUnauth: true },
    },
  ],
});

router.beforeEach((to, _, next) => {
  if (to.meta.requiresAuth && !store.getters.isAuthenticated) {
    next({ path: "/auth", query: { redirect: to.fullPath } });
  } else if (to.meta.requiresUnauth && store.getters.isAuthenticated) {
    next({ path: "/" });
  } else {
    next();
  }
});

export default router;
