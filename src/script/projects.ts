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
    PYTHON = "Python",
    GOLANG = "Golang",

    // Langages bas niveau
    C = "C",
    // Langages de base de données
    SQL = "SQL",
    PLSQL = "PLSQL",

    // Coordination
    GIT = "Git",
    GITHUB = "Github",
    DOCKER = "Docker",
}

export enum MethodsEnum {
    AGILE = "Agile",
    OOP = "OOP",
    UML = "UML",
}

export type IProjectDate = {
    /** Start of the project */
    start: ICustomDate
    /** End of the project */
    end?: ICustomDate
    toString: () => string
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
    description: string | string[]
    /** Url to the project */
    projectUrl?: string
    /** Images associated with the project */
    images: IProjectImages
    /** Knowledges associated with the project */
    knowledges: (TechnologiesEnum | MethodsEnum)[]
    /** Project dates */
    dates: IProjectDate
}

export type IIncompleteProject = Omit<IProject, "id" | "dates" | "images"> & {
    dates: Omit<IProjectDate, "toString">
    images?: IProjectImages
}

export type ICustomDate = {
    definedDay: boolean
    date: Date
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

const createDate = (options: { day?: number; month: MonthEnum; year: number }) => ({
    definedDay: options.day !== undefined,
    date: new Date(options.year, options.month, options.day ?? 1),
})

export const dateToDateString = (date: ICustomDate): string =>
    date.date.toLocaleDateString("fr-FR", {
        day: date.definedDay ? "2-digit" : undefined,
        month: "long",
        year: "numeric",
    })

const unsortedProjects: IIncompleteProject[] = [
    {
        title: "Vox Populi",
        subtitle: "Projet de démocratie participative - Projet d'études",
        description: [
            "Vox Populi est un projet de démocratie participative afin de mettre en pratique nos conaissances",
            "Ce projet, réalisé en équipe de 4, avait pour objectif d'appliquer les concepts et méthodes apprises en cours, notamment l'architecture MVC et les méthodes agiles.",
            "Le projet consiste en une plateforme web permettant aux utilisateurs de créer et de participer à des consultations sur divers sujets. Les utilisateurs peuvent soumettre des propositions, voter pour leurs préférées, et visualiser les résultats des consultations, le tout dépendant de leurs roles dans une consultation.",
            "J'ai principalement travaillé sur la partie backend du projet, en utilisant PHP pour développer les fonctionnalités de gestion des consultations, des propositions et des votes. J'ai également contribué à la conception de la base de données SQL pour stocker les informations relatives aux utilisateurs, aux consultations et aux votes.",
            [
                "Le projet utilise",
                "- PHP et l'architecture MVC pour la gestion du backend",
                "- Une base de données MySQL pour la gestion des données",
                "- Bulma pour le design du site.",
                "- Gitlab et Trello pour le contrôle de version et la collaboration en équipe.",
            ].join("\n"),
            "Je remercie mes coéquipiers [Clément Dubois](https://rybois-dev.github.io/portfolio/src/), [Romain Dellaroli](https://dellarolir.github.io/Romain_Dellaroli.github.io/) et [Raphaël Fouqué]() pour ce travail de groupe réussi.",
        ],
        knowledges: [
            TechnologiesEnum.PHP,
            TechnologiesEnum.CSS,
            TechnologiesEnum.JAVASCRIPT,
            TechnologiesEnum.SQL,
            TechnologiesEnum.GIT,
            MethodsEnum.OOP,
            MethodsEnum.AGILE,
        ],
        images: [
            { title: "Page des consultations", url: "/project/vox-populi/consultations.png" },
            {
                title: "Page d'une consultation",
                url: "/project/vox-populi/consultationDetails.png",
            },
            { title: "Page d'une propositions", url: "/project/vox-populi/listePropositions.png" },
            {
                title: "L'action du controleur voteMajoritaire qui gère l'enregistrement des votes",
                url: "/project/vox-populi/codeVoteMajoritaire.png",
            },
            {
                title: "Une vue utilisée dans les calculs du vote majoritaire",
                url: "/project/vox-populi/sqlVoteMajoritaire.png",
            },
            {
                title: "Modèle Entité-Association de la base de données du projet",
                url: "/project/vox-populi/modeleEA.jpg",
            },
        ],
        dates: {
            start: createDate({ month: MonthEnum.September, year: 2025 }),
            end: createDate({ month: MonthEnum.January, year: 2026 }),
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
            "J'ai également eu le plaisir de réaliser entièrement le mini-jeu Snake intégré au site, ce qui a ajouté une dimension interactive et ludique à notre projet de sensibilisation tout en remplissant un des nombreux défis disponibles lors de la nuit.",
            "J'ai travaillé aux côtés de plusieurs amis pour réaliser ce projet. Ces personnes sont",
            [
                "[Clément Dubois](https://rybois-dev.github.io/portfolio/src/)",
                "[Romain Dellaroli](https://dellarolir.github.io/Romain_Dellaroli.github.io/)",
                "Vincent Quitin",
                "Pierre-Loup Lavilledieu",
            ]
                .map((name) => `- ${name}`)
                .join("\n"),
        ],
        knowledges: [
            TechnologiesEnum.HTML,
            TechnologiesEnum.CSS,
            TechnologiesEnum.TYPESCRIPT,
            TechnologiesEnum.GIT,
            MethodsEnum.AGILE,
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
    },
    {
        title: "SAÉ Pokémon",
        subtitle: "Projet d'implémentation du célèbre jeu Pokémon Trading Card Game en Java",
        description: [
            "Dans le cadre de ma formation, j'ai participé à un projet visant à implémenter le célèbre jeu Pokémon Trading Card Game en utilisant le langage de programmation Java.",
            "Ce projet m'a permis de mettre en pratique mes compétences en programmation orientée objet en me basant sur le diagramme de classe fourni, tout en approfondissant ma compréhension des concepts fondamentaux de la programmation Java.",
            "En travaillant sur ce projet, j'ai acquis une expérience précieuse dans la conception et le développement d'une application complexe, ainsi que dans la collaboration avec d'autres membres de l'équipe pour atteindre nos objectifs communs.",
            "Ce projet m'a également permis de comprendre comment implémenter des interfaces Homme <-> Machine en utilisant JavaFX pour créer une expérience utilisateur interactive et engageante.",
        ],
        knowledges: [
            TechnologiesEnum.JAVA,
            TechnologiesEnum.JAVAFX,
            TechnologiesEnum.GIT,
            MethodsEnum.OOP,
            MethodsEnum.UML,
        ],
        images: [
            {
                title: 'Implémentation de la carte Objet "Communication Pokémon"',
                url: "/project/sae-pokemon/carteObjetCommPoke.png",
            },
            {
                title: 'Implémentation de la carte Objet "Faiblo Ball"',
                url: "/project/sae-pokemon/carteObjetFaibloBall.png",
            },
            { title: "Méthode jouerTour()", url: "/project/sae-pokemon/jouerTour.png" },
        ],
        dates: {
            start: createDate({ month: MonthEnum.March, year: 2025 }),
            end: createDate({ month: MonthEnum.June, year: 2025 }),
        },
    },
    {
        title: "CodeGameJam 2025 - 9ème édition",
        subtitle: "Développement d'un jeu vidéo en équipe lors de la CodeGameJam 2025",
        description: [
            "Lors de la 9ème édition de la CodeGameJam, j'ai eu l'opportunité de participer à un événement passionnant où j'ai travaillé en équipe pour développer un jeu vidéo en 30 heures.",
            "Ce projet m'a permis de collaborer avec d'autres développeurs pour créer une expérience de jeu unique et engageante.",
            "Ce projet, un peu trop ambitieux pour le temps imparti, notament sur un aspect en 3 dimensions, m'ont montré la difficulté de créer de A à Z un jeu vidéo complet.",
            "Le jeu développé lors de cet événement est intitulé 'The Symphony of Stars'. Il s'agit d'un jeu d'exploration spatiale où les joueurs incarnent un voyageur traversant l'espace afin de retrouver des morceaux de mélodies dispersées à travers les étoiles.",
            "Le jeu rendu au final était jouable, mais n'a pas pu être finalisé à cause du temps imparti. Cependant, cette expérience m'a permis d'apprendre énormément sur le développement de jeux vidéo, la gestion du temps et la collaboration en équipe.",
        ],
        knowledges: [TechnologiesEnum.JAVA, TechnologiesEnum.GIT, MethodsEnum.OOP],
        dates: {
            start: createDate({ day: 23, month: MonthEnum.January, year: 2025 }),
            end: createDate({ day: 25, month: MonthEnum.January, year: 2025 }),
        },
        images: [{ title: "Écran de jeu", url: "/project/cgj2025/gameplay.png" }],
        projectUrl: "https://bybloomy.itch.io/thesymphonyofstars-cgj2025",
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
            toString: () => {
                if (project.dates.end === undefined) {
                    return `Depuis ${project.dates.start.definedDay ? "le" : ""} ${dateToDateString(project.dates.start)}`
                } else if (
                    project.dates.end.date.getMonth() === project.dates.start.date.getMonth()
                ) {
                    return `Du ${project.dates.start.date.toLocaleDateString("fr-FR", { day: "2-digit" })} ${project.dates.end.definedDay ? "au" : "à"} ${dateToDateString(project.dates.end)}`
                } else {
                    return `${project.dates.start.definedDay ? "Du" : "De"} ${dateToDateString(project.dates.start)} ${project.dates.end.definedDay ? "au" : "à"} ${dateToDateString(project.dates.end)}`
                }
            },
        },
        images: project.images ?? [],
    }))
    .sort((a, b) => {
        if (a.dates.start.date.getTime() === b.dates.start.date.getTime()) {
            if (a.dates.end && b.dates.end) {
                return b.dates.end.date.getTime() - a.dates.end.date.getTime()
            }
            if (a.dates.end) {
                return -1
            }
            if (b.dates.end) {
                return 1
            }
            return 0
        }
        return b.dates.start.date.getTime() - a.dates.start.date.getTime()
    })
