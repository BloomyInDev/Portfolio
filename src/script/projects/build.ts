import { unsortedProjects } from "./data"
import { projectNameToId } from "./slug"
import type { IProject } from "./types"

export const projects: IProject[] = unsortedProjects
    .filter((project) => project.dates.start.date.getTime() <= Date.now() && project.published)
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
