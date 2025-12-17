import { MethodsEnum, TechnologiesEnum } from "./index.ts"

export type IProject = {
    id: string
    title: string
    subtitle: string
    description: string
    projectUrl?: string
    images?: string[]
    knowledges: (TechnologiesEnum | MethodsEnum)[]
    dates: {
        start: Date
        end?: Date
    }
}

export type IIncompleteProject = Omit<IProject, "id">

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

const unsortedProjects: IIncompleteProject[] = [
    {
        title: "Vox Populi",
        subtitle: "Projet de démocratie participative - Projet d'études",
        description: [
            "Vox Populi est un projet de démocratie participative afin de mettre en pratique nos conaissances",
        ].join("\n"),
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
            "Lors de la Nuit de l'Info 2025, nous avons créé un site web visant à sensibiliser les étudiants à la démarche NIRD (Numérique Inclusif, Responsable et Durable).",
            "Le site présente des informations clés sur l'importance de l'inclusion numérique, les pratiques responsables dans le développement technologique, et les initiatives durables dans le secteur numérique.",
        ].join("\n"),
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
        id: project.title.toLowerCase().replace(/ /g, "-"),
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
