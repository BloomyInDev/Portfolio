import { fileURLToPath, URL } from "node:url"

import { UserConfig } from "vite"
import { ViteSSGOptions } from "vite-ssg"
import generateSitemap from "vite-ssg-sitemap"
import vue from "@vitejs/plugin-vue"
import markdown from "unplugin-vue-markdown/vite"
import vueDevTools from "vite-plugin-vue-devtools"
import { ViteImageOptimizer as viteImageOptimizer } from "vite-plugin-image-optimizer"
import convertToWebp from "./plugins/convertToWebp.ts"
import projectSchema from "./plugins/projectSchema.ts"
import stripUnpublishedProjects from "./plugins/stripUnpublishedProjects.ts"
import technologyIcons from "./plugins/technologyIcons.ts"
import webfontDownload from "vite-plugin-webfont-dl"
import { compression, defineAlgorithm } from "vite-plugin-compression2"
import zlib from "zlib"

import { projects } from "./src/content/projects/node.ts"
import type { CustomRouteMetadata } from "./src/types.ts"
import type { RouteRecordRaw } from "vue-router"

import * as child from "child_process"

type ViteImageOptimizerOptions = Required<NonNullable<Parameters<typeof viteImageOptimizer>[0]>>

const imageOptimizerOptions: Pick<
    ViteImageOptimizerOptions,
    "jpg" | "jpeg" | "png" | "webp" | "avif"
> = {
    jpg: { quality: 75 },
    png: { quality: 75 },
    webp: { quality: 75 },
    jpeg: { quality: 75 },
    avif: { quality: 75 },
}

process.env.VITE_GIT_COMMIT_HASH = child.execSync("git rev-parse --short HEAD").toString()

// https://vite.dev/config/
export default {
    build: {
        minify: "oxc",
        // safari15/ios15 force lightningcss to keep the -webkit-backdrop-filter
        // fallback instead of dropping it; chrome/firefox/edge just set a recent
        // modern baseline for everything else
        cssTarget: ["safari15", "ios15", "chrome120", "firefox120", "edge120"],
    },
    plugins: [
        // Before the markdown plugin: it needs the raw frontmatter
        stripUnpublishedProjects(),
        // Compiles `src/content/projects/data/*.md` to components; must run before the vue plugin
        markdown({ markdownOptions: { breaks: true, typographer: false, linkify: false } }),
        vue({ include: [/\.vue$/, /\.md$/] }),
        vueDevTools(),
        technologyIcons(),
        // Dev only: keeps schemas/project.json (editor feedback on the frontmatter) up to date
        projectSchema(),
        convertToWebp(imageOptimizerOptions.webp),
        viteImageOptimizer(imageOptimizerOptions),
        webfontDownload(["https://fonts.googleapis.com/css2?family=Fira+Sans&display=swap"]),
        compression({
            algorithms: [
                "gzip",
                defineAlgorithm("br", { params: { [zlib.constants.BROTLI_PARAM_QUALITY]: 11 } }),
            ],
        }),
    ],
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
        onFinished: () => {
            generateSitemap({
                hostname: "https://bastienluben.dev",
                exclude: ["/404"],
                priority: {
                    "/": 0.8,
                    "/projects": 0.8,
                    ...projects
                        .map((p) => `/project/${p.id}`)
                        .reduce((acc, path) => ({ ...acc, [path]: 1 }), {}),
                },
                readable: true,
                generateRobotsTxt: true,
                robots: [{ userAgent: "*", allow: "/" }],
            })
        },
    },
} satisfies UserConfig & { ssgOptions: ViteSSGOptions }
