import { MonthEnum, createDate } from "./date"
import technologies from "./technologies"
import types from "./types"
import type { ICustomDate, IProjectImages, IProjectMeta } from "./types"

/**
 * Frontmatter is plain JSON/YAML, so enums arrive as their display strings
 * (`Linux`, `Self-learning`, `Personal`...). This file is the only place that turns them
 * back into our enums, and it throws at build time on anything it does not recognise.
 */
const knowledgeValues = new Set<string>([
    ...Object.values(technologies).flatMap((category) => Object.values(category)),
    ...Object.values(types.methods),
])
const projectTypeValues = new Set<string>(Object.values(types.projectTypes))

const fail = (source: string, message: string): never => {
    throw new Error(`[projects] ${source}: ${message}`)
}

const asString = (source: string, key: string, value: unknown): string =>
    typeof value === "string" && value.length > 0
        ? value
        : fail(source, `"${key}" must be a non-empty string`)

// `MM/YYYY` (the day is then undefined, the page shows "décembre 2024") or `DD/MM/YYYY`
const DATE_PATTERN = /^(?:(\d{1,2})\/)?(\d{1,2})\/(\d{4})$/

const asDate = (source: string, key: string, value: unknown): ICustomDate => {
    const match = typeof value === "string" ? DATE_PATTERN.exec(value.trim()) : null
    if (match === null) return fail(source, `"${key}" must look like 12/2026 or 25/12/2026`)

    const [, dayText, monthText, yearText] = match
    const year = Number(yearText)
    const month = Number(monthText) - 1
    const day = dayText === undefined ? undefined : Number(dayText)
    const date = new Date(year, month, day ?? 1)
    // Rejects month 13 and 31/02, which `Date` would silently roll over
    if (date.getMonth() !== month || (day !== undefined && date.getDate() !== day)) {
        return fail(source, `"${key}" is not a real date: ${String(value)}`)
    }
    return createDate({ year, month: month as MonthEnum, day })
}

const asImages = (source: string, value: unknown): IProjectImages => {
    if (value === undefined) return []
    if (!Array.isArray(value)) return fail(source, `"images" must be a list of { title, url }`)
    return value.map((image: { title?: unknown; url?: unknown }, index) => ({
        title: asString(source, `images[${index}].title`, image?.title),
        url: asString(source, `images[${index}].url`, image?.url),
    }))
}

/** `raw` is a module namespace (Vite) or a parsed frontmatter object (Node). */
export const parseProjectMeta = (source: string, raw: Record<string, unknown>): IProjectMeta => {
    const type = asString(source, "type", raw.type)
    if (!projectTypeValues.has(type)) fail(source, `unknown type "${type}"`)

    const knowledges = raw.knowledges
    if (!Array.isArray(knowledges)) fail(source, `"knowledges" must be a list`)
    for (const knowledge of knowledges as unknown[]) {
        if (typeof knowledge !== "string" || !knowledgeValues.has(knowledge)) {
            fail(source, `unknown knowledge "${String(knowledge)}"`)
        }
    }

    const dates = (raw.dates ?? {}) as { start?: unknown; end?: unknown }
    if (typeof raw.published !== "boolean") fail(source, `"published" must be true or false`)

    return {
        title: asString(source, "title", raw.title),
        subtitle: asString(source, "subtitle", raw.subtitle),
        published: raw.published as boolean,
        type: type as IProjectMeta["type"],
        knowledges: knowledges as IProjectMeta["knowledges"],
        dates: {
            start: asDate(source, "dates.start", dates.start),
            ...(dates.end === undefined ? {} : { end: asDate(source, "dates.end", dates.end) }),
        },
        images: asImages(source, raw.images),
        ...(typeof raw.projectUrl === "string" ? { projectUrl: raw.projectUrl } : {}),
    }
}
