export enum TechnologiesEnum {
    // Web
    HTML = "HTML",
    CSS = "CSS",
    JAVASCRIPT = "Javascript",
    TYPESCRIPT = "Typescript",
    PHP = "PHP",
    VUEJS = "Vue.js",

    // Langages haut niveau
    JAVA = "Java",
    JAVAFX = "JavaFX", // Extension de Java pour les interfaces graphiques
    LIBGDX = "libGDX", // Framework de développement de jeux en Java
    PYTHON = "Python",
    GOLANG = "Golang",

    // Langages bas niveau
    C = "C",
    // Langages de base de donnees
    SQL = "SQL",
    PLSQL = "PLSQL",

    // Systemes d'exploitation
    LINUX = "Linux",

    // Coordination
    GIT = "Git",
    GITHUB = "Github",
    DOCKER = "Docker",
}

export enum MethodsEnum {
    AGILE = "Agile",
    OOP = "OOP",
    UML = "UML",
    SELF_LEARNING = "Self-learning",
}

export enum ProjectTypeEnum {
    PERSONAL = "Personal",
    ACADEMIC = "Academic",
    PROFESSIONAL = "Professional",
}

export type IProjectDate = {
    /** Start of the project */
    start: ICustomDate
    /** End of the project */
    end?: ICustomDate
}

export type IProjectImages = { title?: string; url: string }[]

export type IProject = {
    /** Slugified title used as a unique identifier */
    id: string
    /** Project title */
    title: string
    /** Project subtitle */
    subtitle: string
    /** Project description */
    description: string
    /** Url to the project */
    projectUrl?: string
    /** Images associated with the project */
    images: IProjectImages
    /** Knowledges associated with the project */
    knowledges: (TechnologiesEnum | MethodsEnum)[]
    /** Project dates */
    dates: IProjectDate
    /** Type of the project */
    type: ProjectTypeEnum
    /** Old format or new format */
    newFormat: boolean
    /**  Is published ? */
    published: boolean
}

export type IIncompleteProject = Omit<IProject, "id" | "dates" | "images" | "description"> & {
    dates: Omit<IProjectDate, "toString">
    images?: IProjectImages
    description: string | string[]
}

export type ICustomDate = {
    definedDay: boolean
    date: Date
}
