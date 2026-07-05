import { MonthEnum, createDate } from "../date"
import { MethodsEnum, ProjectTypeEnum, TechnologiesEnum, type IIncompleteProject } from "../types"

export default {
    title: "Stage chez Dmoti",
    subtitle:
        "Stage de développement web chez Dmoti, une entreprise spécialisée dans la Gestion Technique des Batiments (GTB)",
    published: false,
    description: [
        "J'ai eu la chance de réaliser mon stage chez Dmoti, une entreprise spécialisée dans la Gestion Technique des Batiments (GTB).",
        "Le besoin de départ était simple: mettre à jour le site web existant de l'entreprise et y ajouter des nouvelles fonctionalités.",
        "Le stage s'est décomposé en deux projets menés de bout en bout, avec des points d'étape réguliers auprès de la gérante.",
        "",
        "**Refonte du site vitrine**, resté figé depuis 2019 sous WordPress, avec des scores Lighthouse dégradés par l'accumulation de plugins. J'ai développé un thème sur mesure avec Sage 11 (moteur Blade, build Vite) et une vingtaine de blocs Gutenberg permettant à l'équipe de modifier le contenu en autonomie, ainsi qu'un plugin dédié (architecture orientée objet, injection de dépendances PHP-DI, templates Twig) intégrant un chatbot IA.",
        "",
        [
            "- Chatbot branché sur les API OpenAI et Anthropic, réponses en streaming via SSE (contournement du blocage natif de WordPress sur ce type de flux) et quatre outils dédiés (`get_user`, `get_categories`, `get_qna_steps`, `get_qna_steps_by_category`) pour identifier le demandeur et cibler les données pertinentes",
            "- Base de connaissances RAG entièrement custom, alimentée par des outils maison interrogeant Monday.com plutôt qu'une base vectorielle séparée",
            "- Scores Lighthouse de 98 à 100/100 en production",
        ].join("\n"),
        "",
        "**Relié**, une application métier développée de zéro en TypeScript pour remplacer un logiciel existant : API NestJS avec Kysely/PostgreSQL, client Vue.js/Vuetify et types partagés via un monorepo.",
        "",
        [
            "- Modélisation des installations domotiques (lieux, tableaux électriques, câblage KNX/DALI)",
            "- Génération automatique de fiches de câblage au format PDF via Gotenberg",
            "- Droits d'accès par JWT et RBAC à deux niveaux",
            "- Conteneurisé avec Docker, construction des images automatisée via un pipeline CI/CD sur Forgejo",
        ].join("\n"),
        "",
        "Ces deux projets ont été accompagnés de documentation de maintenance et d'utilisation, condition selon moi essentielle pour que Dmoti puisse exploiter ces outils en autonomie.",
        "En parallèle, j'ai participé à une intervention terrain chez un client (audit de l'architecture réseau) et à une conférence sur le bâtiment connecté à Aix-en-Provence, deux expériences qui ont complété la dimension technique du stage par une vision plus concrète du métier.",
    ],
    dates: {
        start: createDate({ day: 13, month: MonthEnum.April, year: 2026 }),
        end: createDate({ day: 3, month: MonthEnum.July, year: 2026 }),
    },
    knowledges: [
        TechnologiesEnum.PHP,
        TechnologiesEnum.VUEJS,
        TechnologiesEnum.NESTJS,
        TechnologiesEnum.POSTGRESQL,
        TechnologiesEnum.TYPESCRIPT,
        TechnologiesEnum.GIT,
        TechnologiesEnum.DOCKER,
        TechnologiesEnum.WORDPRESS,
        TechnologiesEnum.MONDAY,
        TechnologiesEnum.OVH,
        MethodsEnum.AGILE,
        MethodsEnum.SELF_LEARNING,
    ],
    newFormat: true,
    type: ProjectTypeEnum.PROFESSIONAL,
} satisfies IIncompleteProject
