import { dirname, join } from "path"
import { fileURLToPath } from "url"

import { writeProjectSchema } from "./projectSchema.ts"

// `pnpm run generate:schema`. The dev server does the same on its own, see plugins/projectSchema.ts
const output = join(dirname(fileURLToPath(import.meta.url)), "..", "schemas", "project.json")
await writeProjectSchema(output)
console.log(`wrote ${output}`)
