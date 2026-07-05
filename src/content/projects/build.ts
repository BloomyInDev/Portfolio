import { unsortedProjects } from "./data"
import { projectNameToId } from "./slug"
import type { IProject } from "./types"

// `import.meta.env` is untyped here: this module is also loaded from vite.config.ts
// (Node context, no vite/client types), where `import.meta.env` is undefined at runtime.
const isDev = Boolean((import.meta as { env?: { DEV?: boolean } }).env?.DEV)

export const projects: IProject[] = unsortedProjects
    .filter(
        (project) =>
            project.dates.start.date.getTime() <= Date.now() && (project.published || isDev),
    )
    .map((project) => ({
        ...project,
        id: projectNameToId(project.title),

        description: Array.isArray(project.description)
            ? project.description.join(project.newFormat ? "\n" : "\n".repeat(2))
            : project.description,
        dates: {
            ...project.dates,
        },
        images: project.images ?? [],
    }))
    .sort((a, b) => {
        if (a.dates.start.date.getTime() === b.dates.start.date.getTime()) {
            if (a.dates.end && b.dates.end) {
                return b.dates.end.date.getTime() - a.dates.end.date.getTime()
            }
            if (a.dates.end) {
                return -1
            }
            if (b.dates.end) {
                return 1
            }
            return 0
        }
        return b.dates.start.date.getTime() - a.dates.start.date.getTime()
    })
