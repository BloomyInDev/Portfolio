import { fileURLToPath, URL } from "node:url"

import { UserConfig } from "vite"
import { ViteSSGOptions } from "vite-ssg"
import vue from "@vitejs/plugin-vue"
import vueDevTools from "vite-plugin-vue-devtools"

import { projects } from "./src/script/projects"
import type { CustomRouteMetadata } from "./src/types"
import type { RouteRecordRaw } from "vue-router"

import * as child from "child_process"

process.env.VITE_GIT_COMMIT_HASH = child.execSync("git rev-parse --short HEAD").toString()

// https://vite.dev/config/
export default {
    plugins: [vue(), vueDevTools()],
    resolve: {
        alias: {
            "@assets": fileURLToPath(new URL("./src/assets", import.meta.url)),
            "@components": fileURLToPath(new URL("./src/components", import.meta.url)),
            "@views": fileURLToPath(new URL("./src/views", import.meta.url)),
            "@": fileURLToPath(new URL("./src", import.meta.url)),
        },
    },
    ssgOptions: {
        includedRoutes: (_paths, routes: Readonly<RouteRecordRaw[]>) => {
            return routes.flatMap((route: RouteRecordRaw) => {
                return (route.meta as CustomRouteMetadata).dontPregenerate
                    ? []
                    : route.name == "project-detail"
                      ? projects.map((p) => `/project/${p.id}`)
                      : route.path
            })
        },
    },
} satisfies UserConfig & { ssgOptions: ViteSSGOptions }
