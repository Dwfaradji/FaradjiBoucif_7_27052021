<template>
  <div id="app" class="container-fluid"> 
      <Header />
    <!-- <router-link to="/">Connexion</router-link> |
    <router-link to="/signup">Inscription</router-link> -->
    <router-view />
  </div>
  
</template>

<script >

import Header from './components/Header';
export default {
  components: {
    Header
  }}

</script>

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
