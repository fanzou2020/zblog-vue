<template>
  <div id="edit-blog">
    <EditBlog :editBlog="blog" :edit="true" v-if="finish"/>
  </div>
</template>

<script>
import EditBlog from "@/components/EditBlog";
export default {
  name: "EditBlogPage",
  components: {
    EditBlog
  },
  data() {
    return {
      blog: {},
      finish: false,
      username: ''
    }
  },
  // props: {
  //   username: {
  //     type: String,
  //     default: "zoufan"
  //   }
  // },
  async created() {
    this.username = this.$store.getters.getUsername;
    const blogUrl = this.HOST + "/api/blogs/" + this.username + "/" + this.$route.params.blogId
    await this.$axios.get(blogUrl)
    .then(res => {
      console.log(res)
      this.blog = res.data
    })
    .catch(error => {
      console.log(error)
    })
    this.finish = true
  }
};
</script>

<style scoped>
</style>