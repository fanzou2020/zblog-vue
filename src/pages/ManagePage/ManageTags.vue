<template>
  <div id="manage-tags">
    <div class="container">
      <div class="row">
        <div class="col-10">Tags</div>
        <div class="col-2">Operations</div>
      </div>
      <div v-for="(item, index) in tags" :key="index">
        <TagLine :tag="item"/>
      </div>
    </div>
  </div>
</template>

<script>

import TagLine from "@/components/TagLine"

export default {
  name: "ManageTags",
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
    TagLine
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

<style scoped>
</style>