<template>
  <div id="wall" class="wall">
    <CreatePost />
    <Post v-for="post in allPosts" v-bind:key="post.id" :post="post" />
    <!-- boucle v-for sur le tableau posts 
    passer une attribut au composant -->
  </div>
</template>

<script>
import CreatePost from "../components/CreatePost";
import Post from "../components/Post";
import axios from "axios";
const instance = axios.create({
  baseURL: "http://localhost:3000/api/",
});
let userStore = localStorage.getItem("user");
const user = JSON.parse(userStore);
export default {
  name: "Wall",
  components: {
    CreatePost,
    Post,
  },
  data() {
    return {
      post: {
        id: "",
        content: "",
      },
      allPosts: [],
    };
  },
  methods: {},
  // },
  mounted: function () {
      instance.defaults.headers.common["Authorization"] =
        "Bearer " + user.token;
    instance
      .get("/posts/allpost")
      .then((response) => {
        this.allPosts = response.data;
        console.log("response API Post", response.data);
      })
      .catch((error) => {
        console.log(error); //affiche pas le message 'normalement' envoyé par le back
      });
    this.$store.dispatch("getUserInfos");
    //faire un fetch vers route post all et stocker le résultat dans un tableau data

    if (this.$store.state.user.userId == -1) {
      this.$router.push("/");
      return;
    }
  },
};
</script>

<style lang="scss">
.wall {
  background-color: white;
  min-height: 100%;
  padding: 5rem 0 2rem 0;
}
.block-post {
  background-color: white;
  width: 75%;
  margin: auto;
  box-shadow: 0px 3px 10px 0px rgba(0, 0, 0, 0.25);
  border-radius: 0.25rem;
  padding: 0.5rem;
  margin-bottom: 1rem;
  & h3 {
    color: grey;
    margin: 0.25rem 0;
    font-size: 0.75rem;
  }
  & .like-section {
    & div {
      display: inline-block;
      margin: 0 0.5rem;
      & i {
        margin: 0 0.2rem;
      }
      & a {
        text-decoration: none;
        color: grey;
      }
    }
    font-weight: 700;
    color: grey;
  }
}
</style>
