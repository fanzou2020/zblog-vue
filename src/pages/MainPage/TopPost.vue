<template>
  <div id="top-posts">
    <h1>Top Posts</h1>
    <!-- {{ topPosts }} -->
    <div v-for="(item, index) in topPosts" :key="index">
      <PostPreview :blog="item"/>
    </div>
  </div>
</template>

<script>
// set topPostId in array topPostsId, in data() section.

import PostPreview from "@/components/PostPreview"

export default {
  name: "TopPost",
  data() {
    return {
      topPostsId: [30, 31],
      topPosts: []
    };
  },
  components: {
    PostPreview
  },
  created() {
    for (let i = 0; i < this.topPostsId.length; i++) {
      const element = this.topPostsId[i];
      const blogUrl = this.HOST + "/api/blogs" + "?blogId=" + element;
      this.$axios.get(blogUrl)
      .then(res=> {
        this.topPosts.push(res.data[0])
      })
      .catch(err => {
        console.log(err);
      })
    }
  }
};
</script>

<style scoped>
</style>