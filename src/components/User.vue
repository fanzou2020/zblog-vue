<template>
  <div id="user">
    <a @click="goToUserHomepage(username)">{{ username }}</a>
  </div>
</template>

<script>
export default {
  name: "User",
  data() {
    return {};
  },
  methods: {
    goToUserHomepage(username) {
      this.$store.commit("updateHomepageUsername", username);
      this.$router.push("/home");
    }
  },
  props: {
    username: {
      type: String,
      required: true
    }
  }
};
</script>

<style scoped>
</style>