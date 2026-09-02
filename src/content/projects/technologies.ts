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

enum ToolsEnum {
    LINUX = "Linux",
    GIT = "Git",
    GITHUB = "Github",
    DOCKER = "Docker",
    WORDPRESS = "WordPress",
    MONDAY = "Monday.com",
    OVH = "OVH",
    NODEJS = "Node.js",
    VERCEL = "Vercel",
}

export type TechnologyEnum = LanguagesEnum | FrameworksEnum | DatabasesEnum | ToolsEnum

export default {
    languages: LanguagesEnum,
    frameworks: FrameworksEnum,
    databases: DatabasesEnum,
    tools: ToolsEnum,
}
