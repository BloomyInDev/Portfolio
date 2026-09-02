// Single table mapping every technology to its icon. It lives here rather than in
// the component because vite.config.ts reads it too, to bundle only the icons of
// actually published projects (see plugins/technologyIcons).
import technologies, { type TechnologyEnum } from "./technologies"

// A drop-shadow makes the icon pop off the badge background. Already high-contrast
// icons (plain white ones, PNGs whose own colors read fine) opt out with
// `shadow: false`, since the shadow washes out their detail (e.g. javafx.png).
export const SHADOW_OPACITY = 0.7

type IconSpec = string | { file: string; shadow?: false; square?: true }

export type ResolvedIconSpec = { file: string; shadow?: false; square?: true }

type TechnologiesOf<C extends keyof typeof technologies> = Extract<
    (typeof technologies)[C][keyof (typeof technologies)[C]],
    string
>

// One `Record` per category: forgetting a technology is a type error.
const iconSpecs: { [C in keyof typeof technologies]: Record<TechnologiesOf<C>, IconSpec> } = {
    languages: {
        [technologies.languages.HTML]: "html.svg",
        [technologies.languages.CSS]: "css.svg",
        [technologies.languages.JAVASCRIPT]: "javascript.svg",
        [technologies.languages.TYPESCRIPT]: "typescript.svg",
        [technologies.languages.PHP]: "php.svg",
        [technologies.languages.JAVA]: "java.svg",
        [technologies.languages.PYTHON]: { file: "python.svg", shadow: false },
        [technologies.languages.GOLANG]: { file: "go.svg", shadow: false },
        [technologies.languages.C]: "c.svg",
        [technologies.languages.SQL]: { file: "sql.png", shadow: false },
    },
    frameworks: {
        [technologies.frameworks.VUEJS]: "vuejs.svg",
        [technologies.frameworks.NESTJS]: "nestjs.svg",
        [technologies.frameworks.JAVAFX]: "javafx.png",
        [technologies.frameworks.LIBGDX]: { file: "libgdx.png", shadow: false },
        [technologies.frameworks.ASTRO]: "astro.svg",
        [technologies.frameworks.SVELTE]: "svelte.svg",
        [technologies.frameworks.TAILWINDCSS]: { file: "tailwindcss.svg", square: true },
        [technologies.frameworks.BOOTSTRAP]: "bootstrap.svg",
    },
    databases: {
        [technologies.databases.POSTGRESQL]: "postgresql.svg",
        [technologies.databases.MARIADB]: "mariadb.svg",
        [technologies.databases.MONGODB]: "mongodb.svg",
        [technologies.databases.ORACLEDB]: "oracle.svg",
        [technologies.databases.SQLITE]: "sqlite.svg",
    },
    tools: {
        [technologies.tools.LINUX]: "linux.svg",
        [technologies.tools.GIT]: "git.svg",
        [technologies.tools.DOCKER]: { file: "docker.svg", shadow: false },
        [technologies.tools.NODEJS]: "nodejs.svg",
    },
    services: {
        [technologies.services.GITHUB]: { file: "github.svg", shadow: false },
        [technologies.services.WORDPRESS]: { file: "wordpress.svg", shadow: false },
        [technologies.services.MONDAY]: { file: "monday.png", shadow: false },
        [technologies.services.OVH]: { file: "ovh.png", shadow: false },
        [technologies.services.VERCEL]: { file: "vercel.svg", shadow: false },
    },
}

// Flattens the table into `technology -> path relative to the icons folder`.
export const iconsByTechnology: ReadonlyMap<TechnologyEnum, ResolvedIconSpec> = new Map(
    Object.entries(iconSpecs).flatMap(([category, specs]) =>
        Object.entries(specs as Record<string, IconSpec>).map(
            ([technology, spec]) =>
                [
                    technology as TechnologyEnum,
                    typeof spec === "string"
                        ? { file: `${category}/${spec}` }
                        : { ...spec, file: `${category}/${spec.file}` },
                ] as const,
        ),
    ),
)
