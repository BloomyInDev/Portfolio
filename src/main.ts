// Base imports
import { ViteSSG } from "vite-ssg"
import App from "./App.vue"
import "./styles/main.css"
import type { CustomRouteMetadata } from "./types"
import { setupStaleChunkReload } from "./lib/staleChunkReload"
import { setupViewTransitions } from "./lib/viewTransitions"

export const createApp = ViteSSG(
    App,
    {
        routes: [
            {
                path: "/",
                component: () => import("@views/HomeView.vue"),
                meta: {
                    title: { default: true },
                    description: { default: true },
                    dontPregenerate: false,
                } satisfies CustomRouteMetadata,
            },
            {
                path: "/about",
                component: () => import("@views/AboutView.vue"),
                meta: {
                    title: {
                        default: false,
                        composed: false,
                        content: "À propos",
                        withSuffix: false,
                    },
                    description: { default: true },
                    dontPregenerate: false,
                } satisfies CustomRouteMetadata,
            },
            {
                path: "/projects",
                component: () => import("@views/ProjectsView.vue"),
                meta: {
                    title: {
                        default: false,
                        composed: false,
                        content: "Projets",
                        withSuffix: false,
                    },
                    description: {
                        default: false,
                        composed: false,
                        content: "Découvrez les projets de Bastien Luben, développeur passionné.",
                    },
                    dontPregenerate: false,
                } satisfies CustomRouteMetadata,
            },
            {
                name: "project-detail",
                path: "/project/:projectName",
                component: () => import("@views/ProjectDetailView.vue"),
                meta: {
                    title: {
                        default: false,
                        composed: true,
                        content: (args: unknown = {}) => {
                            const params = args as { projectName: string }
                            return `Projet "${params.projectName}"`
                        },
                        withSuffix: false,
                    },
                    description: {
                        default: false,
                        composed: true,
                        content: (args: unknown = {}) => {
                            const params = args as { projectDetails: string }
                            return params.projectDetails
                        },
                    },
                    dontPregenerate: false,
                } satisfies CustomRouteMetadata,
            },
            {
                path: "/404",
                component: () => import("@views/NotFoundView.vue"),
                meta: {
                    title: {
                        default: false,
                        composed: false,
                        content: "Page non trouvée",
                        withSuffix: false,
                    },
                    description: { default: true },
                    dontPregenerate: false,
                } satisfies CustomRouteMetadata,
            },
            {
                path: "/:pathMatch(.*)*",
                redirect: "/404",
                meta: {
                    dontPregenerate: true,
                } satisfies Pick<CustomRouteMetadata, "dontPregenerate">,
            },
        ],
    },
    (ctx) => {
        if (!import.meta.env.SSR) {
            setupStaleChunkReload(ctx.router)
            setupViewTransitions(ctx.router)
        }
    },
    {},
)
