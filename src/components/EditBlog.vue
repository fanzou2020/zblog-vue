<template>
  <div id="edit-blog">
    <div class="container mt-5">
      <input type="text" v-model="title" class="form-control" placeholder="Blog Title" />

      <div class="row align-items-center pl-3 mt-3">
        <div v-for="(item, index) in tags" :key="index" class="form-check d-inline mr-3">
          <input
            class="form-check-input"
            type="checkbox"
            :value="item.tag"
            :id="item.tag"
            v-model="chosenTags"
          />
          <label class="form-check-label" :for="item.tag">{{ item.tag }}</label>
        </div>
        <div class="d-inline mr-3">
          <span class="mr-3" @click="changeTagFlag">New Tag</span>
          <div class="d-inline" v-if="newTagFlag">
            <input class="d-inline" v-model="newTagValue" type="text" />
            <!-- {{ newTagValue }} -->
            <button class="btn btn-secondary" @click="addNewTag">submit</button>
            <button class="btn btn-secondary" @click="closeTagFlag">close</button>
            <!-- {{ newTagFlag }} -->
          </div>
        </div>
      </div>

      <div class="row mt-3 pl-3">
        <div v-for="(item, index) in categories" :key="index" class="form-check form-check-inline">
          <input
            class="form-check-input"
            type="radio"
            :value="item"
            :id="item"
            v-model="chosenCategory"
          />
          <label class="form-check-label" :for="item">{{ item }}</label>
        </div>
        <div class="d-inline mr-3">
          <span class="mr-3" @click="changeCategoryFlag">New Category</span>
          <div class="d-inline" v-if="newCategoryFlag">
            <input class="d-inline" v-model="newCategoryValue" type="text" />
            <button class="btn btn-secondary" @click="addNewCategory">submit</button>
            <button class="btn btn-secondary" @click="closeCategoryFlag">close</button>
          </div>
        </div>
      </div>

      <div class="row mt-4">
        <div class="form-group col-12">
          <label for="blogSummary">Blog Summary</label>
          <textarea class="form-control" v-model="summary" id="blogSummary" rows="3"></textarea>
        </div>
      </div>

      <div class="row mt-4">
        <div class="form-group col-12">
          <label for="blogContent">Blog Content</label>
          <button class="btn btn-secondary float-right" @click="submitBlog">submit</button>
          <!-- <mavon-editor class="form-control" v-model="content" id="blogContent" rows="40"></mavon-editor> -->
          <mavon-editor
            class="form-control"
            :ishljs="true"
            v-model="content"
            style="min-height: 800px"
          />
          <button class="btn btn-secondary float-right" @click="submitBlog">submit</button>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { mavonEditor } from "mavon-editor";
