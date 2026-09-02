import type { TechnologyEnum } from "./technologies"

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
    /** Project description */
    description: string
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
