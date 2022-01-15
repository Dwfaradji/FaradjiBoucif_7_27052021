import { createStore } from "vuex";
import axios from "axios";
const instance = axios.create({
  baseURL: "http://localhost:3000/api/",
});

let userStore = localStorage.getItem("user");
const authUser = { userId: -1, token: "" };

if (!userStore) {
  var user = authUser;
} else {
  try {
    user = JSON.parse(userStore);
    instance.defaults.headers.common["Authorization"] = "Bearer " + user.token;
  } catch (ex) {
    console.log(ex);
    user = authUser;
  }
}

export default createStore({
  state: {
    status: "",
    user: user,

    userInfos: {
      id: "",
      email: "",
      firstName: "",
      lastName: "",
      image: "",
    },
    createComment: {
      id: "",
      content: "",
      date: "",
      user_id: "",
      post_id: "",
      firstName: "",
    },
    createPost: {
      id: "",
      title: "",
      content: "",
      date: "",
      attachment: "",
    },
  },
  mutations: {
    setStatus: function (state, status) {
      state.status = status;
    },

    logUser: function (state, user) {
      instance.defaults.headers.common["Authorization"] =
        "Bearer " + user.token;
      localStorage.setItem("user", JSON.stringify(user));
      state.user = user;
    },

    userInfos: function (state, userInfos) {
      state.userInfos = userInfos;
    },

    logout: function (state) {
      state.user = authUser;
      localStorage.removeItem("user");
    },

    createComment: function (state, createComment) {
      instance.defaults.headers.common["Authorization"] =
        "Bearer " + user.token;
      state.createComment = createComment;
      console.log(createComment);
    },

    createPost: function (state, createPost) {
      state.user = user;
      state.createPost = createPost;
    },
  },
  actions: {
    login: ({ commit }, userInfos) => {
      commit("setStatus", "loading");
      return new Promise((resolve, reject) => {
        instance
          .post("auth/login", userInfos)
          .then(function (response) {
            commit("setStatus", "");
            commit("logUser", response.data);
            resolve(response);
          })
          .catch(function (error) {
            console.log(error);
            commit("setStatus", "error_login");
            reject(error);
          });
      });
    },

    createAccount: ({ commit }, userInfos) => {
      commit("setStatus", "loading");
      return new Promise((resolve, reject) => {
        commit;
        instance
          .post("/auth/signup", userInfos)
          .then(function (response) {
            commit("setStatus", "created");
            resolve(response);
          })
          .catch(function (error) {
            console.log(error);
            commit("setStatus", "error_create");
            reject(error);
          });
      });
    },

    getUserInfos: ({ commit }) => {
      instance
        .get("/auth/profile")
        .then(function (response) {
          commit("userInfos", response.data);
        })
        .catch((error) => {
          console.log(error); //affiche pas le message 'normalement' envoyé par le back
        });
    },

    createComment: ({ commit }, createComment) => {
      return new Promise((resolve, reject) => {
        instance
          .post("/comments/", createComment)
          .then(function (response) {
            commit("createComment", response.data);
            resolve(response);
          })
          .catch(function (error) {
            console.log(error);
            commit("createComment");
            reject(error);
          });
      });
    },

    createPost: ({ commit }, createPost) => {
      return new Promise((resolve, reject) => {
        instance
          .post("/posts/post", createPost)
          .then(function (response) {
            commit("createPost");
            resolve(response);
          })
          .catch(function (error) {
            console.log(error);
            commit("createPost");
            reject(error);
          });
      });
    },
  },
});
