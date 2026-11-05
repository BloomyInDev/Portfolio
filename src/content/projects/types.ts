import type { Component } from "vue"
import type { TechnologyEnum } from "./technologies.ts"

enum MethodsEnum {
    AGILE = "Agile",
    OOP = "OOP",
    UML = "UML",
    SELF_LEARNING = "Self-learning",
}

enum ProjectTypeEnum {
    PERSONAL = "Personal",
    ACADEMIC = "Academic",
    PROFESSIONAL = "Professional",
}

export default {
    methods: MethodsEnum,
    projectTypes: ProjectTypeEnum,
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
    /** Compiled markdown body. Absent when loaded in Node (vite.config.ts only needs metadata) */
    body?: Component
    /** Url to the project */
    projectUrl?: string
    /** Images associated with the project */
    images: IProjectImages
    /** Knowledges associated with the project */
    knowledges: (TechnologyEnum | MethodsEnum)[]
    /** Project dates */
    dates: IProjectDate
    /** Type of the project */
    type: ProjectTypeEnum
    /**  Is published ? */
    published: boolean
}

/** What a project's frontmatter describes: everything except what is derived or compiled. */
export type IProjectMeta = Omit<IProject, "id" | "body">

export type ICustomDate = {
    definedDay: boolean
    date: Date
}
