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
    instance.defaults.headers.common["Authorization"] = user.token;
  } catch (ex) {
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
    },

    commentPost: {
      content: "",
      date: "",
      user_id: "",
      post_id: "",
    },
  },
  mutations: {
    setStatus: function (state, status) {
      state.status = status;
    },

    logUser: function (state, user) {
      instance.defaults.headers.common["Authorization"] = user.token;
      localStorage.setItem("user", JSON.stringify(user));
      state.user = user;
    },

    userInfos: function (state, userInfos) {
      localStorage.setItem("userInfos", JSON.stringify(userInfos));
      state.userInfos = userInfos;
    },

    logout: function (state) {
      state.user = authUser;
      localStorage.removeItem("user");
    },

    commentPost: function (state, commentPost) {
      state.commentPost = commentPost;
    },
  },
  actions: {
    login: ({ commit }, userInfos) => {
      commit("setStatus", "loading");
      return new Promise((resolve, reject) => {
        instance
          .post("auth/login", userInfos)
          .then(function (response) {
            console.log("response API", response);
            commit("setStatus", "");
            commit("logUser", response.data);
            resolve(response);
          })
          .catch(function (error) {
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
            commit("setStatus", "error_create");
            reject(error);
          });
      });
    },

    getUserInfos: ({ commit }) => {
      instance
        .get("/auth/profile")
        .then(function (response) {
          console.log("response API", response.data.userId);
          commit("userInfos", response.data.id);
        })
        .catch((error) => {
          console.log(error); //affiche pas le message 'normalement' envoyé par le back
        });
    },

    commentPost: ({ commit }, commentPost) => {
      return new Promise((resolve, reject) => {
        instance
          .post("/posts/create", commentPost)
          .then(function (response) {
            commit("commentPost");
            resolve(response);
          })
          .catch(function (error) {
            commit("commentPost");
            reject(error);
          });
      });
    },
  },
  modules: {},
});
