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
      tags: []
    };
  },
  props: {
    username: {
      type: String,
      default: "zoufan"
    }
  },
  components: {
    TagItem
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
