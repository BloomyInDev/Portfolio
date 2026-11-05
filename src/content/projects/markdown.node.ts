import { readdirSync, readFileSync } from "node:fs"
import { fileURLToPath } from "node:url"
import matter from "gray-matter"
import { parseProjectMeta } from "./meta.ts"
import type { IProjectMeta } from "./types.ts"

const dataDir = fileURLToPath(new URL("./data/", import.meta.url))

/** Node twin of `./markdown`: same files, same parser, frontmatter only (no component). */
export const readMarkdownProjects = (): IProjectMeta[] =>
    readdirSync(dataDir)
        .filter((file) => file.endsWith(".md"))
        .map((file) =>
            parseProjectMeta(
                `./data/${file}`,
                matter(readFileSync(`${dataDir}${file}`, "utf8")).data,
            ),
        )
