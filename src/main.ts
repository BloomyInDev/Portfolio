// Base imports
import { ViteSSG } from 'vite-ssg'
import App from './App.vue'
import './styles/main.css'

export const createApp = ViteSSG(
    App,
    {
        routes: [
            {
                path: '/',
                component: () => import('@views/HomeView.vue'),
            },
            {
                path: '/:pathMatch(.*)*',
                component: () => import('@views/NotFoundView.vue'),
            },
        ],
    },
    (_modules) => {},
)
