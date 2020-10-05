<template>
  <div id="tag">
    <h4>Tags</h4>
    <span v-for="(item, index) in tags" :key="index">
      <TagItem :tagObj="item"></TagItem>&nbsp;
    </span>
  </div>
</template>

<script>
import TagItem from '@/components/TagItem'

export default {
  name: "Tag",
  data() {
    return {
      tags: [],
      homepageUsername: ''
    };
  },
  components: {
    TagItem
  },
  created() {
    this.homepageUsername = this.$store.getters.getHomepageUsername;
    const tagsUrl = this.HOST + "/api/tags/" + this.homepageUsername;
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
