import { fileURLToPath, URL } from "node:url"
import { PluginOption } from "vite"

import { projects } from "../src/content/projects/build"
import { iconsByTechnology } from "../src/content/projects/icons"

const MODULE_ID = "virtual:technology-icons"
const RESOLVED_ID = "\0" + MODULE_ID

const iconsDirectory = fileURLToPath(new URL("../src/assets/technologies", import.meta.url))

// Emits the `icon path -> url` table as static imports, so Rollup only bundles the
// files that are actually reachable. An `import.meta.glob` would pull in the whole
// folder: its keys are read dynamically, so nothing proves to Rollup that an icon is
// dead. Here the published projects are known at build time, and so is the useful set.
//
// Dev keeps every icon: unpublished projects are visible there, and zzz-debug renders
// all of them.
const plugin: () => PluginOption = () => {
    let includeEverything = true

    return {
        name: "technology-icons",
        enforce: "pre",

        configResolved(config) {
            includeEverything = config.command !== "build"
        },

        resolveId(id) {
            if (id === MODULE_ID) return RESOLVED_ID
        },

        load(id) {
            if (id !== RESOLVED_ID) return

            const used = new Set(projects.flatMap((project) => project.knowledges))
            const files = [...iconsByTechnology]
                .filter(([technology]) => includeEverything || used.has(technology))
                .map(([, spec]) => spec.file)

            const imports = files.map(
                (file, index) => `import i${index} from "${iconsDirectory}/${file}"`,
            )
            const entries = files.map((file, index) => `    ${JSON.stringify(file)}: i${index},`)

            this.info(
                `${files.length}/${iconsByTechnology.size} icons bundled` +
                    (includeEverything ? " (dev: all)" : ""),
            )

            return `${imports.join("\n")}\n\nexport default {\n${entries.join("\n")}\n}\n`
        },
    }
}

export default plugin
