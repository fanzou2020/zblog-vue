<template>
  <div id="Homepage">
    <Header />
    <div id="homepage-content" class="container">
      <div class="row">
        <div class="col-9">
          <PostPreviewList />
        </div>
        <div class="col-3 text-left">
          <AboutMe />
          <br />
          <RecentPost />
          <br />
          <Category />
          <br />
          <Tag />
        </div>
      </div>
    </div>
    <Footer />
  </div>
</template>

<script>
import Header from "@/components/Header";
import PostPreviewList from "@/components/PostPreviewList";
import AboutMe from "@/pages/Homepage/AboutMe";
import RecentPost from "@/pages/Homepage/RecentPost";
import Footer from "@/components/Footer";
import Category from "@/pages/Homepage/Category";
import Tag from "@/pages/Homepage/Tag";

export default {
  name: "Homepage",
  data() {
    return {
      finish: false
    };
  },
  components: {
    Header,
    PostPreviewList,
    AboutMe,
    RecentPost,
    Footer,
    Category,
    Tag
  }
};
</script>

<style scoped></style>
