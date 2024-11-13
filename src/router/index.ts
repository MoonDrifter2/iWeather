import { createRouter, createWebHistory } from 'vue-router'

import HomeView from '@/views/HomeView.vue'
import CityView from '@/views/CityView.vue'

const router = createRouter({
    history: createWebHistory(),
    routes: [{
        name: 'home',
        path: '/',
        component: HomeView
    }, {
        name: 'city',
        path: '/weather/:city/:id',
        component: CityView,
        props: true
    }]
})

export default router