import { MonthEnum, createDate } from "../date"
import technologies from "../technologies"
import types from "../types"
import type { IIncompleteProject } from "../types"

export default {
    title: "Stage chez Dmoti",
    subtitle:
        "Stage de développement web chez Dmoti, une entreprise spécialisée dans la Gestion Technique des Batiments (GTB)",
    published: true,
    description: [
        "J'ai eu la chance de réaliser mon stage chez Dmoti, une entreprise spécialisée dans la Gestion Technique des Batiments (GTB).",
        "Le besoin de départ était simple: mettre à jour le site web existant de l'entreprise et y ajouter des nouvelles fonctionalités.",
        "Le stage s'est décomposé en deux projets menés de bout en bout, avec des points d'étape réguliers auprès de la gérante.",
        "",
        "**Refonte du site vitrine**, resté figé depuis 2019 sous WordPress (constructeur SiteOrigin) et avec des scores Lighthouse dégradés par l'accumulation de plugins. L'approche initiale envisageait un site statique Vue.js séparé de WordPress, mais elle a été abandonnée au profit d'un thème WordPress natif : l'équipe Dmoti doit pouvoir modifier textes, images et projets en autonomie, sans dépendre d'un développeur ni d'un hébergement supplémentaire.",
        "J'ai développé un thème sur mesure avec Sage 11 (moteur Blade, build Vite) et une vingtaine de blocs Gutenberg (hero, grille de services, carrousel de projets...) permettant à l'équipe de modifier le contenu en autonomie, ainsi qu'un plugin dédié (architecture orientée objet, injection de dépendances PHP-DI conforme PSR-11, découverte automatique des routes via attributs PHP 8 façon Symfony, templates Twig) intégrant un chatbot IA venu remplacer un plugin tiers limité (AI Engine, GPT-3.5).",
        "",
        [
            "- Chatbot branché sur les API OpenAI (GPT-4o) et Anthropic, réponses en streaming via SSE (contournement du blocage natif de WordPress sur ce type de flux) et quatre outils dédiés (`get_user`, `get_categories`, `get_qna_steps`, `get_qna_steps_by_category`) pour identifier le demandeur et cibler les données pertinentes",
            "- Base de connaissances RAG entièrement custom, alimentée par des outils maison interrogeant l'API GraphQL de Monday.com (synchronisation toutes les 50 minutes, cache local à TTL configurable conservé en cas d'indisponibilité du service) plutôt qu'une base vectorielle séparée",
            "- Scores Lighthouse de 98/100 en performance et 100/100 en accessibilité, bonnes pratiques et SEO en production, pour un poids total JS+CSS de 13,5 kB",
        ].join("\n"),
        "",
        "**Relié**, une application métier pour remplacer Izytik, un logiciel figé ne couvrant plus les besoins de l'entreprise. J'en ai assuré seul l'architecture, la modélisation de la base de données et le développement de bout en bout, en TypeScript, structurée en monorepo avec des contrats partagés entre l'API NestJS (Kysely/PostgreSQL) et le client Vue.js/Vuetify garantissant qu'une modification de structure est détectée à la compilation avant même le déploiement.",
        "",
        [
            "- Modélisation fidèle d'un chantier domotique : hiérarchie des lieux (site, bâtiment, étage, pièce), tableaux électriques et leurs appareils, câblage logique reliant chaque sortie physique (KNX, DALI...) à la fonction qu'elle commande",
            "- Attributs spécifiques à chaque type d'équipement stockés en JSONB plutôt qu'en colonnes figées, pour rester adaptable sans migration de schéma",
            "- Trois validations métier automatiques à la création d'un câblage (mêmes projet, types de sortie compatibles, absence de doublon) pour fiabiliser les fiches terrain",
            "- Génération automatique de fiches de câblage au format PDF via Gotenberg, préféré à une solution Puppeteer pour éviter d'embarquer un Chromium complet dans l'image Docker",
            "- Système de points de sauvegarde permettant de restaurer un projet à un état antérieur ou de le dupliquer comme base d'un nouveau chantier",
            "- Droits d'accès par JWT et RBAC à deux niveaux (administrateur/membre au niveau organisation, éditeur/lecteur au niveau projet)",
            "- Conteneurisé avec Docker, construction des images automatisée via un pipeline CI/CD sur Forgejo, en vue d'une migration vers un serveur propre à Dmoti",
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
        technologies.languages.PHP,
        technologies.languages.TYPESCRIPT,
        technologies.languages.SQL,
        technologies.frameworks.VUEJS,
        technologies.frameworks.NESTJS,
        technologies.databases.POSTGRESQL,
        technologies.tools.GIT,
        technologies.tools.DOCKER,
        technologies.services.WORDPRESS,
        technologies.services.MONDAY,
        technologies.services.OVH,
        types.methods.AGILE,
        types.methods.SELF_LEARNING,
    ],
    newFormat: true,
    type: types.projectTypes.PROFESSIONAL,
} satisfies IIncompleteProject
