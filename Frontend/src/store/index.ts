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
      email: "",
      firstName: "",
      lastName: "",
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
      state.userInfos = userInfos;
    },
    logout: function (state) {
      state.user = authUser;
      localStorage.removeItem("user");
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
        .post("/auth/infos")
        .then(function (response) {
          commit("userInfos", response.data.userInfos);
        })
        .catch((error) => {
          console.log(error); //affiche pas le message 'normalement' envoyé par le back
        });
    },
  },
  modules: {},
});
