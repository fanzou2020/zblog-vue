import Vue from "vue";
import Vuex from "vuex";

Vue.use(Vuex);

// 创建一个store实例
export default new Vuex.Store({
  state: {
    isLogin: false,
    username: ""
  },

  getters: {
    getLogin(state) {
      return state.isLogin;
    },
    getUsername(state) {
      return state.username;
    }
  },
  mutations: {
    updateLogin(state, boolData) {
      if (typeof boolData === "boolean") {
        state.isLogin = boolData;
      }
    },
    updateUsername(state, usernameData) {
      if (typeof usernameData === "string") {
        state.username = usernameData;
      }
    }
  },
  actions: {
    updateLogin(context, boolData) {
      context.commit("updateLogin", boolData);
    },
    updateUsername(context, usernameData) {
      context.commit("updateUsername", usernameData);
    }
  }
});
