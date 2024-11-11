import { createRouter, createWebHistory } from 'vue-router'

import HomeView from '@/views/HomeView.vue'

export const router = createRouter({
    history: createWebHistory(),
    routes: [{
        name: 'home',
        path: '/',
        component: HomeView
    }]
})
