<template>
  <div id="manage-categories">
    <div class="container">
      <div class="row">
        <div class="col-10">Category</div>
        <div class="col-2">Operations</div>
      </div>
      <div v-for="(item, index) in categories" :key="index" v-if="item!=='undefined'">
        <CategoryLine :category="item"/>
      </div>
    </div>
  </div>
</template>

<script>
import CategoryLine from '@/components/CategoryLine'
export default {
  name: "ManageCategories",
  data() {
    return {
      categories: []
    };
  },
  components: {
    CategoryLine
  },
  props: {
    username: {
      type: String,
      default: "zoufan"
    }
  },
  created() {
    const categoriesUrl = this.HOST + "/api/categories/" + this.username;
    this.$axios
      .get(categoriesUrl)
      .then(res => {
        // console.log(res);
        this.categories = res.data;
      })
      .catch(error => {
        console.log(error);
      });
  }
};
</script>

<style scoped>
</style>