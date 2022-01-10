<template>
  <div>
    <div class="container mb-3">
      <form class="cardbox shadow-lg bg-white" method="post">
        <div class="d-flex justify-content-between">
          <p class="m-0">Posté par {{ post.User.firstName }} a ../../..</p>
          <div class="dropdown float-right">
            <button
              class="btn btn-flat btn-flat-icon"
              type="button"
              data-toggle="dropdown"
              aria-expanded="false"
            >
              <em class="fa fa-ellipsis-h"></em>
            </button>
            <div
              class="dropdown-menu dropdown-scale dropdown-menu-right"
              role="menu"
            >
              <a class="dropdown-item" @click.prevent="deletePost()"
                >Modifier le post</a
              >
              <a class="dropdown-item" @click.prevent="deletePost()">
                Supprimer le post</a
              >
            </div>
          </div>
        </div>
        <div>
          <p>Contenue</p>
          <p>{{ post.title }}</p>
          <p>{{ post.content }}</p>
          <!-- <button
            v-if="comments.length != 0"
            v-on:click="show"
            class="comment-button"
          >
            Voir {{ comments.length }} commentaire<span
              v-if="comments.length >= 2"
              >s</span
            >
          </button> -->
        </div>
        <div>
          <p>Commentaire</p>
          <div>
            <p v-for="comment in comments" :key="comment.content" :conmment="comment">
              {{ comment.content }}
            </p>
          </div>
        </div>
        <!-- <button v-on:click="hide" class="comment-button">
          Cacher le<span v-if="comments.length >= 2">s</span> commentaire<span
            v-if="comments.length >= 2"
            >s</span
          >
        </button> -->
        <div class="d-flex justify-content-between align-items-center">
          <img
            src="https://www.icone-png.com/png/54/53787.png"
            alt="..."
            class="rounded-circle m-2"
          />
          <input
            type="text"
            v-model="commentaire"
            class="form-control"
            aria-label="Default"
            aria-describedby="inputGroup-sizing-default"
            id="input_text"
            placeholder="Ecrire un commentaire"
          />
          <div class="d-flex align-items-center mr-2">
            <button
              type="submit"
              class="btn btn-primary ml-5"
              @click.prevent="sendComment"
            >
              Commenter
            </button>
          </div>
        </div>
      </form>
    </div>
  </div>
</template>

<script>
// Recupereration des informations dans le local storage

import axios from "axios";
const instance = axios.create({
  baseURL: "http://localhost:3000/api/",
});
const userStore = localStorage.getItem("user");
const user = JSON.parse(userStore);
// const idUser = user.userId;

// Importation module
import { mapState } from "vuex";
export default {
  name: "Post",
  computed: {
    ...mapState({
      user: "userInfos",
    }),
  },
  props: {
    post: {
      // @ TODO problème recupération post
      type: Object,
      required: true,
    },
  },
  data() {
    return {
      // id_param: this.$route.params.id,
      commentaire: "",
      date: "",
      comments: {
        // post_id: "",
        // content: "",
      },
      // comment: {
      //   id: "",
      //   content: "",
      // },
    };
  },
  mounted: function () {
    console.log(this.comments);
    this.$store.dispatch("getUserInfos");
    instance.defaults.headers.common["Authorization"] = "Bearer " + user.token;
    instance
      .get("/comments/allcomments")
      .then((response) => {
        const test = (this.comments = response.data);
        console.log("response API Commentaire", test);
      })
      .catch((error) => {
        console.log(error); //affiche pas le message 'normalement' envoyé par le back
      });
  },
  methods: {
    sendComment: function () {
      this.$store.dispatch("createComment", {
        date: this.date,
        content: this.commentaire,
        user_id: user.userId,
        post_id: this.post.id,
      });
    },

    deletePost() {
      if (confirm("Voulez-vous vraiment supprimer le post") == true) {
        instance
          .delete(`/posts/${this.id_param}`)
          .then((response) => response.data)
          .then(() => {
            alert("La suppression du post est bien prise en compte");
            this.$router.push("/wall");
          });
      }
    },
  },
};
</script>

<style scoped>
img {
  margin-top: 20px;
  width: 10%;
}
.input-text {
  width: 60%;
  margin-left: auto;
  margin-right: auto;
  border-radius: 15px 15px 15px 15px;
  padding: 0px;
}
.margin {
  margin-top: 30px;
}
.boutton {
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  margin-left: 10em;
}
.button-comment {
  margin: 10px 0 10px 10px;
  padding: 5px 5px;
  border: 2px solid #fd2d01;
  border-radius: 10px;
  background: #ffd7d7;
  font-size: 1rem;
  cursor: pointer;
}

.comment-button {
  margin: 10px 0 30px 0;
  padding: 5px 30px;
  border: 2px solid #fd2d01;
  border-radius: 10px;
  background: #ffd7d7;
  font-size: 1rem;
  cursor: pointer;
}

.comment-content {
  padding: 0 30px 0 30px;
}
.comment {
  border: 2px solid #000000;
  border-radius: 20px;
  margin-bottom: 20px;
}
</style>
