<template>
  <div>
    <div class="container">
      <form
        class="col-lg-6 offset-lg-3 cardbox shadow-lg bg-white"
        method="post"
      >
        <div class="input- mb-3">
          <div class="row margin">
            <img
              src="https://www.icone-png.com/png/54/53787.png"
              alt="..."
              class="rounded-circle"
            />
            <input
              type="text"
              v-model="content"
              class="form-control col-10 margin"
              aria-label="Default"
              aria-describedby="inputGroup-sizing-default"
              id="input_text"
              placeholder=" Quoi de neuf ?"
            />
          
            <!-- <input
              type="text"
              v-model="title"
              class="form-control col-10 margin"
              aria-label="Default"
              aria-describedby="inputGroup-sizing-default"
              id="input_text"
              placeholder="titre ?"
            /> -->
          </div>
        </div>
        <form></form>
        <div class="boutton">
          <button class="btn btn-primary">Ajouter un fichier</button>

          <button
            type="submit"
            class="btn btn-primary"
            @click.prevent="createPost"
          >
            Publier
          </button>
        </div>
        <span id="msgReturnAPI" class="mx-3"></span>
      </form>
    </div>
  </div>
</template>

<script>
let userStore = localStorage.getItem("user");
const user = JSON.parse(userStore);
console.log(user);

import { mapState } from "vuex";

export default {
  name: "Create",
  mounted: function () {
    this.$store.dispatch("getUserInfos");
  },
  computed: {
    ...mapState({
      user: "userInfos",
    }),
  },
  props: {
    msg: String,
  },
  data() {
    return {
      title: "",
      content: "",
    };
  },
  methods: {
    createPost: function () {
      this.$store.dispatch("commentPost", {
        title: this.title,
        content: this.content,
        user_id: user.userId,
      });
      this.$router.push("/wall");
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
</style>
