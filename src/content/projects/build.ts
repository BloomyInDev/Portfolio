import { assembleProjects } from "./assemble"
import { markdownProjects } from "./markdown"

/** The projects as the app sees them. Vite only: `./markdown` relies on `import.meta.glob`. */
export const projects = assembleProjects(markdownProjects)
