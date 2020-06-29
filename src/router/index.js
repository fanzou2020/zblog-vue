import Vue from 'vue'
import Router from 'vue-router'
import Index from '@/pages/Index'
import Homepage from '@/pages/Homepage'
import BlogContent from '@/pages/BlogContent'

Vue.use(Router)

export default new Router({
  mode: 'history',
  routes: [
    {
      path: '/',
      name: 'Index',
      component: Index,
      redirect: '/home',
      children: [
        {
          path: '/home',
          name: 'Homepage',
          component: Homepage
        },
        {
          path: '/blog/:username/:blogId',
          name: 'BlogContent',
          component: BlogContent
        }
      ]
    }
  ]
})
