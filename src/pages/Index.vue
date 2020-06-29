<template>
  <div>
    <Navbar/>
    <router-view/>
  </div>
</template>

<script>

import Navbar from '@/components/Navbar'

export default {
  name: "Index",
  data() {
    return {
      
    }
  },
  components: {
    Navbar
  }
};
</script>

<style scoped></style>
