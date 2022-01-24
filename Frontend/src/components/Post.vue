<template>
  <div>
    <div class="container-fluid mb-3">
      <form class="container cardbox shadow-lg bg-white post" method="post">
        <div class="row justify-content-between delete">
          <p class="ml-3">
            Posté par <strong>{{ post.User.firstName }}</strong> le
            {{ dateFormat(post.createdAt) }} à {{ hourFormat(post.createdAt) }}
          </p>
          <button
            v-if="post.user_id == userStore || isAdmin"
            class="btn btn-flat btn-flat-icon"
            type="button"
            data-toggle="dropdown"
            aria-expanded="false"
            aria-label="Toggle navigation"
          >
            <em class="fa fa-ellipsis-h"></em>
          </button>
          <div
            class="dropdown-menu dropdown-scale dropdown-menu-right"
            role="menu"
          >
            <a
              v-if="post.user_id == userStore"
              class="dropdown-item"
              @click.prevent="modifyPost()"
              >Modifier le post</a
            >
            <a class="dropdown-item" @click.prevent="deletePost()">
              Supprimer le post</a
            >
          </div>
        </div>
        <div class="row justify-content-around col-xs-12">
          <div class="col-7 col-xs-12 content">
            <p><i>Contenue</i></p>
            <b
              ><p>{{ post.title }}</p>
              <p>{{ post.content }}</p></b
            >
          </div>
        </div>
        <div class="container text-center">
          <div>
            <p>{{ post.Comments.content }}</p>
            <button
              v-if="post.Comments.length != 0"
              @click.prevent="toggleComments"
              class="btn btn-danger comment-button"
            >
              Voir {{ post.Comments.length }} commentaire<span
                v-if="post.Comments.length >= 2"
                >s</span
              >
            </button>
            <article v-if="isDisplay" class="">
              <div
                v-bind:key="index"
                v-for="(comment, index) in post.Comments"
                class="comment m-2"
              >
                <p
                  class="container d-flex justify-content-between align-items-center"
                >
                  <span class=""
                    >écrit par <b>{{ comment.User.firstName }} </b> le
                    {{ dateFormat(comment.createdAt) }} à
                    {{ hourFormat(comment.createdAt) }}</span
                  >
                  <button
                    v-if="comment.user_id == userStore || isAdmin"
                    @click.prevent="deleteComment(index)"
                    class="btn btn-danger button-comment"
                  >
                    <i class="far fa-trash-alt"></i>
                  </button>
                </p>
                <p>
                  <b> {{ comment.content }}</b>
                </p>
              </div>
              <button
                v-if="post.Comments.length"
                v-on:click="toggleComments"
                class="btn btn-danger comment-button"
              >
                Cacher le<span v-if="post.Comments.length >= 2">s</span>
                commentaire<span v-if="post.Comments.length >= 2">s</span>
              </button>
            </article>
          </div>
        </div>
        <div class="row justify-content-around align-items-center">
          <img
            v-if="user.image"
            :src="user.image"
            alt="image de l'utilisateur"
            class="rounded-circle m-2"
          />
          <img
            v-else
            src="https://www.icone-png.com/png/54/53787.png"
            alt="..."
            class="rounded-circle m-2 col-1,4"
          />
          <input
            type="text"
            v-model="commentaire"
            class="form-control m-3 col-md-6"
            aria-label="Default"
            aria-describedby="inputGroup-sizing-default"
            placeholder="Ecrire un commentaire"
          />
          <div>
            <button
              type="submit"
              class="btn btn-danger m-2"
              @click.prevent="sendComment"
            >
              Commenter
            </button>
          </div>
        </div>
        <div class="text-center text-danger">{{ alert }}</div>
      </form>
    </div>
  </div>
</template>
<script>
//Import
import { instance } from "@/store";
import { mapState } from "vuex";

//Export
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
  },
  data() {
    return {
      isAdmin: true,
      userStore: this.$store.state.user.userId,
      id_param: this.post.id,
      commentaire: "",
      isDisplay: false,
      alert: "",
    };
  },
  mounted: function () {
    this.userStore = this.$store.state.user.userId;
    this.isAdmin = this.$store.state.user.isAdmin;
  },
  methods: {
    modifyPost() {
      this.$router.push(`/modifypost/${this.id_param}`);
    },

    toggleComments() {
      this.isDisplay = !this.isDisplay;
    },

    async sendComment() {
      if (this.commentaire !== "") {
        await this.$store.dispatch("createComment", {
          content: this.commentaire,
          post_id: this.post.id,
        });
        this.commentaire = "";
        this.alert = "";
        // Envois le nouveau commentaire
        this.$emit("comment-created");
      } else {
        this.alert = "Veuillez remplir les champs";
      }
    },

    dateFormat: function (createdDate) {
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

    async deletePost() {
      const token = this.$store.state.user.token;
      try {
        if (confirm("Voulez-vous vraiment supprimer le post") == true) {
          instance.defaults.headers.common["Authorization"] = "Bearer " + token;
          await instance.delete(`/posts/${this.id_param}`);
          alert("La suppression du post est bien prise en compte");
          // EMIT DELETE POST
          this.$emit("post-delete", { post: this.post.id });
        }
      } catch (error) {
        alert("Vous ne pouvez pas supprimez ce post");
      }
    },

    async deleteComment(index) {
      const token = this.$store.state.user.token;
      try {
        instance.defaults.headers.common["Authorization"] = "Bearer " + token;
        if (confirm("Voulez-vous vraiment supprimer ce commentaire") == true) {
          await instance.delete(
            `/comments/delete/${this.post.Comments[index].id}`
          );
          alert("La suppression du commentaire est bien prise en compte");
          // EMIT DELETE POST
          this.$emit("comment-delete");
        }
      } catch (error) {
        alert("Vous ne pouvez pas supprimez ce commentaire");
      }
    },
  },
};
</script>
<style scoped>
.delete {
  flex-wrap: nowrap;
}
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
  width: 40px;
  height: 40px;
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
  border-radius: 10px;
  font-size: 1rem;
  cursor: pointer;
}
.comment-button {
  margin-left: 10px;
  border-radius: 10px;
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
