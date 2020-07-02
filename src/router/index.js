import Vue from "vue";
import Router from "vue-router";
import Index from "@/pages/Index";
import Homepage from "@/pages/Homepage";
import BlogContent from "@/pages/BlogContent";
import Login from "@/pages/Login";
import TagsPage from "@/pages/TagsPage";
import CategoryPage from "@/pages/CategoryPage";
import CreateBlog from "@/pages/CreateBlog"

Vue.use(Router);

export default new Router({
  mode: "history",

  routes: [
    {
      path: "/",
      name: "Index",
      component: Index,
      redirect: "/home",
      children: [
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
