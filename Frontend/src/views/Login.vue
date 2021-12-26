<template>
  <body id="LoginForm">
    <div class="container">
      <div class="login-form">
        <div class="main-div">
          <div class="panel">
            <div id="nav">
              <router-link to="/">
                <div class="conexionBar test hover">Connexion</div>
              </router-link>
              <router-link to="/signup">
                <div class="conexionBar hover">Inscription</div>
              </router-link>
            </div>
          </div>
          <div class="contenerInput">
            <form id="Login">
              <div class="form-group">
                <input
                  type="email"
                  class="form-control"
                  id="inputEmail"
                  placeholder="Adresse email"
                  v-model="dataLogin.email"
                />
              </div>

              <div class="form-group">
                <input
                  type="password"
                  class="form-control"
                  id="inputPassword"
                  placeholder="Mot de passe"
                  v-model="dataLogin.password"
                />
              </div>
              <div class="forgot">
                <a href="reset.html">Mot de passe oublié ?</a>
              </div>
              <p>
                <small>
                  Vous n'avez pas encore de compte,
                  <router-link to="/signup">Enregistrez-vous</router-link>
                </small>
              </p>

              <button
                @click.prevent="logIn"
                type="submit"
                class="btn btn-primary"
              >
                Se Connecter
              </button>
            </form>
          </div>
        </div>
      </div>
    </div>
  </body>
</template>
<script>
import axios from "axios";
import { mapState } from "vuex";

export default {
  data() {
    return {
      dataLogin: {
        email: null,
        password: null,
      },
      msg: "",
    };
  },
  computed: {
    ...mapState(["user"]),
  },
  methods: {
    logIn() {
      if (
        //TO DO : Vérifier par Regex
        this.dataLogin.email !== null ||
        this.dataLogin.password !== null
      ) {
        axios
          .post("http://localhost:3000/api/user/login", this.dataLogin)
          .then((response) => {
            localStorage.setItem("token", response.data.token);
            location.replace(location.origin);
          })
          .catch((error) => console.log(error));
      } else {
        console.log("oops !");
      }
    },
  },
};
</script>

<style lang="scss">
.test {
  border-right: 1px solid black;
}
.hover:hover {
  background-color: rgb(206, 206, 206);
}
.conexionBar {
  padding: 10px;
}
.contenerInput {
  background: #ffffff none repeat scroll 0 0;
  border-radius: 2px;
  margin: 10px auto 30px;

  padding: 20px 50px 50px 51px;
}
body#LoginForm {
  background-image: url("https://hdwallsource.com/img/2014/9/blur-26347-27038-hd-wallpapers.jpg");
  background-repeat: no-repeat;
  background-position: center;
  background-size: cover;
  padding: 10px;
}

.form-heading {
  color: #fff;
  font-size: 23px;
}
.panel h2 {
  color: #444444;
  font-size: 18px;
  margin: 0 0 8px 0;
}
.panel p {
  color: #777777;
  font-size: 14px;

  line-height: 24px;
}
.login-form .form-control {
  background: #f7f7f7 none repeat scroll 0 0;
  border: 1px solid #d4d4d4;
  border-radius: 4px;
  font-size: 14px;
  height: 50px;
  line-height: 50px;
}
.main-div {
  background: #ffffff none repeat scroll 0 0;
  border-radius: 2px;
  margin: 10px auto 30px;
  max-width: 38%;
  box-shadow: 15px 15px 15px;
}

.login-form .form-group {
  margin-bottom: 10px;
}
.login-form {
  text-align: center;
}
.forgot a {
  color: #777777;
  font-size: 14px;
  text-decoration: underline;
}
.login-form .btn.btn-primary {
  background: #f0ad4e none repeat scroll 0 0;
  border-color: #f0ad4e;
  color: #ffffff;
  font-size: 14px;
  width: 100%;
  height: 50px;
  line-height: 50px;
  padding: 0;
}
.forgot {
  text-align: left;
  margin-bottom: 30px;
}
.botto-text {
  color: #ffffff;
  font-size: 14px;
  margin: auto;
}
.login-form .btn.btn-primary.reset {
  background: #ff9900 none repeat scroll 0 0;
}
.back {
  text-align: left;
  margin-top: 10px;
}
.back a {
  color: #444444;
  font-size: 13px;
  text-decoration: none;
}
</style>

<style lang="scss"></style>
