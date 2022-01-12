<template>
  <div class="card">
    <h1 class="card__title">Votre profil</h1>
    <p class="card__subtitle">Voilà donc qui je suis...</p>
    <div class="row justify-content-center">
      <div class="">
        <div class="col-sm">
          <div class="parent-div">
            <div class="media profile">
              <img
                :src="previewImage"
                style="width: 45%"
                class="rounded-circle align-self-center mr-3"
              />
            </div>
            <button
              class="button"
              name="image"
              @click.prevent="onUploadImage()"
            >
              Choisir une image
            </button>
            <input
              id="picture"
              type="file"
              class="file_input"
              name="image"
              @change="uploadImage"
            />
          </div>
          <!-- <img :src="previewImage" class="uploading-image" />
          <input type="file" accept="image/jpeg" @change="uploadImage" /> -->
        </div>
        <div class="col-sm">
          <p>
            <strong>Infos utilisateur: </strong>{{ user.firstName }}
            {{ user.lastName }}
          </p>
          <p>
            <strong> E-mail:</strong>
            {{ user.email }}
          </p>
        </div>
      </div>
    </div>

    <div class="form-row">
      <button @click="deleteUser()" class="button">Supprimer le compte</button>
    </div>
  </div>
</template>

<script>
import axios from "axios";
const instance = axios.create({
  baseURL: "http://localhost:3000/api/",
});
const userStore = localStorage.getItem("user");
const user = JSON.parse(userStore);

import { mapState } from "vuex";
export default {
  name: "Profile",
  data() {
    return {
      selectedFile: null,
      previewImage: null,
    };
  },
  mounted: function () {
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
    uploadImage(e) {
      // Récupération de l'image
      const image = e.target.files[0];
      console.log(image, "image");
      const reader = new FileReader();
      reader.readAsDataURL(image);
      reader.onload = (e) => {
        this.previewImage = e.target.result;
        // console.log(this.previewImage);
      };
      // Récupération de l'image
      let img = document.getElementById("picture").files[0];
      console.log(img, " IMAGE ");
      // Création d'un formData obligatoire pour envoi de l'image
      var formData = new FormData();
      console.log(formData, "formdata");
      formData.append("img", img.name);
      // Envoi des données sur l'url du serveur (mettez la votre) en POST en envoyant le formData contenant notre image
      instance.defaults.headers.common["Authorization"] =
        "Bearer " + user.token;
      instance
        .post("/auth/photo", formData)
        .then((resp) => {
          console.log(resp, "c'est la response");
        })
        .catch((err) => {
          console.log(err.response, "c'est l'erreur");
        });
    },
    onUploadImage() {},

    // deleteUser() {
    // const Id = this.$store.state.user.userId;
    // console.log(Id, "local store");
    // if (confirm("Voulez-vous vraiment supprimer le compte") == true) {
    //   fetch(`http://localhost:3000/api/auth/${Id}`, {
    //     method: "DELETE",
    //     headers: {
    //       Accept: "application/json",
    //       "Content-Type": "application/json",
    //     },
    //     body: JSON.stringify(this.user),
    //   })
    //     .then((response) => response.json())
    //     .then(() => {
    //       localStorage.removeItem("user")
    //       this.$router.push("/")
    //       alert("La suppression du compte est bien prise en compte");
    //     })
    //     // .then(this.$router.push("/"));
    // }
    // },
  },
};
</script>

<style scoped>
.profile {
  display: flex;
  justify-content: center;
}
img {
  margin-bottom: 10px;
}
.parent-div {
  display: inline-block;
  position: relative;
  overflow: hidden;
}

.parent-div input[type="file"] {
  left: 0;
  top: 0;
  opacity: 0;
  position: absolute;
  font-size: 90px;
}

.btn-upload {
  background-color: rgb(241, 133, 133);
  border: 3px solid #000;
  color: #000;
  border-radius: 10px;
  font-size: 15px;
  font-weight: bold;
}
</style>
