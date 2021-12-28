<template>
  <nav class="row navbar navbar-expand-lg navbar-light bg-light fixed-top px-4">
    
    <button
      class="navbar-toggler"
      type="button"
      data-toggle="collapse"
      data-target="#navbarToggle"
      aria-controls="navbarToggle"
      aria-expanded="false"
      aria-label="Toggle navigation"
    >
      <span class="navbar-toggler-icon"></span>
    </button>
    <router-link class="navbar-brand " to="/">
      <img class="w-50 col-6 row" src="../assets/icon-left-font-monochrome-black.svg" alt="Logo Groupomania" />
    </router-link>

    <div class="collapse navbar-collapse justify-content-end" id="navbarToggle">
      <ul class="navbar-nav mt-2 mt-lg-0">
        <li class="nav-item" >
          <router-link class="nav-link" to="/">Home</router-link>
        </li>
        <li class="nav-item">
          <router-link class="nav-link" to="/signup">Sign Up</router-link>
        </li>
        <li class="nav-item" >
          <router-link class="nav-link" to="/login">Log In</router-link>
        </li>
        <li class="nav-item" >
          <router-link class="nav-link" to="/user">
            <i class="user-icon fas fa-user"></i>
          </router-link>
        </li>
        <li class="nav-item" >
          <button type="button" class="btn btn-danger" @click="disconnect">Disconnect</button>
        </li>
      </ul>
    </div>
  </nav>
</template>

<script>
export default {
  props: {
    msg: String,
  },
methods:{
disconnect() {
  console.log("déconnecter");
  
    },

}
  
};
</script>
<style lang='scss'>
nav {
  position: fixed;
  top: 0;
}
</style>

