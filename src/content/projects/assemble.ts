import type { Component } from "vue"
import { projectNameToId } from "./slug.ts"
import type { IProject, IProjectMeta } from "./types.ts"

// `import.meta.env` is untyped here: this module is also loaded from vite.config.ts
// (Node context, no vite/client types), where `import.meta.env` is undefined at runtime.
const isDev = Boolean((import.meta as { env?: { DEV?: boolean } }).env?.DEV)

/** Turns parsed project files into the public list: published and started, newest first. */
export const assembleProjects = (entries: (IProjectMeta & { body?: Component })[]): IProject[] =>
    entries
        .filter(
            (project) =>
                project.dates.start.date.getTime() <= Date.now() && (project.published || isDev),
        )
        .map((project) => ({ ...project, id: projectNameToId(project.title) }))
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
