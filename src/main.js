// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from "vue";
import App from "./App";
import router from "./router";
import Axios from "axios";
import store from "./store";

import "bootstrap";
import "bootstrap/dist/css/bootstrap.css";

Vue.prototype.$axios = Axios;
Vue.prototype.HOST = "/zblog_api";

// Vue.config.productionTip = false

// 添加请求拦截器
// Axios.interceptors.request.use(
//   function(config) {
//     if (config.method === "post") {
//       config.data = qs.stringify(config.data);
//     }
//     return config;
//   },
//   function(error) {
//     // 对请求错误做些什么
//     return Promise.reject(error);
//   }
// );

/* eslint-disable no-new */
var vm = new Vue({
  el: "#app",
  components: { App },
  template: "<App/>",
  router,
  store,
  methods: {
    // check whether user has login to page
    checkLogin() {
      console.log("Check login status");
      const checkLoginUrl = this.HOST + "/api/checkLoginUser";
      this.$axios
        .get(checkLoginUrl)
        .then(res => {
          // if user has already login.
          // console.log(res);
          this.$store.commit("updateLogin", true);
          this.$store.commit("updateUsername", res.data);
        })
        .catch(error => {
          // console.log(error);
          this.$store.commit("updateLogin", false);
          this.$store.commit("updateUsername", "");
        });
    }
  },
});

// before each router change, check whether the session in server has expired.
router.beforeEach((to, from, next) => {
  // to and from are both route objects. must call `next`.
  // if (to.name != "Login" && vm.$store.getters.getLogin === true) {
  if (to.name !== "Login") {
    // console.log()
    vm.checkLogin();
  }
  next();
});
