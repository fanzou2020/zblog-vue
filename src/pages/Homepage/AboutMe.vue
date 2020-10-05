<template>
  <div id="about-me" class="mt-5">
    <h4>About me</h4>
    <div>{{ homepageUsername }}</div>
  </div>
</template>

<script>
  export default {
    data() {
      return {
        homepageUsername: ''
      }
    },
    created() {
      this.homepageUsername = this.$store.getters.getHomepageUsername
    }
  }
</script>

<style scoped>

</style>