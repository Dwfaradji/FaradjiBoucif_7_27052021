<!-- <div class="container m-3">
    <div class="row">
      <div class="col-lg-6 offset-lg-3 mr-4">
        <div class="cardbox shadow-lg bg-white">
          <div class="cardbox-heading"> -->
<!-- START dropdown-->
<!-- <div class="dropdown float-right">
              <button
                class="btn btn-flat btn-flat-icon"
                type="button"
                data-toggle="dropdown"
                aria-expanded="false"
              >
                <em class="fa fa-ellipsis-h"></em>
              </button>
              <div
                class="dropdown-menu dropdown-scale dropdown-menu-right"
                role="menu"
                style="
                  position: absolute;
                  transform: translate3d(-136px, 28px, 0px);
                  top: 0px;
                  left: 0px;
                  will-change: transform;
                "
              >
                <a class="dropdown-item" href="#">Modifier le post</a>
                <a class="dropdown-item" href="#">Supprimer le post</a>
              </div> -->
<!-- </div> -->
<!--/ dropdown -->
<!-- <div class="media m-0">
              <div class="d-flex mr-3"> -->
<!-- <img
                  class="img-fluid rounded-circle"
                  src="https://cdn.pixabay.com/photo/2016/04/15/18/05/computer-1331579_960_720.png"
                  alt="User"
                /> -->
<!-- </div>
              <div class="media-body">
                <p class="m-0">Posté par {{ user.firstName }}</p>
                <small
                  ><span
                    ><i class="icon ion-md-time"></i> Heure du post
                  </span></small
                >
              </div>
            </div>
          </div> -->
<!-- <div class="cardbox-item">
            <img
              class="img-fluid"
              src=""
              alt="Image"
            />
          </div> -->
<!-- <div class="cardbox-base">
            <ul class="float-right">
              <li>
                <a><i class="fa fa-comments"></i></a>
              </li>
              <li>
                <a href=""><em class="mr-5">Commentaire</em></a>
              </li>
            </ul> -->
<!-- <ul>
              <li>
                <a href=""><i class="fa fa-thumbs-up"> 0</i></a>
              </li>
              <li>
                <a href=""><i class="fa fa-thumbs-down"> 0</i></a>
              </li>
            </ul> -->
<!-- </div>
          <div class="container row align-items-center">
            <div class="col-10">
              <input
                class="col-sm-10 m-2"
                placeholder="Ecrivez un commentaire"
                type="text"
              />
            
              <button
                class="btn btn-primary ml-2"
                type="submit"
                @click.prevent="createPost"
              >
                <i class="fas fa-paper-plane"></i>
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div> -->

<template>
  <div>
    <div class="container mb-3">
      <form class="cardbox shadow-lg bg-white" method="post">
      
        <div class="d-flex justify-content-between align-items-center">
          <img
            src="https://www.icone-png.com/png/54/53787.png"
            alt="..."
            class="rounded-circle m-2"
          />

          <input
            type="text"
            v-model="content"
            class="form-control"
            aria-label="Default"
            aria-describedby="inputGroup-sizing-default"
            id="input_text"
            placeholder="Quoi de neuf ?"
          />
          <div class="d-flex align-items-center mr-2">
            <button type="submit" class="btn btn-primary ml-5">image</button>
            <button
              type="submit"
              class="btn btn-primary ml-5"
              @click.prevent="createPost"
            >
              Publier
            </button>
          </div>
        </div>
      </form>
    </div>
  </div>
</template>
<script>
let userStore = localStorage.getItem("user");
const user = JSON.parse(userStore);
// console.log(user);

import { mapState } from "vuex";
export default {
  name: "Post",
  mounted: function () {
    this.$store.dispatch("getUserInfos");
  },
  computed: {
    ...mapState({
      user: "userInfos",
      post: "createPost",
    }),
  },
  props: {
    msg: String,
  },
  data() {
    return {
      title: "",
      content: "",
      date: "",
      attachment: "",
      idUser: "",
      likes: "",
    };
  },
  methods: {
    createPost: function () {
      this.$store.dispatch("createPost", {
        title: this.title,
        content: this.content,
        date: this.date,
        attachment: this.attachment,
        idUser: user.userId,
        likes: this.likes,
      });
      this.$router.push("/wall");
    },
  },
};
</script>

<style scoped>
img {
  margin-top: 20px;
  width: 10%;
}
.input-text {
  width: 60%;
  margin-left: auto;
  margin-right: auto;
  border-radius: 15px 15px 15px 15px;
  padding: 0px;
}

.boutton {
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  margin-left: 10em;
}
</style>
