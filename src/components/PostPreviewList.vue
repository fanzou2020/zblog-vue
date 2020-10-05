<template>
  <div id="postlist">
    <PostPreview v-for="(item, index) in postsData" :blog="item" :key="index"/>
  </div>
</template>

<script>

import PostPreview from "./PostPreview"

export default {
  name: "PostPreviewList",
  data() {
    return {
      postsData: [],
      homepageUsername: "zoufan"
    }
  },
  components: {
    PostPreview
  },
  created() {
    this.homepageUsername = this.$store.getters.getHomepageUsername
    const postlistUrl = this.HOST + '/api/blogs/' + this.homepageUsername
    this.$axios.get(postlistUrl)
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
