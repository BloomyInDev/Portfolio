export enum LanguagesEnum {
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

export enum FrameworksEnum {
    VUEJS = "Vue.js",
    NESTJS = "NestJS",
    JAVAFX = "JavaFX", // Extension de Java pour les interfaces graphiques
    LIBGDX = "libGDX", // Framework de développement de jeux en Java
    ASTRO = "Astro",
    SVELTE = "Svelte",
    TAILWINDCSS = "Tailwind CSS",
    BOOTSTRAP = "Bootstrap",
}

export enum DatabasesEnum {
    POSTGRESQL = "PostgreSQL",
}

export enum ToolsEnum {
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
