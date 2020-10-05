<template>
  <div id="feature">
    <div class="container justify-content-center align-self-center">
      <h1>Featured Article</h1>
      <router-link
        tag="a"
        :to="{ name: 'BlogContent', params: {username: username,blogId: blogId} }"
      >
        <h2 class="post-title">{{ blog.title }}</h2>
        <div class="post-summary mt-3 mb-2">{{ blog.summary }}</div>
      </router-link>
    </div>
  </div>
</template>

<script>
export default {
  name: "Feature",
  data() {
    return {
      blog: {},
      username: "zoufan",
      blogId: 9
    };
  },
  created() {
    const blogUrl =
      this.HOST + "/api/blogs/" + this.username + "/" + this.blogId;
    this.$axios
      .get(blogUrl)
      .then(res => {
        // console.log(res);
        this.blog = res.data;
      })
      .catch(err => {
        console.log(err);
      });
  }
};
</script>

<style scoped>
#feature {
  display: flex;
  background-color: gray;
  background-image: url("../../assets/img/home-bg-2lite-dark.jpeg");
  background-repeat: no-repeat;
  background-position: center center;
  background-attachment: scroll;
  background-size: cover;
  padding-top: 250px;
  padding-bottom: 250px;
  margin-bottom: 45px;
  text-align: center;
}
</style>