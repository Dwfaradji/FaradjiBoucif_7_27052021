<template>
  <div>
    <div class="container-fluid mb-3">
      <form class="container cardbox shadow-lg bg-white post" method="post">
        <div class="row justify-content-between">
          <p class="ml-3">
            Posté par <strong>{{ post.User.firstName }}</strong>
            {{ dateFormat(post.createdAt) }} à {{ hourFormat(post.createdAt) }}
          </p>
          <button
            v-if="post.user_id == userStore || isAdmin"
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
            <!-- <a class="dropdown-item" @click.prevent="deletePost()"
              >Modifier le post</a
            > -->
            <a class="dropdown-item" @click.prevent="deletePost()">
              Supprimer le post</a
            >
          </div>
        </div>
        <div class="row justify-content-around">
          <div class="col-7 content">
            <p><strong>Contenue</strong></p>
            <p>{{ post.title }}</p>
            <p>{{ post.content }}</p>
          </div>
        </div>
        <div class="row justify-content-center">
          <div class="col-7">
            <!--  affiche les deux premier commentaire =>  /!\ ERROR -->
            <p>{{ post.Comments.content }}</p>
            <button
              v-if="post.Comments.length != 0"
              @click.prevent="show"
              class="btn btn-primary comment-button"
            >
              Voir {{ post.Comments.length }} commentaire<span
                v-if="post.Comments.length >= 2"
                >s</span
              >
            </button>
            <article v-if="isDisplay">
              <div
                v-bind:key="index"
                v-for="(comment, index) in post.Comments"
                class="comment p-1"
              >
                <p class="d-flex justify-content-between align-items-center">
                  <!--  affiche le nom de l'utilisateur du commentaire  =>  /!\ ERROR -->
                  <span
                    >écrit par <b>{{ comment.User.firstName }} </b></span
                  >
                  {{ dateFormat(comment.createdAt) }} à
                  {{ hourFormat(comment.createdAt) }}
                  <button
                    v-if="comment.user_id == userStore || isAdmin"
                    @click.prevent="deleteComment(index)"
                    class="btn btn-primary button-comment"
                  >
                    <i class="far fa-trash-alt"></i>
                  </button>
                </p>
                <p>
                  {{ comment.content }}
                </p>
              </div>
              <button v-on:click="hide" class="btn btn-primary comment-button">
                Cacher le<span v-if="post.Comments.length >= 2">s</span>
                commentaire<span v-if="post.Comments.length >= 2">s</span>
              </button>
            </article>
          </div>
        </div>
        <div class="row justify-content-between align-items-center">
          <img
            src="https://www.icone-png.com/png/54/53787.png"
            alt="..."
            class="rounded-circle m-2 col-1"
          />
          <input
            type="text"
            v-model="commentaire"
            class="form-control mr-3 col"
            aria-label="Default"
            aria-describedby="inputGroup-sizing-default"
            id="input_text"
            placeholder="Ecrire un commentaire"
          />
          <div>
            <button
              type="submit"
              class="btn btn-primary m-2"
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
// this.userStore = user.userId

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
      type: Object,
      required: true,
    },
    // comment: {
    //   type: Object,
    // },
  },
  data() {
    return {
      isAdmin: true,
      userStore: "",
      id_param: this.post.id,
      idComment: [],
      commentaire: "",
      date: "",
      isDisplay: false,
      displaycomment: false,
    };
  },
  mounted: function () {
    this.userStore = user.userId;
    this.isAdmin = user.isAdmin;

    this.idComment = this.post.Comments.id;
    this.deletePost;
  },
  methods: {
    show: function () {
      return (this.isDisplay = true);
    },
    hide: function () {
      return (this.isDisplay = false);
    },
    sendComment: async function () {
      await this.$store.dispatch("createComment", {
        date: this.date,
        content: this.commentaire,
        user_id: user.userId,
        post_id: this.post.id,
      });
      // Envois le nouveau commentaire
      this.$emit("comment-created");
    },
    dateFormat(createdDate) {
      const date = new Date(createdDate);
      const options = {
        day: "numeric",
        month: "numeric",
        year: "numeric",
      };
      return date.toLocaleDateString("fr-FR", options);
    },
    hourFormat(createdHour) {
      const hour = new Date(createdHour);
      const options = { hour: "numeric", minute: "numeric", second: "numeric" };
      return hour.toLocaleTimeString("fr-FR", options);
    },

    deletePost() {
      if (confirm("Voulez-vous vraiment supprimer le post") == true) {
        instance.defaults.headers.common["Authorization"] =
          "Bearer " + user.token;
        instance
          .delete(`/posts/${this.id_param}`)
          .then(() => {
            console.log("instance");
            alert("La suppression du post est bien prise en compte");
            // EMIT DELETE POST
            this.$emit("post-delete", { post: this.post.id });
          })
          .catch(() => alert("Vous ne pouvez pas supprimez ce post"));
      }
    },


    deleteComment(index) {
      instance.defaults.headers.common["Authorization"] =
        "Bearer " + user.token;
      if (confirm("Voulez-vous vraiment supprimer ce commentaire") == true) {
        instance
          .delete(`/comments/delete/${this.post.Comments[index].id}`)
          .then(() => {
            alert("La suppression du commentaire est bien prise en compte");
            this.$router.push("/wall");
          })
          .catch(() => alert("Vous ne pouvez pas supprimez ce commentaire"));
      }
    },
  },
};
</script>

<style scoped>
.post {
  border-radius: 10px 10px 10px;
  box-shadow: 30px;
  border: 1px solid rgb(255, 223, 223);
}
.content {
  border: 1px solid rgb(199, 199, 199);
  border-radius: 10px;
  box-shadow: 1px 1px;
}
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
  /* border: 2px solid #fd2d01; */
  border-radius: 10px;
  /* background: #ffd7d7; */
  font-size: 1rem;
  cursor: pointer;
}

.comment-button {
  margin: 10px 0 30px 0;
  padding: 5px 30px;
  /* border: 2px solid #fd2d01; */
  border-radius: 10px;
  /* background: #ffd7d7; */
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
.comment-info {
  padding: 0 30px 0 30px;
}
</style>
