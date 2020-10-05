<template>
  <div id="recent">
    <h1>Recent</h1>
    <div v-for="(item, index) in recentBlogs" :key="index">
      <PostPreview :blog="item" v-if="index < 5"/>
    </div>
  </div>
</template>

<script>

import PostPreview from "@/components/PostPreview"

export default {
  name: "Recent",
  data() {
    return {
      recentBlogs: []
    };
  },
  components: {
    PostPreview
  },
  created() {
    const recentBlogs = this.HOST + "/api/blogs";
    this.$axios.get(recentBlogs)
    .then(res => {
      // console.log(res);
      this.recentBlogs = res.data;
    })
    .catch(err => {
      console.log(err);
    })
  },

};
</script>

<style scoped>
</style>