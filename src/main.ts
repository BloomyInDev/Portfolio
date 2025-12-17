// Base imports
import { ViteSSG } from "vite-ssg"
import App from "./App.vue"
import "./styles/main.css"

export const createApp = ViteSSG(
    App,
    {
        routes: [
            {
                path: "/",
                component: () => import("@views/HomeView.vue"),
            },
            {
                path: "/about",
                component: () => import("@views/AboutView.vue"),
            },
            {
                path: "/projects",
                component: () => import("@views/ProjectsView.vue"),
            },
            {
                path: "/project/:projectName",
                component: () => import("@views/ProjectDetailView.vue"),
            },
            {
                path: "/:pathMatch(.*)*",
                component: () => import("@views/NotFoundView.vue"),
            },
        ],
    },
    (_modules) => {},
)
