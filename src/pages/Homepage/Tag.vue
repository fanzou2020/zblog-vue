<template>
  <div id="tag">
    <h4>Tag</h4>
    <p v-for="(item, index) in tags" :key="index">
      tag: {{ item.tag }}
    </p>
  </div>
</template>

<script>
export default {
  name: "Tag",
  data() {
    return {
      tags: []
    };
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
        // console.log(res);
        this.tags = res.data;
      })
      .catch(error => {
        console.log(error);
      });
  }
};
</script>

<style scoped></style>
