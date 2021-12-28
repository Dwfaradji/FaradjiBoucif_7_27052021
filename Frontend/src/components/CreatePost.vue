<template>
  <div>
    <div class="container">
      <form
        class="col-lg-6 offset-lg-3 cardbox shadow-lg bg-white"
        method="post"
      >
        <div class="input- mb-3">
          <div class="row">
            <img src="../assets/icon.png" alt="..." class="rounded-circle" />

            <input
              type="text"
              class="form-control col-10"
              aria-label="Default"
              aria-describedby="inputGroup-sizing-default"
              id="input_text"
              placeholder="Quoi de neuf ,(prénon) ?"
            />
          </div>
        </div>

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

<script lang="ts">
// import { Vue } from "vue-class-component";

// @Options({
//   props: {
//     msg: String,
//   },
// })
export default {
  props: {
    msg: String,
  },
  methods: {
    createPost() {
      console.log("envoyer");
    },
  },
};
</script>

<style scoped>
img {
  width: 10%;
  margin-left: 15px;
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
