import path from "node:path"
import { PluginOption } from "vite"

// A valid minimal project: the loaders still parse every file before filtering out the
// unpublished ones, so the stub has to pass validation.
const STUB = `---
title: Unpublished
subtitle: Unpublished
published: false
type: Personal
dates:
  start: 01/1970
knowledges: []
---
`

// Replaces the content of unpublished project files with a minimal stub during
// production builds, so their real title/text/knowledges never reach the client bundle.
// Only the frontmatter is inspected, so a "published: false" in the body is ignored.
// Must be listed before the markdown plugin, which compiles the frontmatter away.
const plugin: () => PluginOption = () => ({
    name: "strip-unpublished-projects",
    apply: "build",
    enforce: "pre",

    transform(code, id) {
        const cleanId = id.split("?")[0]
        if (!/[/\\]content[/\\]projects[/\\]data[/\\][^/\\]+\.md$/.test(cleanId)) return

        const frontmatter = /^---\r?\n([\s\S]*?)\r?\n---/.exec(code)?.[1] ?? ""
        if (!/^published:\s*false\s*$/m.test(frontmatter)) return

        this.info(`✂ ${path.basename(cleanId)} stripped from build (unpublished)`)
        return { code: STUB, map: null }
    },
})

export default plugin
