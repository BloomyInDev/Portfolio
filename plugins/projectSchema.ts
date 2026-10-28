import { join } from "node:path"
import type { EnvironmentModuleNode, Plugin } from "vite"

const GENERATOR = "/tools/projectSchema.ts"

type Generator = typeof import("../tools/projectSchema.ts")

/** Source files of a module and of everything it imports. */
const filesOf = (module: EnvironmentModuleNode, files = new Set<string>()): Set<string> => {
    if (module.file === null || files.has(module.file)) return files
    files.add(module.file)
    for (const imported of module.importedModules) filesOf(imported, files)
    return files
}

// Keeps `schemas/project.json` (editor feedback on the project frontmatter) in step with the
// enums it is generated from: written when the dev server starts, rewritten when a source changes.
// Dev only: the build does not need the schema.
const plugin = (): Plugin => ({
    name: "project-schema",
    apply: "serve",

    async configureServer(server) {
        const output = join(server.config.root, "schemas", "project.json")
        const graph = server.environments.ssr.moduleGraph
        let sources = new Set<string>()

        const regenerate = async () => {
            try {
                // Loaded through Vite, not imported: it re-evaluates the enums after a change
                const generator = (await server.ssrLoadModule(GENERATOR)) as Generator
                await generator.writeProjectSchema(output)
                const module = await graph.getModuleByUrl(GENERATOR)
                sources = module === undefined ? sources : filesOf(module)
            } catch (error) {
                server.config.logger.error(`[project-schema] ${String(error)}`)
            }
        }

        await regenerate()
        server.watcher.on("change", (file) => {
            if (!sources.has(file)) return
            graph.onFileChange(file)
            void regenerate()
        })
    },
})

export default plugin
