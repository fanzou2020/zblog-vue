<template>
  <div id="manage-page">
    <Header title="Manage Page" />
    <div class="container">
      <ul class="nav">
        <li class="nav-item">
          <router-link tag="a" to="/manage/blogs" class="nav-link">Blogs</router-link>
        </li>
        <li class="nav-item">
          <router-link tag="a" to="/manage/categories" class="nav-link">Categories</router-link>
        </li>
        <li class="nav-item">
          <router-link tag="a" to="/manage/tags" class="nav-link">Tags</router-link>
        </li>
        <li class="nav-item">
          <router-link tag="a" to="/manage/comments" class="nav-link">Comments</router-link>
        </li>
      </ul>
      <router-view></router-view>
    </div>
  </div>
</template>

<script>
import Header from "@/components/Header";
export default {
  name: "ManagePage",
  data() {
    return {};
  },
  components: {
    Header
  }
};
</script>

<style scoped>
</style>