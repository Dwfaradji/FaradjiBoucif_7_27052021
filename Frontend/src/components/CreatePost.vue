<template>
  <div>
    <div class="container-fluid mb-3">
      <form class="container cardbox shadow-lg bg-white post" method="post">
        <div class="row justify-content-around align-items-center">
          <img
            src="https://www.icone-png.com/png/54/53787.png"
            alt="..."
            class="rounded-circle m-2 col-1,4"
          />
          <div class="d-flex flex-column col-6">
            <input
              type="text"
              v-model="title"
              class="form-control m-2"
              aria-label="Default"
              aria-describedby="inputGroup-sizing-default"
              id="input_text"
              placeholder="Titre"
            />
            <input
              type="text"
              v-model="content"
              class="form-control m-2"
              aria-label="Default"
              aria-describedby="inputGroup-sizing-default"
              id="input_text"
              placeholder="Quoi de neuf ?"
            />
          </div>
          <div>
            <button
              type="submit"
              class="btn btn-primary"
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
      let userStore = localStorage.getItem("user");
      var user = JSON.parse(userStore);
      console.log(user);
      const Id = user.userId;
      console.log(Id, "USER ID");
      this.$store.dispatch("createPost", {
        title: this.title,
        content: this.content,
        date: this.date,
        attachment: this.attachment,
        user_id: Id,
        id: this.id,
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
.post {
  border-radius: 10px 10px 10px;
  box-shadow: 30px;
  border: 1px solid rgb(255, 223, 223);
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
.boutton {
  display: flex;
  flex-direction: row;
  justify-content: space-around;
  margin-left: 10em;
}
</style>
