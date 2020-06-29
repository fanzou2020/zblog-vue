<template>
  <div id="blog-content">
    <Header :title="blog.title"/>
    <div class="container">
      <div class="row">
        <div class="col-9">
          <p>{{ blog.content }}</p>
          <div v-for="(item, index) in blog.tags" :key="index">tag: {{ item.tag }}</div>

          <Comment />
        </div>
        <div class="col-3">
          <h2>Content</h2>
        </div>
      </div>
    </div>
    <Footer/>
  </div>
</template>

<script>
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import Comment from "@/components/Comment"

export default {
  name: "BlogContent",
  data() {
    return {
      blog: {}
    };
  },
  components: {
    Header,
    Footer,
    Comment
  },
  created() {
    const blogUrl = this.HOST + '/api/blogs/' + this.$route.params.username + '/' + this.$route.params.blogId
    this.$axios.get(blogUrl)
    .then(res => {
      // console.log(res);
      this.blog = res.data;
    })
    .catch(error => {
      cosole.log(error);
    })
  },
};
</script>

<style scoped></style>
