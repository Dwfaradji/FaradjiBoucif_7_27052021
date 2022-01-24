//Import
import { createStore } from "vuex";
import axios from "axios";

// Export axios
export const instance = axios.create({
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
//Export
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
        instance
          .post("/auth/signup", userInfos)
          .then(function (response) {
            instance.defaults.headers.common["Authorization"] =
              "Bearer " + user.token;
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
          console.log(error);
        });
    },

    createComment: ({ commit }, createComment) => {
      return new Promise((resolve, reject) => {
        instance
          .post("/comments/", createComment)
          .then(function (response) {
            commit("setStatus", response.data);
            resolve(response);
          })
          .catch(function (error) {
            console.log(error);
            reject(error);
          });
      });
    },
  },
});
