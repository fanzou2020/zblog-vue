<template>
  <div id="manage-comments">
    <div class="container" v-if="finish">
      <div class="row">
        <div class="col-4">Content</div>
        <div class="col-3">Blog Title</div>
        <div class="col-3">Created Time</div>
        <div class="col-2">Operations</div>
      </div>
      <div class="row" v-for="(item, index) in comments" :key="index">
        <div class="col-4">{{ item.content }}</div>
        <div class="col-3">
          <router-link
            tag="a"
            :to="{name: 'BlogContent', params: {username: item.username,blogId: item.blogId}}"
          >{{ item.blogTitle }}</router-link>
        </div>
        <div class="col-3">{{ (new Date(Date.parse(item.createTime))).toLocaleString() }}</div>
        <div class="col-2">
          <a @click="deleteComment(item.commentId, item.blogId)">Delete</a>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: "ManageComments",
  data() {
    return {
      comments: [],
      finish: false,
      username: ''
    };
  },
  // props: {
  //   username: {
  //     type: String,
  //     default: "zoufan"
  //   }
  // },
  methods: {
    deleteComment(commentId, blogId) {
      var r = confirm("Are you sure to delete this comment?");
      if (r == true) {
        const deleteCommentUrl =
          this.HOST + "/api/comments/" + blogId + "/" + commentId;
        this.$axios
          .delete(deleteCommentUrl)
          .then(res => {
            console.log(res);
            this.$router.go();
          })
          .catch(error => {
            console.log(error);
          });
      }
    },

    async axiosRequest() {
      const commentsUrl = this.HOST + "/api/comments/username/" + this.username;
      await this.$axios
        .get(commentsUrl)
        .then(res => {
          console.log(res.data);
          this.comments = res.data;
        })
        .catch(error => {
          console.log(error);
        });
      await this.getBlogTitle();
      console.log("finish request");
    },

    async getBlogTitle() {
      for (let i = 0; i < this.comments.length; i++) {
        const element = this.comments[i];
        const blogUrl =
          this.HOST + "/api/blogs/" + this.username + "/" + element.blogId;
        await this.$axios
          .get(blogUrl)
          .then(res => {
            console.log(res);
            this.comments[i].blogTitle = res.data.title;
            console.log(this.comments[i]);
          })
          .catch(error => {
            console.log(error);
          });
      }
    }
  },
  async created() {
    this.username = this.$store.getters.getUsername;
    await this.axiosRequest();
    console.log("finish created()");
    this.finish = true;
  }
};
</script>

<style scoped>
</style>
