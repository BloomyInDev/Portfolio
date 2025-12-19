import { MethodsEnum, TechnologiesEnum } from "./index.ts"

export type IProjectDate = {
    start: Date
    end?: Date
    toString: () => string
}

export type IProject = {
    id: string
    title: string
    subtitle: string
    description: string | string[]
    projectUrl?: string
    images?: string[]
    knowledges: (TechnologiesEnum | MethodsEnum)[]
    dates: IProjectDate
}

export type IIncompleteProject = Omit<IProject, "id" | "dates"> & {
    dates: Omit<IProjectDate, "toString">
}

export enum MonthEnum {
    January,
    February,
    March,
    April,
    May,
    June,
    July,
    August,
    September,
    October,
    November,
    December,
}

const createDate = (options: { day?: number; month: MonthEnum; year: number }) =>
    new Date(options.year, options.month, options.day ?? 1)

export const dateToDateString = (date: Date): string =>
    date.toLocaleDateString("fr-FR", {
        day: "2-digit",
        month: "long",
        year: "numeric",
    })

const unsortedProjects: IIncompleteProject[] = [
    {
        title: "Vox Populi",
        subtitle: "Projet de démocratie participative - Projet d'études",
        description: [
            "Vox Populi est un projet de démocratie participative afin de mettre en pratique nos conaissances",
        ],
        knowledges: [
            TechnologiesEnum.PHP,
            TechnologiesEnum.CSS,
            TechnologiesEnum.JAVASCRIPT,
            TechnologiesEnum.SQL,
            MethodsEnum.AGILE,
        ],
        dates: {
            start: createDate({ month: MonthEnum.September, year: 2025 }),
        },
    },
    {
        title: "Nuit de l'Info 2025",
        subtitle: "Création d'un site de sensibilisation à la démarche NIRD",
        description: [
            "Lors de la Nuit de l'Info 2025, nous avons créé un site web visant à sensibiliser les étudiants pour la démarche NIRD (Numérique Inclusif, Responsable et Durable).",
            "Le site présente des informations clés sur l'importance de l'inclusion numérique, les pratiques responsables dans le développement technologique, et les initiatives durables dans le secteur numérique.",
            "Pendant cet évènement, nous avons travaillé en équipe pour concevoir, développer et déployer le site web en un temps limité, mettant en pratique nos compétences techniques et notre capacité à collaborer efficacement.",
            "Ce projet m'a permis d'approfondir mes connaissances en développement web tout en travaillant sur un sujet qui m'interesse particulièrement.",
        ],
        knowledges: [
            TechnologiesEnum.HTML,
            TechnologiesEnum.CSS,
            TechnologiesEnum.TYPESCRIPT,
            TechnologiesEnum.GIT,
            MethodsEnum.AGILE,
        ],
        dates: {
            start: createDate({ day: 4, month: MonthEnum.December, year: 2025 }),
            end: createDate({ day: 5, month: MonthEnum.December, year: 2025 }),
        },
        projectUrl: "https://ndi2025.bastienluben.dev",
    },
]

export const projects = unsortedProjects
    .map((project) => ({
        ...project,
        id: project.title
            .toLowerCase()
            .normalize("NFD")
            .replace(/[^a-zA-Z0-9 -]/g, "") // Remove everything that is not a letter, number, space or dash
            .replace(/ /g, "-"), // Replace spaces with dashes
        description: Array.isArray(project.description)
            ? project.description.join("\n\n")
            : project.description,
        dates: {
            ...project.dates,
            toString: () =>
                project.dates.end === undefined
                    ? `Depuis le ${dateToDateString(project.dates.start)}`
                    : `Du ${dateToDateString(project.dates.start)} au ${dateToDateString(project.dates.end)}`,
        },
    }))
    .sort((a, b) => {
        if (a.dates.start.getTime() === b.dates.start.getTime()) {
            if (a.dates.end && b.dates.end) {
                return b.dates.end.getTime() - a.dates.end.getTime()
            }
            if (a.dates.end) {
                return -1
            }
            if (b.dates.end) {
                return 1
            }
            return 0
        }
        return b.dates.start.getTime() - a.dates.start.getTime()
    })
