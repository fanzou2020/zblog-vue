<template>
  <div id="main-page">
    <Feature />
    <div class="container">
      <TopPost />
      <Users />
      <Recent />
      <Footer />
    </div>
  </div>
</template>

<script>

import Feature from "@/pages/MainPage/Feature"
import Recent from "@/pages/MainPage/Recent"
import Users from "@/pages/MainPage/Users"
import TopPost from "@/pages/MainPage/TopPost"
import Footer from "@/components/Footer"

export default {
  name: "MainPage",
  data() {
    return {

    };
  },
  components: {
    Feature,
    Recent,
    Users,
    TopPost,
    Footer
  }
};
</script>

<style scoped>
</style>