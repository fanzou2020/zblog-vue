<template>
  <div id="category-page">
    <Header title="Categories"></Header>
    <div class="container">
      <!-- Category Page  -->
      <PostPreview v-for="(item, index) in postsData" :key="index" :blog="item"/>
    </div>
  </div>
</template>

<script>
import PostPreview from "@/components/PostPreview";
import Header from "@/components/Header";

export default {
  name: "CategoryPage",
  data() {
    return {
      postsData: [],
      homepageUsername: ''
    };
  },
  components: {
    PostPreview,
    Header
  },

  created() {
    this.homepageUsername = this.$store.getters.getHomepageUsername;
    console.log(this.$router.params)
    const categoryUrl = this.HOST + '/api/blogs/' + this.homepageUsername + '/category/' + this.$route.params.name
    this.$axios.get(categoryUrl)
    .then(res => {
      // console.log(res);
      this.postsData = res.data 
    })
    .catch(error => {
      console.log(error);
    })
  }
};
</script>

<style scoped></style>
