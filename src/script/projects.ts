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
    // Langages de base de données
    SQL = "SQL",
    PLSQL = "PLSQL",

    // Systèmes d'exploitation
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
    description: string | string[]
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

export const projectNameToId = (name: string): string =>
    name
        .toLowerCase()
        .normalize("NFD")
        .replace(/[^a-zA-Z0-9 -]/g, "") // Remove everything that is not a letter, number, space or dash
        .replace(/ /g, "-") // Replace spaces with dashes

export const projectDateToString = (projectDates: IProjectDate): string => {
    if (projectDates.end === undefined) {
        return `Depuis ${projectDates.start.definedDay ? "le" : ""} ${dateToDateString(projectDates.start)}`
    } else if (projectDates.end.date.getMonth() === projectDates.start.date.getMonth()) {
        return `Du ${projectDates.start.date.toLocaleDateString("fr-FR", { day: "2-digit" })} ${projectDates.end.definedDay ? "au" : "à"} ${dateToDateString(projectDates.end)}`
    } else {
        return `${projectDates.start.definedDay ? "Du" : "De"} ${dateToDateString(projectDates.start)} ${projectDates.end.definedDay ? "au" : "à"} ${dateToDateString(projectDates.end)}`
    }
}

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
            "Je remercie mes coéquipiers [Clément Dubois](https://rybois-dev.github.io/portfolio/src/), [Romain Dellaroli](https://dellarolir.github.io/Romain_Dellaroli.github.io/) et [Raphaël Fouqué](https://www.linkedin.com/in/raphael-fouque689/) pour ce travail de groupe réussi.",
        ],
        newFormat: false,
        type: ProjectTypeEnum.ACADEMIC,
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
        type: ProjectTypeEnum.PERSONAL,
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
            "J'ai travaillé sur ce projet avec [Natan Cantié](https://www.linkedin.com/in/natan-cantie-018550347/).",
        ],
        newFormat: false,
        type: ProjectTypeEnum.ACADEMIC,
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
            "J'ai réalisé ce concours entre amis avec",
            [
                "[Clément Dubois](https://rybois-dev.github.io/portfolio/src/)",
                "[Romain Dellaroli](https://dellarolir.github.io/Romain_Dellaroli.github.io/)",
                "[Jordi Rocafort](https://jordi-rocafort.fr/portfolio/)",
            ]
                .map((name) => `- ${name}`)
                .join("\n"),
        ],
        newFormat: false,
        type: ProjectTypeEnum.PERSONAL,
        knowledges: [
            TechnologiesEnum.JAVA,
            TechnologiesEnum.LIBGDX,
            TechnologiesEnum.GIT,
            MethodsEnum.OOP,
        ],
        dates: {
            start: createDate({ day: 23, month: MonthEnum.January, year: 2025 }),
            end: createDate({ day: 25, month: MonthEnum.January, year: 2025 }),
        },
        images: [{ title: "Écran de jeu", url: "/project/cgj2025/gameplay.png" }],
        projectUrl: "https://bybloomy.itch.io/thesymphonyofstars-cgj2025",
    },
    {
        title: "CodeGameJam 2026 - 10ème édition",
        subtitle: "Développement d'un jeu vidéo en équipe lors de la CodeGameJam 2026",
        description: [
            "Lors de la 10ème édition de la CodeGameJam, j'ai de nouveau eu l'opportunité de participer à cet événement passionnant où j'ai travaillé en équipe pour développer un jeu vidéo en 30 heures.",
            'Le thème de cette édition étant "Faites des clics", nous avons décidé d\'utiliser à fond le concept des clics.',
            'Notre jeu, intitulé "Le carnaval de Makoto", est un jeu infini où le joueur passe à travers des niveaux de catégories aléatoires et de difficultés croissantes.',
            "Dans un niveau, il faudra cliquer sur les bombes avant qu'elles n'explosent.",
            "Dans un autre, il faudra cliquer sur les ennemis qui viendront vers nous avant qu'elles ne nous touchent.",
            "Ce projet m'a permis de renforcer mes compétences en développement de jeux vidéo, en gestion du temps et en travail d'équipe.",
            "Le jeu rendu au final est jouable et propose une expérience de jeu amusante et engageante, mettant en avant le concept des clics de manière créative.",
            "J'ai réalisé ce concours avec des amis et collègues de la précédente édition :",
            [
                "[Clément Dubois](https://rybois-dev.github.io/portfolio/src/)",
                "[Romain Dellaroli](https://dellarolir.github.io/Romain_Dellaroli.github.io/)",
                "[Omar Qaryaqos](https://www.linkedin.com/in/omar-qaryaqos-44ab6427a/)",
                "[Quentin Nozieres](https://www.linkedin.com/in/quentin-nozieres-218a843a8/)",
                "[Léo Mialon](https://www.linkedin.com/in/l%C3%A9o-mialon-8aa378397/)",
                "[Romain Therond](https://www.linkedin.com/in/romain-therond-59654b3aa/)",
            ]
                .map((name) => `- ${name}`)
                .join("\n"),
        ],
        newFormat: false,
        type: ProjectTypeEnum.PERSONAL,
        knowledges: [
            TechnologiesEnum.JAVA,
            TechnologiesEnum.LIBGDX,
            TechnologiesEnum.GIT,
            MethodsEnum.OOP,
        ],
        dates: {
            start: createDate({ day: 15, month: MonthEnum.January, year: 2026 }),
            end: createDate({ day: 17, month: MonthEnum.January, year: 2026 }),
        },
        images: [
            { title: "Menu principal", url: "/project/cgj2026/homescreen.png" },
            { title: "Écran de jeu 1", url: "/project/cgj2026/gameplay_1.png" },
            { title: "Écran de jeu 2", url: "/project/cgj2026/gameplay_2.png" },
            { title: "Écran de jeu 3", url: "/project/cgj2026/gameplay_3.png" },
            { title: "Écran de jeu quand on meurt", url: "/project/cgj2026/gameplay_dead.png" },
            { title: "Écran des crédits", url: "/project/cgj2026/credits.png" },
        ],
        projectUrl: "https://bybloomy.itch.io/le-carnaval-de-makoto",
    },
    {
        title: "Portfolio personnel",
        subtitle: "Création de mon portfolio personnel pour présenter mes projets et compétences",
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
        type: ProjectTypeEnum.PERSONAL,
        knowledges: [
            TechnologiesEnum.HTML,
            TechnologiesEnum.CSS,
            TechnologiesEnum.JAVASCRIPT,
            TechnologiesEnum.VUEJS,
            TechnologiesEnum.GIT,
            TechnologiesEnum.GITHUB,
        ],
        projectUrl: "https://bastienluben.dev",
    },
    {
        title: "Homelab",
        subtitle:
            "Mise en place d'un réseau de serveurs personnels pour l'hébergement de services et l'apprentissage de l'administration système",
        description: [
            "J'ai mis en place un homelab, c'est-à-dire un réseau de serveurs personnels, dans le but d'héberger divers services",
            "Ce projet m'a permis de développer mes compétences en administration système, en gestion de réseaux et en sécurité informatique.",
            "Mon homelab comprend plusieurs serveurs physiques, chacun ayant multiple tâches tels que l'hébergement de sites web complets, d'applications à usage personnel, de serveurs de stockage, ...",
            "En configurant et en maintenant mon homelab, j'ai acquis une expérience pratique dans la gestion de serveurs, la configuration de réseaux et la mise en place de mesures de sécurité pour protéger mes données et mes services.",
            "Ce projet est un espace d'apprentissage continu où je teste de nouvelles technologies, explore des configurations avancées et améliore mes compétences en administration système.\n",
            "Mon homelab est actuellement composé de 3 machines physiques, que je prévois de consolider bientôt. Ces machines sont uniquement de la récupération d'ancien matériel qui allait être jeté.",
            "Cette configuration me permet d'avoir une grande flexibilité pour héberger différents types de services, tout en me donnant l'opportunité d'apprendre à gérer et à optimiser les ressources de mon homelab.\n",
            (
                [
                    {
                        name: "ronflex",
                        explaination: [
                            "ma machine principale.",
                            "Elle est composée d'un i3 7100, de 32Go de RAM, d'1To+128Go de stockage en SSD SATA et tourne sous Debian 13.",
                            "Il héberge la quasi totalité de mon infrastructure, étant donné que c'est la machine la plus performante que j'ai.",
                        ],
                        services: [
                            'Une stack "Reverse Proxy" avec [traefik](https://traefik.io), [authentik](https://goauthentik.io/), et [Anubis](https://anubis.techaro.lol/). Il y a également quelques services annexes comme [Grafana](https://grafana.com) et [Prometheus](https://prometheus.io/)',
                            "Une stack \"Forge\" avec [Forgejo](https://forgejo.org/) pour le contrôle de version avec l'extension `Forgejo Actions` pour l'intégration continue",
                            'Une stack "Minecraft" avec [Gate Proxy](https://gate.minekube.com) comme proxy et quelques serveurs Minecraft privés',
                            'Une stack "Drive" avec [Nextcloud](https://nextcloud.com) et [Collabora Online](https://www.collaboraonline.com/)',
                            "Et plus encore... Au total, une 40-aine de conteneurs sont sur cette petite machine",
                        ],
                    },
                    {
                        name: "givrali",
                        explaination: [
                            "une machine qui était sensé être temporaire, mais qui est reste toujours en place.",
                            "Elle est composée d'un i7 3537U, de 8Go de RAM, de 128Go de stockage en SSD SATA et tourne sous Arch Linux (étant donné que c'était sensé être temporaire).",
                            "Elle héberge très peu de services, étant donné ses performances limitées, mais elle me sert de machine de test pour des projets qui pourraient poser des problèmes à ma machine principale.",
                        ],
                        services: [
                            `Les projets de SAÉ de l'IUT comme [Vox Populi](../${projectNameToId("Vox Populi")})`,
                            "Certains projets pour des clients de mon auto-entreprise (serveurs de base de données de développement, bots Discord, serveur de webhooks, ...)",
                        ],
                    },
                    {
                        name: "salameche",
                        explaination: [
                            "une machine qui est temporaire, elle sert a fournir une petite machine pour des copains de manière extremement temporaire.",
                            "Elle est composée d'un Pentium N3540, de 4Go de RAM, de 256Go de SSD SATA et tourne sous Debian 13.",
                            "Elle a fait tourner que des petits services parce qu'elle est très peu puissante",
                        ],
                        services: [
                            "Un serveur minecraft pour effectuer des tests de groupe sur un plugin en développement, déployé en bare-metal",
                            "Différents sites web pour des blagues ou pour des rendus",
                        ],
                    },
                ] satisfies { name: string; explaination: string[]; services: string[] }[]
            )
                .map(
                    (machine) =>
                        `\`${machine.name}\`, ${machine.explaination.join("\n")}\nElle héberge\n${machine.services.map((service) => `  - ${service}`).join("\n")}`,
                )
                .join("\n".repeat(2)),

            "\nLe tout derrière une Livebox 5, que je prévois de remplacer par un vrai routeur dans un futur proche. Cela permettera de déplacer certains services réseau dessus (DNS, Wireguard, ...)",
        ],
        newFormat: true,
        type: ProjectTypeEnum.PERSONAL,
        dates: {
            start: createDate({ month: MonthEnum.December, year: 2024 }),
        },
        knowledges: [TechnologiesEnum.LINUX, TechnologiesEnum.DOCKER, MethodsEnum.SELF_LEARNING],
    },
    {
        title: "Stage chez Dmoti",
        subtitle:
            "Stage de développement web chez Dmoti, une entreprise spécialisée dans la Gestion Technique des Batiments (GTB)",
        description: ["WIP"],
        dates: { start: createDate({ month: MonthEnum.April, year: 2026 }) },
        knowledges: [],
        newFormat: true,
        type: ProjectTypeEnum.PROFESSIONAL,
    },
]

export const projects = unsortedProjects
    .map((project) => ({
        ...project,
        id: projectNameToId(project.title),

        description: Array.isArray(project.description)
            ? project.description.join(project.newFormat ? "\n" : "\n".repeat(2))
            : project.description,
        dates: {
            ...project.dates,
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
