<template>
  <nav class="navbar navbar-expand-sm navbar-dark navbar-custom">
    <router-link tag="a" to="/" class="navbar-brand">ZBLOG</router-link>
    <!-- for small screen, collapse toggle -->
    <button
      class="navbar-toggler d-lg-none"
      type="button"
      data-toggle="collapse"
      data-target="#collapsibleNavId"
    >
      <span class="navbar-toggler-icon"></span>
    </button>
    <!--  -->
    <div class="collapse navbar-collapse " id="collapsibleNavId">
      <ul class="navbar-nav mr-auto">
        <li class="nav-item active">
          <router-link tag="a" to="/" class="nav-link">Home</router-link>
        </li>
      </ul>
      <ul class="navbar-nav" v-if="!this.$store.getters.getLogin">
        <li class="nav-item">
          <a class="nav-link" href="#">Sign Up</a>
        </li>
        <li>
          <router-link tag="a" to="/login" class="nav-link">Login</router-link>
        </li>
      </ul>
      <ul class="navbar-nav" v-if="this.$store.getters.getLogin">
        <li class="nav-item">
          <router-link tag="button" class="nav-link btn btn-secondary mr-3" to="/create">+ New Blog</router-link>
        </li>
        <li class="nav-item">
          <router-link tag="a" class="nav-link" to="/manage">Manage</router-link>
        </li>
        <li class="nav-item">
          <router-link tag="a" class="nav-link" to="/home">{{ this.$store.getters.getUsername }}</router-link>
        </li>
        <li class="nav-item">
          <a @click="logout" class="nav-link">Logout</a>
        </li>
      </ul>
    </div>
  </nav>
</template>

<script>
export default {
  name: "Navbar",
  data() {
    return {};
  },
  methods: {
    goToHomepage() {
      // if already login, go to login user's homepage
      if (this.$store.getters.getLogin) {
        this.$store.commit("updateHomepageUsername", this.$store.getters.getUsername)
      }
      this.$router.push("/").catch(err => err)
    },

    async logout(event) {
      const logoutUrl = this.HOST + "/logout";
      await this.$axios
        .get(logoutUrl)
        .then(res => {
          console.log(res);
          this.$store.commit("updateLogin", false);
          this.$store.commit("updateUsername", "zoufan");
        })
        .catch(error => {
          console.log(error);
        });
      this.$router.push("/").catch(err => err)
    }
  }
};
</script>

<style scoped>
.navbar-custom {
  background: rgb(56, 58, 56);
  border: none;
  /* position: absolute; */
  top: 0;
  left: 0;
  width: 100%;
}
.nav-link,
.navbar-brand {
  color: white;
  font-size: 1.5rem;
}

@media (max-width: 575px) {
  /* .navbar-collapse {
    background-color:grey;
    display: block;
    width: 40px;
  } */
}
</style>
