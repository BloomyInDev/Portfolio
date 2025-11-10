import HomeView from '@views/HomeView.vue'
import NotFoundView from '@views/NotFoundView.vue'
import { createRouter, createWebHistory } from 'vue-router'

const router = createRouter({
    history: createWebHistory(import.meta.env.BASE_URL),
    routes: [
        {
            path: '/',
            component: HomeView,
        },
        {
            path: '/:pathMatch(.*)*',
            component: NotFoundView,
        },
    ],
})

export default router
