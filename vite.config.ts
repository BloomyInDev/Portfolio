import { fileURLToPath, URL } from "node:url"
import fs from "fs/promises"

import { PluginOption, UserConfig } from "vite"
import { ViteSSGOptions } from "vite-ssg"
import generateSitemap from "vite-ssg-sitemap"
import vue from "@vitejs/plugin-vue"
import vueDevTools from "vite-plugin-vue-devtools"
import { ViteImageOptimizer as viteImageOptimizer } from "vite-plugin-image-optimizer"

import { projects } from "./src/script/projects"
import type { CustomRouteMetadata } from "./src/types"
import type { RouteRecordRaw } from "vue-router"

import * as child from "child_process"
import { globSync } from "node:fs"
import path from "node:path"
import sharp from "sharp"

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

const convertToWebp: (webpOptions: sharp.WebpOptions) => PluginOption = (webpOptions) => {
    const generated: string[] = []

    return {
        name: "convert-to-webp",
        apply: "build",
        enforce: "pre",

        buildStart: async () => {
            const files = globSync("src/**/*.{jpg,jpeg,png}")
            for (const file of files) {
                const out = file.replace(/\.(jpg|jpeg|png)$/, ".webp")

                try {
                    await fs.access(out)
                    // File exists, do nothing
                } catch {
                    // File doesn't exist, generate it
                    await sharp(file).webp(webpOptions).toFile(out)
                    generated.push(out)
                    console.log(`✓ ${path.basename(file)} → webp`)
                }
            }
        },

        resolveId: async (source, importer) => {
            if (/\.(jpg|jpeg|png)$/.test(source) && importer) {
                const dir = path.dirname(importer)
                const resolved = path.resolve(dir, source)
                const webp = resolved.replace(/\.(jpg|jpeg|png)$/, ".webp")

                try {
                    await fs.access(webp)
                    // File exists, redirect to webp version
                    return webp
                } catch {
                    // File doesn't exist, do nothing
                }
            }
        },

        closeBundle: async () => {
            await Promise.all(
                generated.map((file) =>
                    fs.rm(file).then(() => console.log(`🗑 ${path.basename(file)} deleted`)),
                ),
            )
        },
    }
}

const badUA = await fs.readFile("src/knownBadUA.txt", "utf-8")

process.env.VITE_GIT_COMMIT_HASH = child.execSync("git rev-parse --short HEAD").toString()

// https://vite.dev/config/
export default {
    build: {
        minify: "oxc",
    },
    plugins: [
        vue(),
        vueDevTools(),
        convertToWebp(imageOptimizerOptions.webp),
        viteImageOptimizer(imageOptimizerOptions),
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
                dynamicRoutes: projects.map((p) => `/project/${p.id}`),
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
                robots: [
                    ...badUA.split("\n").map((ua) => ({ userAgent: ua, disallow: "/" })),
                    { userAgent: "Googlebot", allow: "/" },
                    { userAgent: "*", allow: "/" },
                ],
            })
        },
    },
} satisfies UserConfig & { ssgOptions: ViteSSGOptions }
