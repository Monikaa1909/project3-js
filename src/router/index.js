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
    path: '/clubs',
    name: 'ClubList',
    component: () => import('../views/ClubsList.vue')
  },
  {
    path: '/clubstoedit',
    name: 'clubsToEdit',
    component: () => import('../views/ClubsListToEdit.vue')
  },
  {
    path: '/clubstoremove',
    name: 'clubsToRemove',
    component: () => import('../views/ClubsListToRemove.vue')
  },
  {
    path: '/addplayer',
    name: 'AddPlayer',
    component: () => import('../views/AddPlayer')
  },
  {
    path: '/addclub',
    name: 'AddClub',
    component: () => import('../views/AddClub')
  },
  {
    path: '/addcontract/:id',
    name: 'AddContract',
    component: () => import('../views/AddContract')
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
  },
  {
    path: '/editclub/:id',
    name: 'EditClub',
    component: () => import('../views/EditClub')
  },
  {
    path: '/removeclub/:id',
    name: 'RemoveClub',
    component: () => import('../views/RemoveClub')
  },
  {
    path: '/playerdetail/:id',
    name: 'PlayerDetail',
    component: () => import('../views/PlayerDetail')
  },
  {
    path: '/playerdetailtoedit/:id',
    name: 'PlayerDetailToEdit',
    component: () => import('../views/PlayerDetailToEdit')
  },
  {
    path: '/playerdetailtoremove/:id',
    name: 'PlayerDetailToRemove',
    component: () => import('../views/PlayerDetailToRemove')
  },
  {
    path: '/editcontract/:id',
    name: 'EditContract',
    component: () => import('../views/EditContract')
  },
  {
    path: '/removecontract/:id',
    name: 'RemoveContract',
    component: () => import('../views/RemoveContract')
  }
]

const router = createRouter({
  history: createWebHistory(process.env.BASE_URL),
  routes
})

export default router
