import { mkdir, writeFile } from "fs/promises"
import { dirname } from "path"

import technologies from "../src/content/projects/technologies.ts"
import types from "../src/content/projects/types.ts"

/**
 * The JSON Schema of the frontmatter of `src/content/projects/data/*.md`, for editor feedback (the
 * Zed "Frontmatter Schema" extension).
 *
 * The allowed values come from the same enums as `meta.ts`, so they cannot drift. The rules below
 * mirror `parseProjectMeta`: the build stays the source of truth, the schema only brings the
 * errors into the editor.
 *
 * Used by `generateProjectSchema.ts` (`pnpm run generate:schema`) and by the `projectSchema` Vite
 * plugin, which rewrites the file whenever the dev server sees one of its sources change.
 */

const knowledges = [
    ...Object.values(technologies).flatMap((category) => Object.values(category)),
    ...Object.values(types.methods),
]

// `MM/YYYY` or `DD/MM/YYYY`, like DATE_PATTERN in meta.ts
const date = {
    type: "string",
    pattern: "^(\\d{1,2}/)?\\d{1,2}/\\d{4}$",
    description: "MM/YYYY (the page shows the month) or DD/MM/YYYY.",
}

const text = (description: string) => ({ type: "string", minLength: 1, description })

export const projectSchema = {
    $schema: "http://json-schema.org/draft-07/schema#",
    title: "Project frontmatter",
    description:
        "Frontmatter of a project page in src/content/projects/data. Generated: do not edit.",
    type: "object",
    additionalProperties: false,
    required: ["title", "subtitle", "published", "type", "knowledges", "dates"],
    properties: {
        title: text("Name of the project, shown as the page heading."),
        subtitle: text("One-line summary, shown under the title and in the project list."),
        published: {
            type: "boolean",
            description: "false keeps the project out of the site (drafts, debug pages).",
        },
        type: { enum: Object.values(types.projectTypes), description: "Kind of project." },
        dates: {
            type: "object",
            additionalProperties: false,
            required: ["start"],
            properties: {
                start: { ...date, description: `Start of the project. ${date.description}` },
                end: {
                    ...date,
                    description: `End of the project, omit it when ongoing. ${date.description}`,
                },
            },
        },
        knowledges: {
            type: "array",
            description: "Technologies and methods used. Each one must be a known value.",
            items: { enum: knowledges },
        },
        images: {
            type: "array",
            description: "Screenshots shown on the project page.",
            items: {
                type: "object",
                additionalProperties: false,
                required: ["title", "url"],
                properties: {
                    title: text("Caption of the image."),
                    url: text("Path of the image, e.g. /project/name.webp."),
                },
            },
        },
        projectUrl: { type: "string", description: "Link to the live project or its repository." },
    },
}

export const writeProjectSchema = async (output: string): Promise<void> => {
    await mkdir(dirname(output), { recursive: true })
    await writeFile(output, `${JSON.stringify(projectSchema, null, 4)}\n`)
}
