import { assembleProjects } from "./assemble"
import { readMarkdownProjects } from "./markdown.node"

/** The same list as `./build`, for vite.config.ts (SSG routes and sitemap), which runs in Node. */
export const projects = assembleProjects(readMarkdownProjects())
