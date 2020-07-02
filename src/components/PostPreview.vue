<template>
  <div id="postpreview" class="mt-3">
    <!-- router link to the BlogContent page, pass blogId as parameter -->
    <router-link tag='a' :to="{ name: 'BlogContent', params: {username: username,blogId: blogId} }">
      <h2 class="post-title">{{ title }}</h2>
      <div class="post-summary mt-3 mb-2">{{ summary }}</div>
    </router-link>
    <!--  -->
    <div class="post-info mb-2">by {{ username }} at {{ createTime }}</div>
    <span class="post-tag" v-for="(item, index) in tags" :key="index">
      <TagItem :tagObj="item"></TagItem>&nbsp;
    </span>
    <hr/> 
  </div>
</template>

<script>

import TagItem from '@/components/TagItem'

export default {
  name: "PostPreview",
  data() {
    return {
      blogId: this.blog.blogId,
      title: this.blog.title,
      summary: this.blog.summary,
      tags: this.blog.tags,
      username: this.blog.username,
      createTime: this.blog.createTime
    };
  },
  props: {
    blog: {
      type: Object,
      required: true
    }
  },
  components: {
    TagItem
  }
};
</script>

<style scoped>
a {
  text-decoration: none;
  color: black;
}
a:hover {
  color: grey;
}
.post-title, .post-summary, .post-info, .post-tag {
  text-align: left;
}
.post-title {
  font-size: 2rem;
  line-height: 1.3;
}

</style>
