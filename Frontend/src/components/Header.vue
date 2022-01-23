<template>
  <nav
    class="container-fluid navbar navbar-expand-lg navbar-light bg-light fixed-top px-4"
  >
    <button
      class="navbar-toggler"
      type="button"
      data-toggle="collapse"
      data-target="#navbar-Toggle"
      aria-controls="navbarToggle"
      aria-expanded="false"
      aria-label="Toggle navigation"
    >
      <span class="navbar-toggler-icon"></span>
    </button>
    <router-link class="navbar-brand" to="/">
      <img
        class="w-50 pl-3"
        src="../assets/icon-left-font-monochrome-black.svg"
        alt="Logo Groupomania"
      />
    </router-link>
    <div
      v-if="this.$store.state.user.userId !== -1"
      class="collapse navbar-collapse justify-content-start justify-content-md-end"
      id="navbar-Toggle"
    >
      <ul class="navbar-nav mt-2 mt-lg-0">
        <li class="nav-item">
          <router-link class="nav-link text-dark" to="/wall">Home</router-link>
        </li>
        <li class="nav-item">
          <router-link
            class="nav-link text-dark"
            aria-label="Profile"
            to="/profile"
          >
            <i class="user-icon fas fa-user"></i>
          </router-link>
        </li>
        <li class="nav-item">
          <button type="button" class="btn btn-danger" @click="logout">
            Déconnecter
          </button>
        </li>
      </ul>
    </div>
  </nav>
</template>
<script>
//Export
export default {
  props: {
    msg: String,
  },
  methods: {
    logout() {
      console.log("déconnecter");
      this.$store.commit("logout");
      this.$router.push("/");
    },
  },
};
</script>
<style lang="scss">
@media only screen and (max-width: 700px) {
  .navbar {
    display: grid;
    grid-template-columns: 0fr 5fr;
  }
}
nav {
  position: fixed;
  top: 0;
}
</style>
