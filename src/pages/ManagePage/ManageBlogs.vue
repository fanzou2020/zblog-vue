<template>
  <div id="manage-blogs">
    <div class="container">
      <div class="row">
        <div class="col-7">Title</div>
        <div class="col-3">Created Time</div>
        <div class="col-2">Operations</div>
      </div>
      <div class="row" v-for="(item, index) in blogs" :key="index">
        <router-link
          tag="a"
          class="col-7"
          :to="{name: 'BlogContent', params: {username: item.username,blogId: item.blogId}}"
        >{{ item.title }}</router-link>
        <div class="col-3">{{ (new Date(Date.parse(item.createTime))).toLocaleString() }}</div>
        <router-link tag="a" class="col-1" :to="{name: 'EditBlogPage', params: {blogId: item.blogId}}">Edit</router-link>
        <div class="col-1">
          <a @click="deleteBlog(item.blogId)" style="cursor: pointer">Delete</a>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: "ManageBlogs",
  data() {
    return {
      blogs: []
    };
  },
  components: {},
  props: {
    username: {
      type: String,
      default: "zoufan"
    }
  },
  methods: {
    deleteBlog(blogId) {
      var r = confirm("Are you sure to delete this category?");
      if (r == true) {
        const deleteBlogUrl = this.HOST + "/api/blogs/" + this.username + "/" + blogId;
        this.$axios.delete(deleteBlogUrl)
        .then(res => {
          console.log(res);
          this.$router.go()
        })
        .catch(error => {
          console.log(error)
        })
      }    
    }
  },
  created() {
    const blogsUrl = this.HOST + "/api/blogs/" + this.username;
    this.$axios
      .get(blogsUrl)
      .then(res => {
        console.log(res.data);
        this.blogs = res.data;
      })
      .catch(error => {
        console.log(error);
      });
  }
};
</script>

<style scoped>
</style>