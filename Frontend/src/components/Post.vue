<template>
  <div>
    <div class="container">
      <form class="cardbox shadow-lg bg-white" method="post">
        <div class="d-flex justify-content-between">
          <p class="m-0">Posté par {{ user.firstName }} a ../../..</p>
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
              <a class="dropdown-item" @click.prevent="deletePost"
                >Modifier le post</a
              >
              <a class="dropdown-item" href="#">Supprimer le post</a>
            </div>
          </div>
        </div>
        <div>
          <p>Contenue</p>
        </div>
        <div class="d-flex justify-content-between align-items-center">
          <img
            src="https://www.icone-png.com/png/54/53787.png"
            alt="..."
            class="rounded-circle m-2"
          />
          <input
            type="text"
            v-model="content"
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
              @click.prevent="createComment"
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
let userStore = localStorage.getItem("user");
const user = JSON.parse(userStore);

// Importation module
import { mapState } from "vuex";

export default {
  name: "Post",
  mounted: function () {
    this.$store.dispatch("getAllPost");
    this.$router.push("/wall");
  },
  computed: {
    ...mapState({
      user: "userInfos",
    }),
  },
  props: {
    post: {
      // @ TODO problème recupération post
      type: Object,
      // required: true,
    },
  },
  data() {
    return {
      content: "",
      user_id: "",
      date: "",
    };
  },
  methods: {
    createComment: function () {
      this.$store.dispatch("commentPost", {
        date: this.date,
        content: this.content,
        user_id: user.userId,
      });
    },
    // deletePost() {
    //   if (confirm("Voulez-vous vraiment supprimer le post") == true) {
    //     fetch(`http://localhost:3000/api/posts/${this.id_param}`, {
    //       method: "DELETE",
    //     })
    //       .then((response) => response.json())
    //       .then(() => {
    //         alert("La suppression du post est bien prise en compte");
    //         this.$router.push("/allposts");
    //       });
    //   }
    // },
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
</style>
