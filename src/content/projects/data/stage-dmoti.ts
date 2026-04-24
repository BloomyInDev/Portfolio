import { MonthEnum, createDate } from "../date"
import { ProjectTypeEnum, type IIncompleteProject } from "../types"

export default {
    title: "Stage chez Dmoti",
    subtitle:
        "Stage de développement web chez Dmoti, une entreprise spécialisée dans la Gestion Technique des Batiments (GTB)",
    published: false,
    description: ["WIP"],
    dates: { start: createDate({ month: MonthEnum.April, year: 2026 }) },
    knowledges: [],
    newFormat: true,
    type: ProjectTypeEnum.PROFESSIONAL,
} satisfies IIncompleteProject
