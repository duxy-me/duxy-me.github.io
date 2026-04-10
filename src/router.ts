import { createRouter, createWebHistory } from 'vue-router'

import HomeView from './views/HomeView.vue'
import PaperDetailView from './views/PaperDetailView.vue'

export const router = createRouter({
  history: createWebHistory(),
  routes: [
    {
      path: '/',
      name: 'home',
      component: HomeView,
    },
    {
      path: '/papers/:slug',
      name: 'paper-detail',
      component: PaperDetailView,
    },
  ],
})
