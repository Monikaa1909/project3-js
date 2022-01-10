import { createRouter, createWebHistory } from 'vue-router'
// import TopPlayers from '../views/TopPlayers.vue'

const routes = [
  {
    path: '/',
    name: 'PlayersList',
    component: () => import('../views/PlayersList.vue')
  },
  {
    path: '/playerstoedit',
    name: 'PlayersToEdit',
    component: () => import('../views/PlayersListToEdit.vue')
  },
  {
    path: '/playerstoremove',
    name: 'PlayersToRemove',
    component: () => import('../views/PlayersListToRemove.vue')
  },
  {
    path: '/teams',
    name: 'TopTeams',
    component: () => import('../views/TopTeams.vue')
  },
  {
    path: '/addplayer',
    name: 'AddPlayer',
    component: () => import('../views/AddPlayer')
  },
  {
    path: '/editplayer/:id',
    name: 'EditPlayer',
    component: () => import('../views/EditPlayer')
  },
  {
    path: '/removeplayer/:id',
    name: 'RemovePlayer',
    component: () => import('../views/RemovePlayer')
  }
]

const router = createRouter({
  history: createWebHistory(process.env.BASE_URL),
  routes
})

export default router
