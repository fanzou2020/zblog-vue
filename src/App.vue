<template>
  <div id="app" v-if="finish">
    <router-view />
  </div>
</template>

<script>
export default {
  name: "App",
  data() {
    return {
      finish: false
    };
  },
  methods: {
    // check whether user has login to page
    async checkLogin() {
      console.log("Check login status");
      const checkLoginUrl = this.HOST + "/api/checkLoginUser";
      await this.$axios
        .get(checkLoginUrl)
        .then(res => {
          // if user has already login.
          this.$store.commit("updateLogin", true);
          this.$store.commit("updateUsername", res.data);
          this.$store.commit("updateHomepageUsername", res.data);
        })
        .catch(error => {
          // console.log(error);
          this.$store.commit("updateLogin", false);
          this.$store.commit("updateUsername", "");
        });
    }
  },
  async created() {
    await this.checkLogin();
    this.finish = true;
  }
};
</script>

<style>
html,
body {
  height: 100%;
}
#app {
  font-family: "Avenir", Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  color: #2c3e50;
  height: 100%;
}
a {
  cursor: pointer;
}
</style>
