<template>
  <div id="nav">
    <!-- <router-link to="/">Connexion</router-link> |
    <router-link to="/signup">Inscription</router-link> -->
  </div>
  <router-view />
</template>

<style lang="scss">
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
}

#nav {
  display: grid;
  grid-template-columns: 1fr 1fr;

  border-bottom: 1px solid black;
  width: 100%;

  a {
    font-weight: bold;
    color: #2c3e50;
    text-decoration: none;

    &.router-link-exact-active {
      color: #f50324;
    }
  }
}
</style>
