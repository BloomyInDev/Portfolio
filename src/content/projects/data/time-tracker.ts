import { MonthEnum, createDate } from "../date"
import technologies from "../technologies"
import types from "../types"
import type { IIncompleteProject } from "../types"

export default {
    title: "Time Tracker",
    subtitle: "Une application de suivi de temps de travail",
    published: true,
    description: [
        "Time Tracker est une application de suivi de temps de travail.",
        "C'est un petit projet que j'ai réalisé pour un membre de ma famille, afin de remplacer son ancien suivi sur Excel.",
        "",
        "Ne pouvant pas installer de logiciels sur l'ordinateur de travail, j'ai décidé de développer une application web.",
        "Préférant réaliser des projets pour apprendre de nouvelles connaissances, j'ai choisi de partir sur le langage Go.",
        "",
        "Le choix de Go a été guidé par plusieurs facteurs :",
        "- **Le déploiement** : Go compile en un unique binaire embarquant les assets et les templates, ce qui rend l'installation et les mises à jour très simples",
        "- **La légèreté** : rapide et peu gourmand en ressources, l'application tourne sans problème sur une petite machine. En l'absence de pagination sur les tâches, les pages rendues côté serveur peuvent devenir très lourdes (plusieurs centaines de ko), et pourtant les requêtes restent traitées en une dizaine de millisecondes",
        "- **La simplicité** : un langage typé, facile à lire, doté d'une bibliothèque standard complète, d'une communauté très active et d'un riche écosystème de packages tiers",
        "- **L'apprentissage** : l'envie de découvrir un nouvel écosystème, afin de l'ajouter à mes compétences",
        "",
        "Les technologies utilisées :",
        "- **[Go](https://go.dev)** pour le backend et la logique métier",
        "- **[`templ`](https://templ.guide)** pour le templating HTML côté serveur, le JavaScript étant réduit au strict minimum",
        "- **[SQLite](https://sqlite.org)** comme base de données embarquée",
        "- **[Bulma](https://bulma.io)** pour l'interface",
        "",
        "Côté fonctionnalités, l'application permet la saisie des heures par client et par tâche, la définition d'objectifs quotidiens, la génération de rapports imprimables filtrables par dates, ainsi qu'une interface bilingue français/anglais.",
        "",
        "C'était mon premier vrai projet en Go et l'occasion de découvrir `templ`, tout en remplaçant un suivi Excel anciennement utilisé. C'est un projet que je continue de faire évoluer en fonction des demandes et des besoins.",
    ],
    newFormat: true,
    dates: {
        start: createDate({ month: MonthEnum.July, year: 2026 }),
    },
    type: types.projectTypes.PERSONAL,
    knowledges: [
        technologies.languages.GOLANG,
        technologies.languages.JAVASCRIPT,
        technologies.languages.SQL,
        technologies.databases.SQLITE,
        technologies.tools.DOCKER,
        technologies.tools.GIT,
        technologies.tools.GITHUB,
        types.methods.SELF_LEARNING,
    ],
    projectUrl: "https://github.com/BloomyInDev/time-tracker",
} satisfies IIncompleteProject
