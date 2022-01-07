import { createRouter, createWebHistory } from 'vue-router'
import TopPlayers from '../views/TopPlayers.vue'

const routes = [
  {
    path: '/',
    name: 'TopPlayers',
    component: TopPlayers
  },
  {
    path: '/teams',
    name: 'TopTeams',
    // route level code-splitting
    // this generates a separate chunk (about.[hash].js) for this route
    // which is lazy-loaded when the route is visited.
    component: () => import(/* webpackChunkName: "about" */ '../views/TopTeams.vue')
  },
  {
    path: '/addplayer',
    name: 'AddPlayer',
    // route level code-splitting
    // this generates a separate chunk (about.[hash].js) for this route
    // which is lazy-loaded when the route is visited.
    component: () => import(/* webpackChunkName: "about" */ '../views/AddPlayer')
  }
]

const router = createRouter({
  history: createWebHistory(process.env.BASE_URL),
  routes
})

export default router
