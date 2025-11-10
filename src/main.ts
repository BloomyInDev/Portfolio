// Base imports
import { ViteSSG } from 'vite-ssg'
import App from './App.vue'
import './styles/main.css'

// Views
import HomeView from '@views/HomeView.vue'
import NotFoundView from '@views/NotFoundView.vue'

export const createApp = ViteSSG(
    App,
    {
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
    },
    (_modules) => {},
)
