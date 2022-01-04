import { createRouter, createWebHistory, RouteRecordRaw } from "vue-router";

import Login from "../views/Login.vue";
import Wall from "../views/Wall.vue";
import Profile from "../views/Profile.vue";
import Create from "../components/CreatePost.vue";

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
      default: Login,
    },
    meta: {
      title: "S'inscrire",
    },
  },
  {
    path: "/wall",
    name: "Wall",
    components: {
      default: Wall,
    },
    meta: {
      title: "Mur",
    },
  },
  {
    path: "/profile",
    name: "Profile",
    components: {
      default: Profile,
    },
    meta: {
      title: "Profile",
    },
  },
  {
    path: "/create",
    name: "Create",
    components: {
      default: Create,
    },
    meta: {
      title: "Create",
    },
  },
];

const router = createRouter({
  history: createWebHistory(process.env.BASE_URL),
  routes,
});

export default router;
