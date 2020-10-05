<template>
  <div id="users">
    <h1>Users</h1>
    <div v-for="(item, index) in users" :key="index">
      <User :username="item"/>
    </div>
  </div>
</template>

<script>

import User from "@/components/User"

export default {
  name: "Users",
  data() {
    return {
      users: []
    };
  },
  components: {
    User
  },
  created() {
    const usernamesUrl = this.HOST + "/api/users/all/usernames";
    this.$axios.get(usernamesUrl)
    .then(res => {
      // console.log(res);
      this.users = res.data;
    })
    .catch(err => {
      console.log(err);
    })
  },
};
</script>

<style scoped>
</style>