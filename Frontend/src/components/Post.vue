<template>
  <div>
    <div class="container-fluid mb-3">
      <form class="container cardbox shadow-lg bg-white post" method="post">
        <div class="row justify-content-between">
          <p class="ml-3">
            Posté par <strong>{{ post.User.firstName }}</strong>
          </p>
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
        <div class="row justify-content-around">
          <div class="col-7 content">
            <p><strong>Contenue</strong></p>
            <p>{{ post.title }}</p>
            <p>{{ post.content }}</p>
          </div>
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
        <div class="row justify-content-center">
          <div class="col-7">
            <p class="mt-2"><strong>Commentaire</strong></p>
            <p
              v-for="comment in post.Comments"
              :key="comment.content" 
            >
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
    comment: {
      type: Object,
    },
  },
  data() {
    return {
      commentaire: "",
      date: "",
      id_param: this.post.id,
      id: this.post.id,
      comments: {
        post_id: "",
        content: "",
      },
        infoPost:this.infoPost
    };
  },
  mounted: function () {
    console.log(this.post, "ID POST");
    this.$store.dispatch("getUserInfos");
    instance.defaults.headers.common["Authorization"] = "Bearer " + user.token;
    instance
      .get("/comments/allcomments")
      .then((response) => {
        const test = (this.infoPost = response.data);
        console.log("response API Commentaire", test);
      })
      .catch((error) => {
        console.log(error);
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
      this.$router.go();
    },

    deletePost() {
      if (confirm("Voulez-vous vraiment supprimer le post") == true) {
        instance.defaults.headers.common["Authorization"] =
          "Bearer " + user.token;
        instance
          .delete(`/posts/${this.id_param}`)
          .then(() => {
            console.log("instance");
            window.location.reload();
            alert("La suppression du post est bien prise en compte");
            this.$router.push("/wall");
          })
          .catch((error) => console.log(error));
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
