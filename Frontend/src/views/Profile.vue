<template>
  <div class="card">
    <h1 class="card__title">Votre profil</h1>
    <p class="card__subtitle">Voilà donc qui je suis...</p>
    <div class="row justify-content-center">
      <div class="">
        <div class="col-sm">
          <div class="">
            <!--  affiche la photo de l'utilisateur  =>  /!\ ERROR  parent-div =boutton imput-->
            <div class="media profile">
              <img
                :src="previewImage"
                style="width: 45%"
                class="rounded-circle align-self-center mr-3"
              />
            </div>
            <button
              class="button m-2"
              name="image"
              @click="$refs.fileInput.click()"
            >
              Choisir une image
            </button>
            <button
              class="button m-2"
              name="image"
              @click.prevent="onUploadImage()"
            >
              Télécharger
            </button>

            <input
              style="display: none"
              ref="fileInput"
              name="inputFile"
              id="inputFile"
              type="file"
              class="button"
              @change="onFileSelected"
            />
          </div>
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
//@_TODO erreur lang="ts"
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
      image: null,
    };
  },
  mounted: function () {
    if (this.$store.state.user.userId == -1) {
      this.$router.push("/");
      return;
    } else {
      this.$store.dispatch("getUserInfos");
    }
    console.log(this.image, "image this");
  },
  computed: {
    ...mapState({
      user: "userInfos",
    }),
  },

  methods: {
    onFileSelected(event) {
      this.selectedFile = event.target.files[0];
      const reader = new FileReader();
      reader.readAsDataURL(this.selectedFile);
      reader.onload = (e) => {
        this.previewImage = e.target.result;
      };
    },
    onUploadImage() {
      const fd = new FormData();
      fd.append("image", this.selectedFile, this.selectedFile.name);
      instance.defaults.headers.common["Authorization"] =
        "Bearer " + user.token;
      instance.post("/auth/photo", fd).then((res) => {
        console.log(res);
      });
    },

    uploadImage(e) {
      // Récupération de l'image
      const image = e.target.files[0];
      const reader = new FileReader();
      reader.readAsDataURL(image);
      reader.onload = (e) => {
        this.previewImage = e.target.result;
        console.log(this.previewImage);
      };
    },
    //   // Récupération de l'image
    //   const imageFiles = e.target.files[0];

    //   const fd = new FormData();
    //   fd.append("inputFile", imageFiles.name);
    //   console.log("test récup", fd.get("inputFile"));
    //   fd.get("inputFile");

    //   // Envoi des données sur l'url du serveur (mettez la votre) en POST en envoyant le formData contenant notre image
    //   instance.defaults.headers.common["Authorization"] =
    //     "Bearer " + user.token;
    //   instance
    //     .post("/auth/photo", fd)
    //     .then((resp) => {
    //       return console.log(resp, "c'est la response Image");
    //     })
    //     .catch((err) => {
    //       console.log(err, "c'est l'erreur");
    //     });
    // },
    deleteUser() {
      const Id = this.$store.state.user.userId;
      if (confirm("Voulez-vous vraiment supprimer cet utilisateur") == true) {
        instance.defaults.headers.common["Authorization"] =
          "Bearer " + user.token;
        instance
          .delete(`/auth/${Id}`)
          .then(() => {
            console.log("instance");
            localStorage.removeItem("user");
            window.location.reload();
            alert("La suppression de l'utilisateur a bien été pris en compte");
            this.$router.push("/");
          })
          .catch(() =>
            alert("La suppression de l'utilisateur a bien été pris en compte")
          );
      }
    },
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
