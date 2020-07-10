<template>
  <div id="comment">
    <h3>Leave a reply</h3>
    <div style="background-color: grey">
      <div>
        <mavon-editor :ishljs="true" v-model="newCommentContent" style="min-height: 300px" />
        <!-- <textarea placeholder="Add a comment"></textarea> -->
      </div>
      <router-link to="/login" tag="button" v-if="!this.$store.getters.getLogin">Login to post</router-link>
      <button v-else @click="submitComment()">Submit</button>
    </div>
    <div id="show-comments">
      <div v-for="item in comments" :key="item.commentId">
        <span>{{ item.content }}</span>
        <br />
        <span>Posted by {{ item.username }}</span>
        <span>At {{ item.createTime }}</span>
      </div>
    </div>
  </div>
</template>

<script>
import { mavonEditor } from "mavon-editor";
import "mavon-editor/dist/css/index.css";
export default {
  name: "Comment",
  components: {
    mavonEditor
  },
  data() {
    return {
      comments: [],
      newCommentContent: ""
    };
  },
  props: {
    blogId: Number
  },
  methods: {
    submitComment() {
      var newComment = {};
      newComment.blogId = this.blogId;
      newComment.username = this.$store.getters.getUsername;
      newComment.content = this.newCommentContent;
      const submitCommentUrl = this.HOST + "/api/comments/" + this.blogId;
      this.$axios.post(submitCommentUrl, newComment)
      .then(res => {
        console.log(res)
        this.$router.go()
      })
      .catch(error => {
        console.log(error)
      })
    }
  },

  created() {
    // console.log("create" + this.blogId)
    const commentsUrl = this.HOST + "/api/comments/" + this.blogId;
    this.$axios
      .get(commentsUrl)
      .then(res => {
        // console.log(res)
        this.comments = res.data;
      })
      .catch(error => {
        console.log(error);
      });
  }
  // mounted() {
  //   console.log("mount" + this.blogId)
  // },
  // beforeUpdate() {
  //   console.log("beforeUpdate" + this.blogId);

  // },
};
</script>

<style scoped></style>
