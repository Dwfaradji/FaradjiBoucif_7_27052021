//Import
import { createRouter, createWebHistory } from "vue-router";
import Login from "../views/Login.vue";
import Wall from "../views/Wall.vue";
import Profile from "../views/Profile.vue";
import Modifypost from "../views/ModifyPost.vue";

//Routes
const routes = [
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
    path: '/modifypost/:id',
    name: 'ModifyPost',
    component: Modifypost
  }
];

const router = createRouter({
  history: createWebHistory(process.env.BASE_URL),
  routes,
});
//Export
export default router;
