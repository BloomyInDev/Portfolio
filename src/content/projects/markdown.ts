import type { Component } from "vue"
import { parseProjectMeta } from "./meta"

// unplugin-vue-markdown compiles each `data/*.md` into a component and also exports every
// top-level frontmatter key by name (`exportFrontmatter`), so the metadata is readable
// here without rendering anything. A file with bad metadata fails the build.
const modules = import.meta.glob<Record<string, unknown> & { default: Component }>("./data/*.md", {
    eager: true,
})

export const markdownProjects = Object.entries(modules).map(([file, module]) => ({
    ...parseProjectMeta(file, module),
    body: module.default,
}))
