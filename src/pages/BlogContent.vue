<template>
  <div id="blog-content">
    <div id="blog-header">
      <div class="container justify-content-center align-selfc-center">
        <h1>{{ blog.title }}</h1>
        <TagItem v-for="(item, index) in blog.tags" :key="index" :tagObj="item">{{ item.tag }}</TagItem>
        <div class="post-info mb-2">by {{ blog.username }} at {{ blog.createTime }}</div>
      </div>
    </div>
    <div class="container">
      <div class="row">
        <div class="col-9">
          <mavon-editor
            v-model="blog.content"
            :subfield="false"
            :defaultOpen="'preview'"
            :toolbarsFlag="false"
            :editable="false"
            :scrollStyle="true"
            :ishljs="true"
            :boxShadow="false"
            previewBackground="#fff"
          />
          <!-- <p>{{ blog.content }} id: {{ typeof (blog.blogId) }}</p> -->

          <!-- only if blog has been mounted, then begin to render comments -->
          <Comment v-if="mounted" :blogId="blog.blogId" />

          
        </div>
        <div class="col-3">
          <h2>Content</h2>
        </div>
      </div>
    </div>
    <Footer />
  </div>
</template>

<script>
import TagItem from "@/components/TagItem";
import Footer from "@/components/Footer";
import Comment from "@/components/Comment";
import { mavonEditor } from "mavon-editor";
import "mavon-editor/dist/css/index.css";

export default {
  name: "BlogContent",
  data() {
    return {
      blog: {},
      mounted: false,
      value: "# Hello"
    };
  },
  components: {
    Footer,
    Comment,
    TagItem,
    mavonEditor
  },
  created() {
    const blogUrl =
      this.HOST +
      "/api/blogs/" +
      this.$route.params.username +
      "/" +
      this.$route.params.blogId;
    this.$axios
      .get(blogUrl)
      .then(res => {
        // console.log(res);
        this.blog = res.data;
        this.mounted = true;
      })
      .catch(error => {
        console.log(error);
      });
  }
};
</script>

<style scoped>
#blog-header {
  display: flex;
  background-color: gray;
  background-image: url("../assets/img/home-bg-2lite-dark.jpeg");
  background-repeat: no-repeat;
  background-position: center center;
  background-attachment: scroll;
  background-size: cover;
  padding-top: 250px;
  padding-bottom: 250px;
  margin-bottom: 45px;
  color: white;
}
</style>
