<template>
  <div id="zblog-header">
    <div class="container justify-content-center align-self-center">
      <!-- <div class="row"> -->
      <!-- <div class="col"> -->
      <h1>
        {{ title }}<br />
        <small>{{ subtitle }}</small>
      </h1>
      <!-- </div> -->
      <!-- </div> -->
    </div>
  </div>
</template>

<script>
export default {
  name: "Header",
  data() {
    return {
      title: '',
      subtitle: ''
    };
  },
  created() {
    this.title = "Welcome to " + this.$store.getters.getHomepageUsername + "'s Homepage!"
  }
};
</script>

<style scoped>
#zblog-header {
  display: flex;
  background-color: gray;
  background-image: url("../assets/img/home-bg-2lite-dark.jpeg");
  background-repeat: no-repeat;
  background-position: center center;
  background-attachment: scroll;
  background-size: cover;
  padding-top: 250px;
  padding-bottom: 250px;
  margin-bottom: 45px;
  text-align: center;
}
h1 {
  font: Arial, sans-serif;
  color: white;
}
</style>
