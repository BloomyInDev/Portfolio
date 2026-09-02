// Base imports
import { ViteSSG } from "vite-ssg"
import App from "./App.vue"
import AboutView from "@views/AboutView.vue"
import HomeView from "@views/HomeView.vue"
import NotFoundView from "@views/NotFoundView.vue"
import ProjectsView from "@views/ProjectsView.vue"
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
                component: HomeView,
                meta: {
                    title: { default: true },
                    description: { default: true },
                    dontPregenerate: false,
                } satisfies CustomRouteMetadata,
            },
            {
                path: "/about",
                component: AboutView,
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
                component: ProjectsView,
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
                // Seule vue encore chargée à la demande : elle embarque le rendu
                // markdown (~46 Ko gzip), inutile pour qui ne consulte aucun projet.
                // Les autres vues sont dans le bundle principal pour que leurs liens
                // ne dépendent d'aucune requête réseau (voir lib/staleChunkReload).
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
                component: NotFoundView,
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
