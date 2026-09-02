import { MonthEnum, createDate } from "../date"
import technologies from "../technologies"
import types from "../types"
import type { IIncompleteProject } from "../types"

export default {
    title: "Portfolio personnel",
    subtitle: "Création de mon portfolio personnel pour présenter mes projets et compétences",
    published: true,
    description: [
        "J'ai créé ce portfolio personnel dans le but de présenter mes projets, mes compétences et mon parcours.",
        "Ce projet m'a permis de mettre en pratique mes compétences en développement web pour créer une plateforme qui reflète ma personnalité et mes réalisations.",
        "Le portfolio présente une sélection de mes projets qui mettent en avant mes compétences techniques et mes expériences professionnelles.",
        "En créant ce portfolio, j'ai pu expérimenter avec un framework que j'ai peu utilisé, Vue.js, et ainsi élargir mes compétences en développement web.",
        "J'ai également travaillé sur l'optimisation du référencement (SEO) du site en ajoutant les différents tags <meta> nécessaires et en structurant le contenu de manière à ce qu'il soit facilement compréhensible par les moteurs de recherche.",
        "Ce portfolio est un projet en constante évolution, que je continue de mettre à jour avec de nouveaux projets, compétences et expériences au fur et à mesure de mes projets.",
        "Je vous invite à explorer mon portfolio pour découvrir mes réalisations et en apprendre davantage sur mon parcours professionnel.",
    ],
    newFormat: false,
    dates: {
        start: createDate({ month: MonthEnum.September, year: 2025 }),
    },
    type: types.projectTypes.PERSONAL,
    knowledges: [
        technologies.languages.HTML,
        technologies.languages.CSS,
        technologies.languages.JAVASCRIPT,
        technologies.frameworks.VUEJS,
        technologies.tools.GIT,
        technologies.tools.GITHUB,
    ],
    projectUrl: "https://bastienluben.dev",
} satisfies IIncompleteProject
