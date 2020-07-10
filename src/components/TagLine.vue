<template>
  <div class="row">
    <router-link tag="a" to="/tags" class="col-5">{{ oldTag }}</router-link>
    <div class="col-5">
      <div v-if="edit">
        <input v-model="newTag" type="text" placeholder="input new tag name" />
        <a @click="save">Save</a>
        <a @click="newTag = ''">Cancel</a>
        <a @click="edit = false">Close</a>
      </div>
    </div>
    <div class="col-1" style="cursor: pointer">
      <a @click="edit = true">Edit</a>
      <!-- <button type="button" class="btn btn-primary" data-toggle="modal" data-target="#edit-tag">Edit</button> -->
    </div>
    <div class="col-1" style="cursor: pointer">
      <a @click="deleteTag">Delete</a>
    </div>
    <!-- <div class="modal fade" id="edit-tag" tabindex="-1" role="dialog">
      <div class="modal-dialog">
        <div class="modal-content">
          <input v-model="newTag" type="text" />
          <button type="button" class="btn btn-secondary" data-dismiss="modal">Cancel</button>
          <button type="button" @click="save" data-dismiss="modal" class="btn btn-primary">Save</button>
        </div>
      </div>
    </div>-->
    <!-- </div> -->
  </div>
</template>

<script>
export default {
  name: "TagLine",
  data() {
    return {
      oldTag: this.tag.tag,
      newTag: "",
      edit: false
    };
  },
  props: {
    tag: {}
  },
  methods: {
    // save new Tag, update tag name in database
    // update oldTag
    save(event) {
      console.log(this.oldTag);
      const updateTagUrl =
        this.HOST + "/api/tags/" + this.tag.username + "/" + this.oldTag;
      this.$axios
        .put(updateTagUrl, { tag: this.newTag, username: this.tag.username })
        .then(res => {
          console.log(res);
          this.oldTag = this.newTag;
        })
        .catch(error => {
          console.log(error);
          alert("error");
        });
    },

    // delete the tag
    deleteTag(event) {
      var r = confirm("Are you sure to delete this tag?");
      if (r == true) {
        const deleteTagUrl =
          this.HOST + "/api/tags/" + this.tag.username + "/" + this.oldTag;
        this.$axios
          .delete(deleteTagUrl)
          .then(res => {
            console.log(res);
            this.$router.go()
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