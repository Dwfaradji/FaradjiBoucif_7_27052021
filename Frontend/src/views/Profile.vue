<template>
  <div class="card">
    <h1 class="card__title">Votre profil</h1>
    <p class="card__subtitle">Voilà donc qui je suis...</p>
    <div class="row justify-content-center">
      <div class="">
        <div class="col-sm ">
          <div class="parent-div">
            <div class="media profile">
              <img
                :src="uploadedImage"
                style="width: 45%"
                class="rounded-circle align-self-center mr-3"
              />
            </div>

            <button class="button" @click="onUploadImage">
              Choisir une image
            </button>
            <input
              type="file"
              class="file_input"
              name="photo"
              @change="onFileChange"
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
import { mapState } from "vuex";
export default {
  name: "Profile",

  data() {
    return {
      uploadedImage: "",
    };
  },
  mounted: function () {
    if (this.$store.state.user.userId == -1) {
      this.$router.push("/");
      return;
    } else {
      this.$store.dispatch("getUserInfos");
      //  console.log("test api user Info",this.$store.state.userInfos);
    }
  },
  computed: {
    ...mapState({
      user: "userInfos",
    }),
  },

  methods: {
    onFileChange(e) {
      let files = e.target.files || e.dataTransfer.files;
      console.log(files);
      this.createImage(files[0]);
    },
    createImage(file) {
      let reader = new FileReader();
      reader.onload = (e) => {
        this.uploadedImage = e.target.result;
      };
      reader.readAsDataURL(file);
    },
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
.profile{
  display: flex;
  justify-content: center;
}
img {
  /* margin-left: 25px; */
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
  /* padding: 10px 25px; */
  border-radius: 10px;
  font-size: 15px;
  font-weight: bold;
}
</style>
