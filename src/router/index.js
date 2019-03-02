import Vue from 'vue'
import Router from 'vue-router'
import login from '../components/login'
import userPage from '@/mainUP/userPage'
import allFile from '@/mainUP/allFile'
import picture from '@/mainUP/picture'
import video from '@/mainUP/video'
import document from '@/mainUP/document'
import music from '@/mainUP/music'
import signUp from '@/signUp/signUpPage'
import sharePage from '@/sharePage/sharePage'

Vue.use(Router)

export default new Router({
  routes: [
    {
      path: '/',
      name: 'login',
      component: login
    },
    {
      path: '/userPage',
      name: 'userPage',
      component: userPage,
      children: [
        {
          path: 'allFile',
          component: allFile
        },
        {
          path: 'picture',
          component: picture
        },
        {
          path: 'video',
          component: video
        },
        {
          path: 'document',
          component: document
        },
        {
          path: 'music',
          component: music
        }
      ]
    },
    {
      path: '/signUp',
      name: 'signUp',
      component: signUp
    },
    {
      name: 'sharePage',
      path: '/sharePage',
      component: sharePage
    }
  ]
})
