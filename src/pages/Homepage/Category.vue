<template>
  <div id="category">
    <h4>Categories</h4>
    <p v-for="(item, index) in categories" :key="index">{{ item }}</p>
  </div>
</template>

<script>
export default {
  name: "Category",
  data() {
    return {
      categories: []
    };
  },
  props: {
    username: {
      type: String,
      default: "zoufan"
    }
  },
  created() {
    const categoriesUrl = this.HOST + "/api/categories/" + this.username;
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

<style scoped></style>
