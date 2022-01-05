<template>
  <div class="card">
    <h1 class="card__title">Espace Perso</h1>
    <p class="card__subtitle">Voilà donc qui je suis...</p>
    <p>
      <strong>Infos utilisateur: </strong>{{ user.firstName }}
      {{ user.lastName }}
    </p>
    <p>
      <strong> E-mail:</strong>
      {{ user.email }}
    </p>
    <!-- <img :src="user.photo" /> -->
    <div class="form-row">
      <button @click="logout()" class="button">Supprimer le compte</button>
    </div>
  </div>
</template>

<script>
import { mapState } from "vuex";
export default {
  name: "Profile",
  mounted: function () {
    console.log(this.$store.state.userInfos);
    if (this.$store.state.user.userId == -1) {
      this.$router.push("/");
      return;
    } else {
      this.$store.dispatch("getUserInfos");
    }
  },
  computed: {
    ...mapState({
      user: "userInfos",
    }),
  },

  methods: {
    logout: function () {
      console.log("Compte supprimer");
    },
  },
};
</script>

<style scoped></style>
