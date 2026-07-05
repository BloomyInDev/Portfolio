import { MonthEnum, createDate } from "../date"
import { LanguagesEnum, ToolsEnum } from "../technologies"
import { MethodsEnum, ProjectTypeEnum, type IIncompleteProject } from "../types"

export default {
    title: "Vox Populi",
    subtitle: "Projet de démocratie participative - Projet d'études",
    published: true,
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
        LanguagesEnum.PHP,
        LanguagesEnum.CSS,
        LanguagesEnum.JAVASCRIPT,
        LanguagesEnum.SQL,
        ToolsEnum.GIT,
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
} satisfies IIncompleteProject