import "mavon-editor/dist/css/index.css";
export default {
  name: "EditBlog",
  components: {
    mavonEditor
  },
  data() {
    return {
      title: "",
      summary: "",
      content: "",
      tags: [],
      categories: [],
      chosenTags: [],
      chosenCategory: "",
      newTagFlag: false,
      newTagValue: "",
      newCategoryFlag: false,
      newCategoryValue: "",
      blog: {},
      blogId: -1,
      username: ""
    };
  },
  methods: {
    changeTagFlag(event) {
      this.newTagFlag = true;
    },
    closeTagFlag(event) {
      this.newTagFlag = false;
    },
    addNewTag(event) {
      console.log(this.newTagValue);
      const postTagUrl = this.HOST + "api/tags/" + this.username;
      this.$axios
        .post(postTagUrl, {
          tag: this.newTagValue,
          username: this.username
        })
        .then(res => {
          console.log(res);
          if (res.status === 200) {
            this.tags.push({
              tag: this.newTagValue,
              username: this.username
            });
          }
        })
        .catch(error => {
          console.log(error);
        });
    },

    changeCategoryFlag(event) {
      this.newCategoryFlag = true;
    },
    closeCategoryFlag(event) {
      this.newCategoryFlag = false;
    },
    addNewCategory(event) {
      console.log(this.newCategoryValue);
      this.categories.push(this.newCategoryValue);
    },

    submitBlog(event) {
      console.log("submit");
      this.blog.title = this.title;
      this.blog.username = this.username;
      this.blog.content = this.content;
      if (this.chosenCategory !== "") {
        this.blog.category = this.chosenCategory;
      }
      if (this.summary !== "") {
        this.blog.summary = this.summary;
      }
      // submit blog, use post method, if edit is false
      if (this.edit === false) {
        const postBlogUrl = this.HOST + "/api/blogs/" + this.username;
        this.$axios
          .post(postBlogUrl, this.blog)
          .then(res => {
            console.log(res);
            if (res.status === 201) {
              this.blogId = res.data;
              if (this.chosenTags.length !== 0) {
                for (let index = 0; index < this.chosenTags.length; index++) {
                  const element = this.chosenTags[index];
                  this.submitBlogTag(element, this.blogId);
                }
              }
            }
            alert("Insert blog successfully");
            this.$router.go();
            // this.clearContent()
          })
          .catch(error => {
            console.log(error);
          });
      } else {
        // if edit an existing blog, use put method
        const putBlogUrl =
          this.HOST + "/api/blogs/" + this.username + "/" + this.blogId;
        this.blog.blogId = this.blogId;
        this.blog.createTime = new Date();
        this.$axios
          .put(putBlogUrl, this.blog)
          .then(async res => {
            if (res.status === 200) {
              // first delete all the blog_tag relations
              const deleteTagByBlogIdUrl =
                this.HOST + "/api/blogtag/" + this.username + "/" + this.blogId;

              await this.$axios.delete(deleteTagByBlogIdUrl).catch(error => {
                console.error(error);
              });

              // then insert the new ones.
              for (let index = 0; index < this.chosenTags.length; index++) {
                const element = this.chosenTags[index];
                this.submitBlogTag(element, this.blogId);
              }
            }
            this.$router.go();
          })
          .catch(error => {
            console.log(error);
          });
      }
    },

    // submit Blog_Tag relationship
    submitBlogTag(item, blogId) {
      console.log(item);
      console.log(this.blog);

      const postBlogTagUrl =
        this.HOST + "/api/blogtag/" + this.username + "/" + item + "/" + blogId;
      this.$axios
        .post(postBlogTagUrl)
        .then(res => {
          console.log(res);
        })
        .catch(error => {
          console.log(error);
        });
    },

    // clear content in input
    clearContent() {
      (this.title = ""),
        (this.title = ""),
        (this.summary = ""),
        (this.content = ""),
        (this.tags = []),
        (this.categories = []),
        (this.chosenTags = []),
        (this.chosenCategory = ""),
        (this.newTagFlag = false),
        (this.newTagValue = ""),
        (this.newCategoryFlag = false),
        (this.newCategoryValue = ""),
        (this.blog = {}),
        (this.blogId = -1);
    },
  },
  props: {
    edit: {
      type: Boolean,
      default: false
    },
    editBlog: {
      type: Object,
      default: function() {
        return {};
      }
    }
  },

  created() {
    this.username = this.$store.getters.getUsername;
    // get the tags
    const tagsUrl = this.HOST + "/api/tags/" + this.username;
    this.$axios
      .get(tagsUrl)
      .then(res => {
        console.log(res.data);
        this.tags = res.data;
      })
      .catch(error => {
        console.log(error);
      });

    // get the categories
    const categoriesUrl = this.HOST + "/api/categories/" + this.username;
    this.$axios
      .get(categoriesUrl)
      .then(res => {
        console.log(res);
        this.categories = res.data;
      })
      .catch(error => {
        console.log(error);
      });

    // if this is edit page, load blog content
    if (this.edit === true) {
      this.blogId = this.editBlog.blogId;
      this.title = this.editBlog.title;
      this.summary = this.editBlog.summary;
      this.content = this.editBlog.content;
      this.chosenCategory = this.editBlog.category;
      for (let i = 0; i < this.editBlog.tags.length; i++) {
        const element = this.editBlog.tags[i];
        this.chosenTags.push(element.tag);
      }
    }
  }
};
</script>

<style scoped></style>
