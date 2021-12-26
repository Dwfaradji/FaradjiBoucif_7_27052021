import { createRouter, createWebHistory, RouteRecordRaw } from "vue-router";

import Login from "../views/Login.vue";
import Signup from "../views/Signup.vue";

const routes: Array<RouteRecordRaw> = [
  {
    path: "/",
    name: "Login",
    components: {
      default: Login,
    },
    meta: {
      title: "Se connecter",
    },
  },
  {
    path: "/signup",
    name: "Signup",
    components: {
      default: Signup,
    },
    meta: {
      title: "S'inscrire",
    },
  },
];

const router = createRouter({
  history: createWebHistory(process.env.BASE_URL),
  routes,
});

export default router;
