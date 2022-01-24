<template>
  <div>
    <HeaderProfile />
    <section
      class="container col-6 cardbox shadow-lg bg-white border border-danger mt-5 container-box"
    >
      <form>
        <ul>
          <li>
            <label for="titre">Titre</label>
            <input
              class="container border border-danger"
              type="text"
              v-model="post.title"
              placeholder="Titre"
              size="50"
              required
            />
          </li>
          <li>
            <label for="message">Message</label>
            <textarea
              class="container border border-danger"
              v-model="post.content"
              placeholder="Contenu"
              rows="10"
              cols="60"
              required
            ></textarea>
          </li>
        </ul>
      </form>
      <div class="text-center m-2 col-xs-8">
        <div class="lien">
          <button @click="modifyPost()" class="button mb-2">
            Modifier le post
          </button>
        </div>
        <div class="button lien">
          <router-link :to="`/wall/`" class="lien">Retour au post</router-link>
        </div>
      </div>
    </section>
  </div>
</template>
<script>
// Import
import HeaderProfile from "../components/Header.vue";
import { instance } from "@/store";

//Export
export default {
  name: "modifypost",
  components: {
    HeaderProfile,
  },
  data() {
    return {
      id_param: this.$route.params.id,
      post: {
        title: "",
        content: "",
      },
    };
  },
  methods: {
    async modifyPost() {
    const modify = this.post;
        try {
        if (this.post.title !== "" || this.post.content !== "") {
          if (confirm("Voulez-vous vraiment modifier ce post") == true) {
            await instance.put(`posts/${this.id_param}`, modify);
            alert("Votre modification est bien prise en compte");
            this.$emit("post-modify");
            this.$router.push(`/wall`);
          }
        }
      } catch (error) {
        alert("Vous ne pouvez pas modifier ce commentaire");
      }
    },
  },
};
</script>
<style scoped>
.container-box {
  border-radius: 15px 15px 15px;
}
h1 {
  font-size: 2rem;
  background: #dc3545;
  border: 2px solid #ffd7d7;
  border-radius: 20px;
  color: #ffffff;
}
label {
  font-size: 1.3rem;
}
ul {
  display: flex;
  flex-direction: column;
  align-items: center;
  list-style: none;
  padding: 0px;
}
li {
  display: flex;
  flex-direction: column;
  align-items: center;
  margin-bottom: 30px;
}
input {
  border-radius: 15px 15px 15px;
  height: 30px;
  font-size: 1.5rem;
}
textarea {
  border-radius: 15px 15px 15px;
  font-size: 1.3rem;
  height: 120px;
}
.button {
  width: 60%;
  margin-left: auto;
  margin-right: auto;
  border: 2px solid #ffd7d7;
  border-radius: 10px;
  background: #dc3545;
  font-size: 1rem;
  cursor: pointer;
}
.lien {
  text-decoration: none;
  color: #ffffff;
}
</style>
