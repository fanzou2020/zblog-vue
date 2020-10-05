<template>
  <div id="recent-post">
    <h4>Recent post</h4>
    <router-link tag="li" :to="{name: 'BlogContent', params: {username: item.username, blogId: item.blogId} }" v-for="(item, index) in postsData" :key="index">
      {{ item.title }}<br>
    </router-link>
  </div>
</template>

<script>
export default {
  name: "RecentPost",
  data() {
    return {
      postsData: [],
      homepageUsername: ''
    };
  },
  created() {
    this.homepageUsername = this.$store.getters.getHomepageUsername
    const postlistUrl = this.HOST + "/api/blogs/" + this.homepageUsername;
    this.$axios
      .get(postlistUrl)
      .then(res => {
        // console.log(res);
        this.postsData = res.data;
      })
      .catch(error => {
        console.log(error);
      });
  }
};
</script>

<style scoped>
#recent-post{
  text-align: left;
}
li {
  text-decoration: none;
  color: black;
  cursor: pointer;
}
li:hover {
  color: grey;
}</style>
