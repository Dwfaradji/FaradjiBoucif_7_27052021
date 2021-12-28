import { createStore } from "vuex";
import axios from "axios";
const instance = axios.create({
  baseURL: "http://localhost:3000/api/",
});
export default createStore({
  state: {
    status: "",
    user: {
      userId: -1,
      token: "",
    },
  },
  mutations: {
    setStatus: function (state, status) {
      state.status = status;
    },
    logUser: function (state, user) {
      state.user = user;
    },
  },
  actions: {
    createAccount: ({ commit }, userInfos) => {
      return new Promise((resolve, reject) => {
        commit;
        console.log(userInfos);
        instance
          .post("/user/signup", userInfos)
          .then(function (response) {
            commit("setStatus", "created");
            resolve(response);
            console.log(response);
          })
          .catch(function (error) {
            commit("setStatus", "error_create");
            reject(error);
            console.log(error);
          });
      });
    },
    login: ({ commit }, userInfos) => {
      return new Promise((resolve, reject) => {
        commit("setStatus", "loading");
        console.log(userInfos);
        instance
          .post("/user/login", userInfos)
          .then(function (response) {
            commit("setStatus", "");
            commit("logUser", response.data);
            resolve(response);
            console.log(response);
          })
          .catch(function (error) {
            commit("setStatus", "error_login");
            reject(error);
            console.log(error);
          });
      });
    },
  },
  modules: {},
});
