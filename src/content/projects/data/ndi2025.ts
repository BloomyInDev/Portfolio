import { MonthEnum, createDate } from "../date"
import technologies from "../technologies"
import types from "../types"
import type { IIncompleteProject } from "../types"

export default {
    title: "Nuit de l'Info 2025",
    subtitle: "Création d'un site de sensibilisation à la démarche NIRD",
    published: true,
    description: [
        "Lors de la Nuit de l'Info 2025, nous avons créé un site web visant à sensibiliser les étudiants pour la démarche NIRD (Numérique Inclusif, Responsable et Durable).",
        "Le site présente des informations clés sur l'importance de l'inclusion numérique, les pratiques responsables dans le développement technologique, et les initiatives durables dans le secteur numérique.",
        "Pendant cet évènement, nous avons travaillé en équipe pour concevoir, développer et déployer le site web en un temps limité, mettant en pratique nos compétences techniques et notre capacité à collaborer efficacement.",
        "Ce projet m'a permis d'approfondir mes connaissances en développement web tout en travaillant sur un sujet qui m'interesse particulièrement.",
        "Ce projet m'a également permis de développer mes compétences en CI/CD, avec la configuration d'un pipeline de déploiement automatique pour automatiser le processus de mise à jour du site sur Github Pages à chaque modification du code.",
        "J'ai également eu le plaisir de réaliser entièrement le mini-jeu Snake intégré au site, ce qui a ajouté une dimension interactive et ludique à notre projet de sensibilisation tout en remplissant un des nombreux défis disponibles lors de la nuit.",
        "J'ai travaillé aux côtés de plusieurs amis pour réaliser ce projet. Ces personnes sont",
        [
            "[Clément Dubois](https://rybois-dev.github.io/portfolio/src/)",
            "[Romain Dellaroli](https://dellarolir.github.io/Romain_Dellaroli.github.io/)",
            "[Vincent Quitin](https://www.linkedin.com/in/vincent-quintin-8a097b31b/)",
            "[Pierre-Loup Lavilledieu](https://www.linkedin.com/in/pierre-loup-lavilledieu-70b370371/)",
        ]
            .map((name) => `- ${name}`)
            .join("\n"),
        // "Ce site est actuellement déployé avec Github Pages et est accessible [juste ici](https://ndi2025.bastienluben.dev). ",
    ],
    newFormat: false,
    type: types.projectTypes.PERSONAL,
    knowledges: [
        technologies.languages.HTML,
        technologies.languages.CSS,
        technologies.languages.TYPESCRIPT,
        technologies.tools.GIT,
        types.methods.AGILE,
    ],
    images: [
        { title: "Page d'accueil", url: "/project/ndi2025/homepage.png" },
        { title: "Jeu Snake", url: "/project/ndi2025/snake.png" },
    ],
    dates: {
        start: createDate({ day: 4, month: MonthEnum.December, year: 2025 }),
        end: createDate({ day: 5, month: MonthEnum.December, year: 2025 }),
    },
    projectUrl: "https://ndi2025.bastienluben.dev",
} satisfies IIncompleteProject
