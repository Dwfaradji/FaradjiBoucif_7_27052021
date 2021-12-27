<template>
  <div>
    <div class="block-post">
      <form method="post">
        <div class="input- mb-3">
          <div class="row">
            <img src="../assets/icon.png" alt="..." class="rounded-circle" />

            <input
              class="input-text"
              id="input_text"
              type="text"
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
};
</script>

<style>
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
