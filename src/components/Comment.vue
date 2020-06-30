<template>
  <div id="comment">
    <h3>Leave a reply</h3>
    <div style="background-color: grey">
      <div>
        <textarea placeholder="Add a comment"> </textarea>
      </div>
      <button>Login to post</button>
    </div>
    <div id="show-comments">
      <div v-for="item in comments" :key="item.commentId">
        <span>{{ item.content }}</span><br>
        <span>Posted by {{ item.username }}</span>
        <span>At {{ item.createTime }}</span>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: "Comment",
  data() {
    return {
      comments: []
    };
  },
  props: {
    blogId: Number
  },
  created() {
    // console.log("create" + this.blogId)
    const commentsUrl = this.HOST + '/api/comments/' + this.blogId
    this.$axios.get(commentsUrl)
    .then(res => {
      // console.log(res)
      this.comments = res.data 
    })
    .catch(error => {
      console.log(error);
    })
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
