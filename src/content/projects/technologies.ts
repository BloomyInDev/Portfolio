enum LanguagesEnum {
    HTML = "HTML",
    CSS = "CSS",
    JAVASCRIPT = "Javascript",
    TYPESCRIPT = "Typescript",
    PHP = "PHP",
    JAVA = "Java",
    PYTHON = "Python",
    GOLANG = "Golang",
    C = "C",
    SQL = "SQL",
}

enum FrameworksEnum {
    VUEJS = "Vue.js",
    NESTJS = "NestJS",
    JAVAFX = "JavaFX", // Extension de Java pour les interfaces graphiques
    LIBGDX = "libGDX", // Framework de développement de jeux en Java
    ASTRO = "Astro",
    SVELTE = "Svelte",
    TAILWINDCSS = "Tailwind CSS",
    BOOTSTRAP = "Bootstrap",
}

enum DatabasesEnum {
    POSTGRESQL = "PostgreSQL",
    MARIADB = "MariaDB",
    MONGODB = "MongoDB",
    ORACLEDB = "Oracle Database",
    SQLITE = "SQLite",
}

// Installed and run by us, locally or on our own machine.
enum ToolsEnum {
    LINUX = "Linux",
    GIT = "Git",
    DOCKER = "Docker",
    NODEJS = "Node.js",
}

// Third-party platforms we host on or depend on.
enum ServicesEnum {
    GITHUB = "Github",
    WORDPRESS = "WordPress",
    MONDAY = "Monday.com",
    OVH = "OVH",
    VERCEL = "Vercel",
}

export type TechnologyEnum =
    LanguagesEnum | FrameworksEnum | DatabasesEnum | ToolsEnum | ServicesEnum

// The keys double as the folder names under `src/assets/technologies/`.
export default {
    languages: LanguagesEnum,
    frameworks: FrameworksEnum,
    databases: DatabasesEnum,
    tools: ToolsEnum,
    services: ServicesEnum,
}
