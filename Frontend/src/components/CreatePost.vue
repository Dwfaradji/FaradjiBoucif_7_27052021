<template>
  <div>
    <div class="container-fluid mb-3 col-ms-12">
      <form class="container cardbox shadow-lg bg-white post" method="post">
        <div>
          <h1 class="col-xs-5">Bonjour {{ user.firstName }}</h1>
        </div>
        <div class="row justify-content-around align-items-center">
          <img
            v-if="user.image"
            :src="user.image"
            alt="image de l'utilisateur"
            class="rounded-circle m-2 col-1,4"
          />
          <img
            v-else
            src="https://www.icone-png.com/png/54/53787.png"
            alt="..."
            class="rounded-circle m-2 col-1,4"
          />
          <div class="d-flex flex-column col-md-6">
            <input
              type="text"
              v-model="title"
              class="form-control m-2 col-md-12"
              aria-label="title"
              placeholder="Titre"
            />
            <input
              type="text"
              v-model="content"
              class="form-control m-2"
              aria-label="contenue"
              placeholder="Quoi de neuf ?"
            />
          </div>
          <div>
            <button
              type="submit"
              class="btn btn-danger m-2"
              @click.prevent="createPost"
            >
              Publier
            </button>
          </div>
        </div>
        <transition class="text-center text-danger alert" name="fade">
          <p v-if="alert">{{ alert }}</p>
        </transition>
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
  name: "Create",
  data() {
    return {
      title: "",
      content: "",
      alert: null,
      visible: false,
    };
  },
  computed: {
    ...mapState({
      user: "userInfos",
    }),
  },

  methods: {
    async createPost() {
      const Id = this.$store.state.user.userId;
      if (this.title !== "" || this.content !== "") {
        await instance.post("/posts/post", {
          title: this.title,
          content: this.content,
          user_id: Id,
        });
        (this.title = ""), (this.content = "");
        // Met a jour les nouveau post
        this.$emit("post-created");
        this.alert = "";
      } else {
        this.alert = "Veuillez remplir les champs";
      }
    },
  },
  mounted() {
    this.$store.dispatch("getUserInfos");
  },
};
</script>
<style scoped>
.fade-enter-active,
.fade-leave-active {
  transition: opacity 0.3s, transform 0.3s;
}
.fade-enter,
.fade-leave-active {
  opacity: 0;
}
.post {
  border-radius: 10px 10px 10px;
  box-shadow: 30px;
  border: 1px solid rgb(255, 223, 223);
}
img {
  margin-top: 20px;
  width: 100px;
  height: 100px;
}
.input-text {
  width: 60%;
  margin-left: auto;
  margin-right: auto;
  border-radius: 15px 15px 15px 15px;
  padding: 0px;
}
.boutton {
  display: flex;
  flex-direction: row;
  justify-content: space-around;
  margin-left: 10em;
}
</style>
