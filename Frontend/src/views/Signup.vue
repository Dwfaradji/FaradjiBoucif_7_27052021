
  <!-- <body id="LoginForm">
    <div class="container">
      <div class="login-form">
        <div class="main-div">
          <div class="panel"></div>
          <div class="contenerInput">
            <form id="Login">
              <div class="form-group">
                <input
                  type="text"
                  class="form-control"
                  id="firstname"
                  placeholder="Prénom"
                  v-model="dataSignup.firstName"
                />
              </div>

              <div class="form-group">
                <input
                  type="text"
                  class="form-control"
                  placeholder="Nom"
                  id="lastname"
                  name="lastname"
                  v-model="dataSignup.lastName"
                />
              </div>

              <div className="form-group">
                <input
                  type="email"
                  class="form-control"
                  placeholder="Adresse email"
                  id="email"
                  name="email"
                  v-model="dataSignup.email"
                />
              </div>
              <div className="form-group">
                <input
                  type="password"
                  class="form-control"
                  placeholder="Mot de passe"
                  id="password"
                  name="password"
                  v-model="dataSignup.password"
                />
              </div>
              <p>
                <small>
                  Vous avez déjà un compte,
                  <router-link to="/login">Connecter-vous</router-link>
                </small>
              </p>
              <button
                @click.prevent="sendSignup"
                type="submit"
                class="btn btn-primary"
              >
                S'inscrire
              </button>
            </form>
          </div>
        </div>
      </div>
    </div>
  </body> -->



// // import { mapState } from "vuex";
// import axios from "axios";
// export default {
//   data() {
//     return {
//       dataSignup: {
//         firstName: null,
//         lastName: null,
//         email: null,
//         password: null,
//       },
//     };
//   },
//   props: {
//     firstName: String,
//     lastName: String,
//     email: String,
//     password: String,
//     confirmPassword: String,
//     msg: String,
//     name: String,
//   },

//   methods: {
//     sendSignup() {
//       const regexPassword = /((?=.*\d)(?=.*[a-z])(?=.*[A-Z])(?=.*[\W]).{8,64})/;
//       const regexEmail =
//         /^[a-z0-9!#$ %& '*+/=?^_`{|}~-]+(?:\.[a-z0-9!#$%&' * +/=?^_`{|}~-]+)*@(?:[a-z0-9](?:[a-z0-9-]*[a-z0-9])?\.)+[a-z0-9](?:[a-z0-9-]*[a-z0-9])?$/g;
//       const usernameRegex = /^(?!.*\.\.)(?!.*\.$)[^\W][\w.]{0,29}$/;
//       if (
//         (this.dataSignup.firstName !== null ||
//           this.dataSignup.lastName !== null ||
//           this.dataSignup.email !== null ||
//           this.dataSignup.password !== null) &&

//         usernameRegex.test(this.dataSignup.firstName) &&
//         usernameRegex.test(this.dataSignup.lastName) &&
//         regexEmail.test(this.dataSignup.email) &&
//         regexPassword.test(this.dataSignup.password)
//       ) {
//         axios
//           .post("http://localhost:3000/api/user/signup", this.dataSignup)
//           .then((response) => {
//             console.log(response);
//             //Réinitialisation
//             this.dataSignup.firstName = null;
//             this.dataSignup.lastName = null;
//             this.dataSignup.email = null;
//             // this.dataSignup.password = null;
//           })
//           .catch((error) => console.log(error));
//       } else {
//         alert("oops ! Un problème est survenue avec vos saisies");
//       }
//     },
//   },
// };

