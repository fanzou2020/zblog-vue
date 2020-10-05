import Vue from "vue";
import Router from "vue-router";
import Index from "@/pages/Index";
import MainPage from "@/pages/MainPage"
import Homepage from "@/pages/Homepage";
import BlogContent from "@/pages/BlogContent";
import Login from "@/pages/Login";
import TagsPage from "@/pages/TagsPage";
import CategoryPage from "@/pages/CategoryPage";
import CreateBlog from "@/pages/CreateBlog";
import EditBlogPage from "@/pages/EditBlogPage";
import ManagePage from "@/pages/ManagePage";
import ManageBlogs from "@/pages/ManagePage/ManageBlogs";
import ManageCategories from "@/pages/ManagePage/ManageCategories";
import ManageTags from "@/pages/ManagePage/ManageTags";
import ManageComments from "@/pages/ManagePage/ManageComments";

Vue.use(Router);

export default new Router({
  mode: "history",

  routes: [
    {
      path: "/",
      name: "Index",
      component: Index,
      redirect: "/main",
      children: [
        {
          path: "/main",
          name: "MainPage",
          component: MainPage
        },
        {
          path: "/home",
          name: "Homepage",
          component: Homepage
        },
        {
          path: "/blog/:username/:blogId",
          name: "BlogContent",
          component: BlogContent
        },
        {
          path: "/tags",
          name: "TagsPage",
          component: TagsPage
        },
        {
          path: "/category/:name",
          name: "CategoryPage",
          component: CategoryPage
        },
        {
          path: "/create",
          name: "CreateBlog",
          component: CreateBlog
        },
        {
          path: "/edit/:blogId",
          name: "EditBlogPage",
          component: EditBlogPage
        },
        {
          path: "/manage",
          name: "ManagePage",
          redirect: "/manage/blogs",
          component: ManagePage,
          children: [
            {
              path: "/manage/blogs",
              name: "ManageBlogs",
              component: ManageBlogs
            },
            {
              path: "/manage/categories",
              name: "ManageCategories",
              component: ManageCategories
            },
            {
              path: "/manage/tags",
              name: "ManageTags",
              component: ManageTags
            },
            {
              path: "/manage/comments",
              name: "ManageComments",
              component: ManageComments
            }
          ]
        }
      ]
    },
    {
      path: "/login",
      name: "Login",
      component: Login
    }
  ],
  scrollBehavior: function(to, from, savedPosition) {
    if (to.hash) {
      return { selector: to.hash };
    } else {
      return { x: 0, y: 200 };
    }
  }
});
