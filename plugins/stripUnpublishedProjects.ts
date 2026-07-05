import path from "node:path"
import { PluginOption } from "vite"

// Replaces the content of unpublished project data files with a minimal stub during
// production builds, so their real title/description/knowledges never reach the
// client bundle. Detection is a simple text match on `published: false` since these
// files are plain object literals authored by hand.
const plugin: () => PluginOption = () => ({
    name: "strip-unpublished-projects",
    apply: "build",
    enforce: "pre",

    transform(code, id) {
        const cleanId = id.split("?")[0]
        if (!/[/\\]content[/\\]projects[/\\]data[/\\]/.test(cleanId)) return
        if (path.basename(cleanId) === "index.ts") return
        if (!/published\s*:\s*false\b/.test(code)) return

        this.info(`✂ ${path.basename(cleanId)} stripped from build (unpublished)`)
        return {
            code: "export default { published: false, dates: { start: { date: new Date(0) } } }\n",
            map: null,
        }
    },
})

export default plugin
