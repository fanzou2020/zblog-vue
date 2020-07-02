<template>
  <router-link tag="a" :to="toObj" id="tag-item" class="badge badge-pill badge-secondary">
    {{ tagObj.tag }}
  </router-link>
</template>

<script>
export default {
  name: "TagItem",
  data() {
    return {
      toObj: {
        name: 'TagsPage',
        hash: '#' + this.tagObj.tag
        // hash: '#testHash'
      }
      // tagUrl : "/tags#" + this.tagObj.tag
    };
  },
  props: {
    tagObj: {
      type: Object,
      required: true
    }
  },
};
</script>

<style scoped>
#tag-item {
  font-size: 1rem;
  cursor: pointer;
  color: white;
}
</style>
