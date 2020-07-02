<template>
  <div id="tags-page">
    <!-- <Navbar/> -->
    <Header title="Tags"></Header>
    <div class="container">
      <div v-for="(item, index) in tags" :key="index">
        <div :id="item.tag" class="tagDiv">
          <TagItem :tagObj="item" />
          <PostPreview
            v-for="(blog, index) in item.blogs"
            :key="index"
            :blog="blog"
          >
          </PostPreview>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import Navbar from "@/components/Navbar";
import Header from "@/components/Header";
import TagItem from "@/components/TagItem";
import PostPreview from "@/components/PostPreview";

export default {
  name: "TagsPage",
  data() {
    return {
      tags: []
    };
  },
  components: {
    Header,
    TagItem,
    Navbar,
    PostPreview
  },
  props: {
    username: {
      type: String,
      default: "zoufan"
    }
  },
  created() {
    const tagsUrl = this.HOST + "/api/tags/" + this.username;
    this.$axios
      .get(tagsUrl)
      .then(res => {
        // console.log(res.data);
        this.tags = res.data;
      })
      .catch(error => {
        console.log(error);
      });
  }
};
</script>

<style scoped>
.tagDiv {
  /* height: 1000px; */
  margin-bottom: 100px;
}
</style>
