<template>
  <div>
    <div class="row">
      <router-link tag="a" :to="{name: 'CategoryPage', params: {name: oldCategory}}" class="col-5">{{ oldCategory }}</router-link>
      <div class="col-5">
        <div v-if="edit">
          <input v-model="newCategory" type="text" placeholder="new category name" />
          <a @click="save">Save</a>
          <a @click="newCategory = ''">Cancel</a>
          <a @click="edit = false">Close</a>
        </div>
      </div>
      <div class="col-1" style="cursor: pointer">
        <a @click="edit = true">Edit</a>
      </div>
      <div class="col-1" style="cursor: pointer">
        <a @click="deleteCategory">Delete</a>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: "CategoryLine",
  data() {
    return {
      edit: false,
      oldCategory: this.category,
      newCategory: ""
    };
  },
  props: {
    category: "",
    username: {
      type: String,
      default: "zoufan"
    }
  },
  methods: {
    // save new Category name in database, update old category name
    save(event) {
      console.log("save");
      const updateCategoryUrl =
        this.HOST +
        "/api/categories/" +
        this.username +
        "/" +
        this.oldCategory +
        "/" +
        this.newCategory;
      this.$axios
        .put(updateCategoryUrl)
        .then(res => {
          console.log(res);
          this.oldCategory = this.newCategory;
        })
        .catch(error => {
          console.log(error);
        });
    },

    // delete the category, that is change it to default value
    deleteCategory(event) {
      var r = confirm("Are you sure to delete this category?");
      if (r == true) {
        console.log("delete");
        const deleteCategoryUrl =
          this.HOST +
          "/api/categories/" +
          this.username +
          "/" +
          this.oldCategory;
        this.$axios
          .delete(deleteCategoryUrl)
          .then(res => {
            console.log(res);
            this.$router.go();
          })
          .catch(error => {
            console.log(error);
          });
      }
    }
  }
};
</script>

<style scoped>
</style>