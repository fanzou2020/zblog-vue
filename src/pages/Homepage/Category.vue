<template>
  <div id="category">
    <h4>Categories</h4>
    <router-link tag="li" v-for="(item, index) in categories" :key="index" :to="{name: 'CategoryPage', params: {name: item}}">{{ item }}</router-link>
  </div>
</template>

<script>
export default {
  name: "Category",
  data() {
    return {
      categories: [],
      homepageUsername: ''
    };
  },
  created() {
    this.homepageUsername = this.$store.getters.getHomepageUsername;
    const categoriesUrl = this.HOST + "/api/categories/" + this.homepageUsername;
    this.$axios
      .get(categoriesUrl)
      .then(res => {
        // console.log(res);
        this.categories= res.data;
      })
      .catch(error => {
        console.log(error);
      });
  }
};
</script>

<style scoped>
li {
  text-decoration: none;
  color: black;
  cursor: pointer;
}
li:hover {
  color: grey;
}
</style>
