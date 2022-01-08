<template>
  <div>
    <div class="container mb-3">
      <form class="cardbox shadow-lg bg-white" method="post">
        <div class="d-flex justify-content-between align-items-center">
          <img
            src="https://www.icone-png.com/png/54/53787.png"
            alt="..."
            class="rounded-circle m-2"
          />
          <div class="d-flex flex-column col-6">
            <input
              type="text"
              v-model="content"
              class="form-control m-2"
              aria-label="Default"
              aria-describedby="inputGroup-sizing-default"
              id="input_text"
              placeholder="Titre"
            />
            <input
              type="text"
              v-model="title"
              class="form-control m-2"
              aria-label="Default"
              aria-describedby="inputGroup-sizing-default"
              id="input_text"
              placeholder="Quoi de neuf ?"
            />
          </div>
          <div class="d-flex align-items-end mr-2">
            <button type="submit" class="btn btn-primary ml-5">image</button>
            <button
              type="submit"
              class="btn btn-primary ml-5"
              @click.prevent="createPost"
            >
              Publier
            </button>
          </div>
        </div>
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
      date: "",
      attachment: "",
      // user_id: "",
      // likes: "",
    };
  },
  methods: {
    createPost: function () {
      const Id = user.userId;
      console.log(Id, "USER ID");
      this.$store.dispatch("createPost", {
        title: this.title,
        content: this.content,
        date: this.date,
        attachment: this.attachment,
        user_id: Id,
        // likes: this.likes,
      });
      // Met a jour les nouveau post 
      // @ TODO A VOIR AVEC FLORIAN
      this.$router.go();
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
.boutton {
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  margin-left: 10em;
}
</style>
