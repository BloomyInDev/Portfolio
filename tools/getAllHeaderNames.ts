import { readFile, readdir as readDir } from "fs/promises"
import { join } from "path"
import child from "child_process"

const TAGS_IGNORED = ["viewport"]

/**
 * To decode HTML entities in a string
 * This method was generously provided by Claude Sonnet 4.5
 * @param text The text containing HTML entities
 * @returns The decoded text
 */
const decodeHtmlEntities = (text: string): string => {
    const entities: Record<string, string> = {
        '&amp;': '&',
        '&lt;': '<',
        '&gt;': '>',
        '&quot;': '"',
        '&apos;': "'",
        '&nbsp;': ' ',
        // Add more as needed
    }

    return text
        .replace(/&[a-z]+;/gi, (match) => entities[match] || match)
        .replace(/&#(\d+);/g, (_, dec) => String.fromCharCode(Number(dec)))
        .replace(/&#x([0-9a-f]+);/gi, (_, hex) => String.fromCharCode(parseInt(hex, 16)))
}

// Building the project first to ensure headers are up to date
child.execSync("yarn build")

const files = await readDir("./dist/", { withFileTypes: true, recursive: true })

const htmlFiles = files
    .map((f) => {
        if (f.isFile() && f.name.endsWith(".html")) {
            return join(f.parentPath, f.name)
        } else {
            return null
        }
    })
    .filter((f) => f !== null)

const metaTags = new Map<string, { name: string; value: string }[]>()
const duplicateTags: { name: string; value: string; files: string[] }[] = []

for (const filePath of htmlFiles) {
    const content = await readFile(`./${filePath}`, "utf-8")

    const metaTagRegex = /<meta\s+(?:name|property)="([^"]+)"\s+content="([^"]+)"\s*\/?>/g
    const tags: { name: string; value: string }[] = []
    let match: RegExpExecArray | null
    while ((match = metaTagRegex.exec(content)) !== null) {
        if (TAGS_IGNORED.includes(match[1])) continue
        tags.push({ name: match[1], value: match[2] })
    }
    metaTags.set(filePath, tags)
}

// Find duplicates
const tagMap = new Map<string, { value: string; files: string[] }>()
metaTags.forEach((tags, filePath) => {
    tags.forEach((tag) => {
        const key = `${tag.name}:${tag.value}`
        if (tagMap.has(key)) {
            tagMap.get(key)!.files.push(filePath)
        } else {
            tagMap.set(key, { value: tag.value, files: [filePath] })
        }
    })
})

tagMap.forEach((data, key) => {
    if (data.files.length === metaTags.size) {
        const [name] = key.split(":", 1)
        duplicateTags.push({ name, value: data.value, files: data.files })
    }
})

console.log("=== Tags en dupliqués ===\n")
duplicateTags.forEach((dup) => {
    console.log(`${dup.name}: ${decodeHtmlEntities(dup.value)}`)
})

console.log("\n=== Tags par fichiers ===\n")
metaTags.forEach((tags, filePath) => {
    console.log(`Fichier: ${filePath}`)
    tags.forEach((tag) => {
        console.log(`  ${tag.name}: ${decodeHtmlEntities(tag.value)}`)
    })
    console.log("") // Empty line between files
})
