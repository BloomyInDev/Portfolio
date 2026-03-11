<!-- Cette page a été intégralement générée avec Github Copilot et Claude,
     car j'avais pas envie de faire ce devoir
    -->
<script setup lang="ts">
import { projects } from "@/script/projects"
import { usePageHead } from "@/script/routing"

type LearningItem = {
    code: string
    label: string
}

type ProjectEvidence = {
    title: string
    period: string
    projectId?: string
    justification: string[]
}

type CompetenceLevel = {
    title: string
    learnings: LearningItem[]
    projects: ProjectEvidence[]
}

type CompetenceSection = {
    code: "C1" | "C2" | "C3" | "C4" | "C5" | "C6"
    title: string
    summary: string
    levels: CompetenceLevel[]
}

const accentByCompetence: Record<CompetenceSection["code"], string> = {
    C1: "#7eb8f5",
    C2: "#fb923c",
    C3: "#f5a07e",
    C4: "#e8c86e",
    C5: "#a78bfa",
    C6: "#67e8a0",
}

const validProjectIds = new Set(projects.map((project) => project.id))

const projectLinkFromId = (projectId?: string) => {
    if (!projectId) return null
    if (!validProjectIds.has(projectId)) return null
    return `/project/${projectId}`
}

const primaryCompetences: CompetenceSection[] = [
    {
        code: "C3",
        title: "Administrer des systèmes informatiques communicants complexes",
        summary:
            "Installer, configurer, déployer et maintenir des infrastructures et services en sécurisant les données manipulées.",
        levels: [
            {
                title: "Niveau 1 - Installer et configurer un poste de travail",
                learnings: [
                    {
                        code: "AC 1.1",
                        label: "Identifier les différents composants (matériels et logiciels) d'un système numérique",
                    },
                    {
                        code: "AC 1.2",
                        label: "Utiliser les fonctionnalités de base d'un système multitâches / multiutilisateurs",
                    },
                    {
                        code: "AC 1.3",
                        label: "Installer et configurer un système d'exploitation et des outils de développement",
                    },
                    {
                        code: "AC 1.4",
                        label: "Configurer un poste de travail dans un réseau d'entreprise",
                    },
                ],
                projects: [
                    {
                        title: "Vox Populi",
                        period: "septembre 2025 → janvier 2026",
                        projectId: "vox-populi",
                        justification: [
                            "Projet d'équipe ayant nécessité un environnement de développement commun et reproductible.",
                            "Installation/configuration d'un serveur PHP (Apache), d'une base MySQL et partage de configuration via Git pour garantir des postes homogènes (AC 1.3).",
                            "Gestion des accès GitLab et coordination des outils (Trello, SGBD) relevant d'une configuration de travail collaboratif (AC 1.4).",
                        ],
                    },
                    {
                        title: "Homelab",
                        period: "depuis décembre 2024",
                        projectId: "homelab",
                        justification: [
                            "Identification et compréhension des composants matériels de trois machines (i3 7100, i7 3537U, Pentium N3540) et installation de systèmes adaptés : Debian 13 pour le serveur principal, Arch Linux pour la machine de test (AC 1.1, AC 1.2, AC 1.3).",
                            "Gestion du réseau domestique avec exposition de services vers l'extérieur via un reverse proxy Traefik, constituant une configuration d'un environnement en réseau réel (AC 1.4).",
                        ],
                    },
                ],
            },
            {
                title: "Niveau 2 - Déployer des services dans une architecture réseau",
                learnings: [
                    {
                        code: "AC 2.1",
                        label: "Concevoir et développer des applications communicantes",
                    },
                    {
                        code: "AC 2.2",
                        label: "Utiliser des serveurs et des services réseaux virtualisés",
                    },
                    {
                        code: "AC 2.3",
                        label: "Sécuriser les services et données d'un système",
                    },
                ],
                projects: [
                    {
                        title: "Vox Populi",
                        period: "septembre 2025 → janvier 2026",
                        projectId: "vox-populi",
                        justification: [
                            "Application web client-serveur où le backend PHP gère les échanges HTTP, traite les données saisies et interroge MySQL (AC 2.1).",
                            "Gestion des rôles (administrateur, organisateur, participant) et contrôles d'accès applicatifs pour protéger les données sensibles (AC 2.3).",
                        ],
                    },
                    {
                        title: "Nuit de l'Info 2025",
                        period: "4-5 décembre 2025",
                        projectId: "nuit-de-linfo-2025",
                        justification: [
                            "Déploiement en production du site sur ndi2025.bastienluben.dev sous forte contrainte de temps.",
                            "Mise en service serveur web, configuration du domaine et publication de l'application dans un environnement public (AC 2.2).",
                        ],
                    },
                    {
                        title: "Homelab",
                        period: "depuis décembre 2024",
                        projectId: "homelab",
                        justification: [
                            "Architecture réseau réelle : reverse proxy Traefik, Authentik pour l'authentification centralisée, quarantaine de conteneurs Docker sur le serveur principal (AC 2.2).",
                            "Forge git (Forgejo) avec intégration continue, stacks Nextcloud et autres applications communicantes conçues et déployées manuellement (AC 2.1).",
                            "Mise en place d'Authentik, gestion des certificats TLS et cloisonnement des conteneurs répondant directement aux exigences de sécurisation des services (AC 2.3).",
                        ],
                    },
                ],
            },
        ],
    },
    {
        code: "C5",
        title: "Conduire un projet",
        summary:
            "Analyser les besoins, cadrer la faisabilité et piloter l'avancement d'un projet avec des méthodes adaptées.",
        levels: [
            {
                title: "Niveau 1 - Identifier les besoins métiers des clients et des utilisateurs",
                learnings: [
                    {
                        code: "AC 1.1",
                        label: "Appréhender les besoins du client et de l'utilisateur",
                    },
                    { code: "AC 1.2", label: "Mettre en place les outils de gestion de projet" },
                    {
                        code: "AC 1.3",
                        label: "Identifier les acteurs et les différentes phases d'un cycle de développement",
                    },
                ],
                projects: [
                    {
                        title: "Vox Populi",
                        period: "septembre 2025 → janvier 2026",
                        projectId: "vox-populi",
                        justification: [
                            "Analyse de besoins pour plusieurs profils d'utilisateurs (organisateurs, participants, administrateurs) pour définir les fonctionnalités cibles (AC 1.1).",
                            "Utilisation de Trello pour le backlog et de GitLab pour le versionnement, avec un cycle agile en sprints réguliers (AC 1.2, AC 1.3).",
                        ],
                    },
                    {
                        title: "SAÉ Pokémon",
                        period: "mars → juin 2025",
                        projectId: "sae-pokemon",
                        justification: [
                            "Ce projet s'est appuyé sur un diagramme de classes fourni comme cahier des charges. L'enjeu était de comprendre ce référentiel UML, d'en déduire les fonctionnalités (règles du jeu, gestion des cartes) et d'organiser le travail en conséquence (AC 1.1, AC 1.3).",
                            "Ce format m'a familiarisé avec la lecture d'une spécification technique et sa traduction en tâches de développement.",
                            "Étant un projet de 1ère année, il n'est cité que pour avoir un point de départ afin d'observer la progression vers le niveau 1.",
                        ],
                    },
                ],
            },
            {
                title: "Niveau 2 - Appliquer une démarche de suivi de projet",
                learnings: [
                    {
                        code: "AC 2.1",
                        label: "Identifier les processus présents dans une organisation en vue d'améliorer les SI",
                    },
                    {
                        code: "AC 2.2",
                        label: "Formaliser les besoins du client et de l'utilisateur",
                    },
                    {
                        code: "AC 2.3",
                        label: "Identifier les critères de faisabilité d'un projet informatique",
                    },
                    {
                        code: "AC 2.4",
                        label: "Définir et mettre en œuvre une démarche de suivi de projet",
                    },
                ],
                projects: [
                    {
                        title: "Vox Populi",
                        period: "septembre 2025 → janvier 2026",
                        projectId: "vox-populi",
                        justification: [
                            "Formalisation des besoins via la modélisation Entité-Association et la définition de parcours selon les rôles (AC 2.2).",
                            "Suivi appuyé sur Trello et GitLab (branches, merge requests) pour mesurer l'avancement et ajuster les priorités (AC 2.4).",
                        ],
                    },
                    {
                        title: "CodeGameJam 2025",
                        period: "23-25 janvier 2025",
                        projectId: "codegamejam-2025---9eme-edition",
                        justification: [
                            "Projet 3D trop ambitieux au regard de la contrainte de 30h, révélant les limites de faisabilité.",
                            "Apprentissage critique sur la priorisation et l'estimation réaliste d'un périmètre (AC 2.3).",
                        ],
                    },
                    {
                        title: "CodeGameJam 2026",
                        period: "15-17 janvier 2026",
                        projectId: "codegamejam-2026---10eme-edition",
                        justification: [
                            "Mise en pratique directe des leçons de 2025 avec un cadrage plus rigoureux du périmètre dès le lancement (AC 2.3).",
                            "Résultat livrable jouable et finalisé validant la progression en suivi de projet (AC 2.4).",
                        ],
                    },
                ],
            },
        ],
    },
]

const complementaryCompetences: CompetenceSection[] = [
    {
        code: "C1",
        title: "Réaliser un développement d'application",
        summary:
            "Concevoir, coder, tester et intégrer une solution complète à partir d'exigences, en appliquant qualité logicielle et ergonomie.",
        levels: [
            {
                title: "Niveau 2 - Partir des exigences et aller jusqu'à une application complète",
                learnings: [
                    {
                        code: "AC 2.1",
                        label: "Élaborer et implémenter les spécifications fonctionnelles et non fonctionnelles",
                    },
                    {
                        code: "AC 2.2",
                        label: "Appliquer des principes d'accessibilité et d'ergonomie",
                    },
                    {
                        code: "AC 2.3",
                        label: "Adopter de bonnes pratiques de conception et de programmation",
                    },
                    {
                        code: "AC 2.4",
                        label: "Vérifier et valider la qualité de l'application par les tests",
                    },
                ],
                projects: [
                    {
                        title: "Vox Populi",
                        period: "septembre 2025 → janvier 2026",
                        projectId: "vox-populi",
                        justification: [
                            "De l'expression de besoin à l'implémentation complète : modèle Entité-Association, architecture MVC, routes et contrôleurs (AC 2.1).",
                            "Séparation stricte des responsabilités côté backend et interface lisible pour un public non technique (AC 2.2, AC 2.3).",
                        ],
                    },
                    {
                        title: "Portfolio personnel",
                        period: "depuis septembre 2025",
                        projectId: "portfolio-personnel",
                        justification: [
                            "Projet conçu de A à Z sans contrainte académique : choix de Vue.js comme framework en auto-apprentissage, démarche de montée en compétence délibérée (AC 2.3).",
                            "Travail sur le SEO - structuration des balises, organisation sémantique du contenu - relevant directement des principes d'accessibilité et de visibilité (AC 2.2).",
                            "Définition des fonctionnalités souhaitées (présentation des projets, filtres, navigation) avant leur implémentation comme forme légère de spécification fonctionnelle (AC 2.1).",
                        ],
                    },
                    {
                        title: "Nuit de l'Info 2025",
                        period: "4-5 décembre 2025",
                        projectId: "nuit-de-linfo-2025",
                        justification: [
                            "Usage de TypeScript sous contrainte de temps pour maintenir des bonnes pratiques de robustesse (AC 2.3).",
                            "Développement et test fonctionnel du mini-jeu Snake avant intégration au site (AC 2.4).",
                            "Configuration d'un pipeline CI/CD automatisant le déploiement sur GitHub Pages, s'inscrivant dans une démarche de validation continue (AC 2.4).",
                        ],
                    },
                ],
            },
        ],
    },
    {
        code: "C2",
        title: "Optimiser des applications",
        summary:
            "Choisir les structures de données, algorithmes et compromis techniques adaptés aux contraintes de performance, sécurité et impact.",
        levels: [
            {
                title: "Niveau 2 - Sélectionner les algorithmes adéquats pour répondre à un problème donné",
                learnings: [
                    {
                        code: "AC 2.1",
                        label: "Choisir des structures de données complexes adaptées au problème",
                    },
                    {
                        code: "AC 2.2",
                        label: "Utiliser des techniques algorithmiques adaptées pour des problèmes complexes",
                    },
                    {
                        code: "AC 2.3",
                        label: "Comprendre les enjeux et moyens de sécurisation des données et du code",
                    },
                    {
                        code: "AC 2.4",
                        label: "Évaluer l'impact environnemental et sociétal des solutions proposées",
                    },
                ],
                projects: [
                    {
                        title: "CodeGameJam 2025",
                        period: "23-25 janvier 2025",
                        projectId: "codegamejam-2025---9eme-edition",
                        justification: [
                            "Confrontation directe à des contraintes de rendu temps réel, collisions et caméra dans un contexte 3D.",
                            "La difficulté à finaliser en 30h a mis en lumière la nécessité d'anticiper les coûts algorithmiques et architecturaux (AC 2.1, AC 2.2).",
                        ],
                    },
                    {
                        title: "CodeGameJam 2026",
                        period: "15-17 janvier 2026",
                        projectId: "codegamejam-2026---10eme-edition",
                        justification: [
                            "Conception intégrant dès le départ les contraintes de performance : niveaux aléatoires, densité variable d'ennemis et bombes, interactions réactives.",
                            "Utilisation ciblée des primitives libGDX (sprites, événements) et livraison d'un jeu fluide sur toute la durée de l'événement (AC 2.2).",
                        ],
                    },
                    {
                        title: "Homelab",
                        period: "depuis décembre 2024",
                        projectId: "homelab",
                        justification: [
                            "Optimisation des ressources système : faire tourner une quarantaine de conteneurs Docker sur un i3 7100 impose de choisir des images légères, de limiter les services actifs et d'anticiper les pics de charge (AC 2.1, AC 2.2).",
                            "Répartition des services sur trois machines en fonction de leurs capacités, illustrant une démarche de dimensionnement raisonnée.",
                            "Le recours à du matériel de récupération soulève la question de l'impact environnemental et sociétal des choix d'infrastructure (AC 2.4).",
                        ],
                    },
                ],
            },
        ],
    },
    {
        code: "C4",
        title: "Gérer des données de l'information",
        summary:
            "Concevoir, sécuriser et restituer les données de manière cohérente, performante et conforme aux enjeux de confidentialité.",
        levels: [
            {
                title: "Niveau 2 - Optimiser une base de données, interagir avec une application et mettre en œuvre la sécurité",
                learnings: [
                    { code: "AC 2.1", label: "Optimiser les modèles de données de l'entreprise" },
                    {
                        code: "AC 2.2",
                        label: "Assurer la confidentialité des données (intégrité et sécurité)",
                    },
                    {
                        code: "AC 2.3",
                        label: "Organiser la restitution de données à travers la programmation et la visualisation",
                    },
                    { code: "AC 2.4", label: "Manipuler des données hétérogènes" },
                ],
                projects: [
                    {
                        title: "Vox Populi",
                        period: "septembre 2025 → janvier 2026",
                        projectId: "vox-populi",
                        justification: [
                            "Compétence mobilisée de bout en bout : modèle Entité-Association, normalisation, indexation et vues SQL pour les calculs de vote majoritaire (AC 2.1).",
                            "Protection des données utilisateurs via mots de passe hashés et contrôles d'accès par rôle (AC 2.2), puis restitution claire des résultats de consultation dans l'interface (AC 2.3).",
                        ],
                    },
                ],
            },
        ],
    },
    {
        code: "C6",
        title: "Collaborer au sein d'une équipe informatique",
        summary:
            "Développer communication, coordination et positionnement professionnel dans des équipes de tailles et contextes variés.",
        levels: [
            {
                title: "Niveau 1 - Identifier ses aptitudes pour travailler dans une équipe",
                learnings: [
                    { code: "AC 1.1", label: "Appréhender l'écosystème numérique" },
                    {
                        code: "AC 1.2",
                        label: "Découvrir les aptitudes requises selon les différents secteurs informatiques",
                    },
                    {
                        code: "AC 1.3",
                        label: "Identifier les statuts, les fonctions et les rôles de chaque membre d'une équipe pluridisciplinaire",
                    },
                    {
                        code: "AC 1.4",
                        label: "Acquérir les compétences interpersonnelles pour travailler en équipe",
                    },
                ],
                projects: [
                    {
                        title: "SAÉ Pokémon",
                        period: "mars → juin 2025",
                        projectId: "sae-pokemon",
                        justification: [
                            "Travailler en binôme sur ce projet m'a permis d'identifier mes points forts (logique métier, architecture objet) et ceux de mon binôme, et d'organiser la répartition en conséquence (AC 1.3).",
                            "Apprentissage de la communication sur le code de l'autre, de la discussion des choix de conception et de l'arbitrage des désaccords techniques (AC 1.4).",
                            "Étant un projet de 1ère année, il n'est cité que pour avoir un point de départ afin d'observer la progression vers le niveau 1.",
                        ],
                    },
                    {
                        title: "CodeGameJam 2025",
                        period: "23-25 janvier 2025",
                        projectId: "codegamejam-2025---9eme-edition",
                        justification: [
                            "Première participation à une game jam en équipe de quatre, exposé à la réalité du travail collaboratif sous forte contrainte temporelle.",
                            "Observation de la répartition naturelle des rôles (graphisme, game design, développement moteur, intégration) et prise de conscience des aptitudes spécifiques de chaque profil (AC 1.2, AC 1.3, AC 1.4).",
                        ],
                    },
                ],
            },
            {
                title: "Niveau 2 - Situer son rôle et ses missions au sein d'une équipe informatique",
                learnings: [
                    {
                        code: "AC 2.1",
                        label: "Comprendre la diversité, la structure et la dimension de l'informatique dans une organisation",
                    },
                    {
                        code: "AC 2.2",
                        label: "Appliquer les préceptes du travail en équipe via des outils dédiés",
                    },
                    { code: "AC 2.3", label: "Rendre compte de son activité professionnelle" },
                ],
                projects: [
                    {
                        title: "Vox Populi",
                        period: "septembre 2025 → janvier 2026",
                        projectId: "vox-populi",
                        justification: [
                            "Rôle principal de développeur backend (PHP, MVC, base SQL) permettant de situer précisément la contribution individuelle (AC 2.1).",
                            "Travail collaboratif structuré avec GitLab (branches/merge requests) et Trello (assignation/suivi), complété par des livrables intermédiaires (AC 2.2, AC 2.3).",
                        ],
                    },
                    {
                        title: "Nuit de l'Info 2025",
                        period: "4-5 décembre 2025",
                        projectId: "nuit-de-linfo-2025",
                        justification: [
                            "Prise en charge autonome du mini-jeu Snake dans un sprint nocturne, avec intégration fluide au projet global.",
                            "Le site final déployé publiquement matérialise le compte rendu de l'activité (AC 2.1, AC 2.2, AC 2.3).",
                        ],
                    },
                    {
                        title: "CodeGameJam 2026",
                        period: "15-17 janvier 2026",
                        projectId: "codegamejam-2026---10eme-edition",
                        justification: [
                            "Coordination en équipe de six avec rôles mieux anticipés grâce au retour d'expérience de l'édition précédente.",
                            "Livraison d'un jeu cohérent dans les temps, témoin d'une communication efficace et d'une bonne intégration collective (AC 2.2, AC 2.3).",
                        ],
                    },
                ],
            },
        ],
    },
]

const primarySummaryRows = [
    {
        level: "Niveau 1",
        c3: "Vox Populi · Homelab",
        c5: "Vox Populi · SAÉ Pokémon",
    },
    {
        level: "Niveau 2",
        c3: "Vox Populi · Nuit de l'Info 2025 · Homelab",
        c5: "Vox Populi · CGJ 2025 · CGJ 2026",
    },
]

const complementarySummaryRows = [
    {
        level: "Niveau 1",
        c1: "SAÉ Pokémon · CGJ 2025",
        c2: "CGJ 2025",
        c4: "Vox Populi",
        c6: "SAÉ Pokémon · CGJ 2025",
    },
    {
        level: "Niveau 2",
        c1: "Vox Populi · Portfolio · Nuit de l'Info 2025",
        c2: "CGJ 2025 · CGJ 2026 · Homelab",
        c4: "Vox Populi",
        c6: "Vox Populi · Nuit de l'Info 2025 · CGJ 2026",
    },
]

const synthesisNotes = [
    {
        title: "Note - SAÉ Pokémon",
        content:
            "Étant un projet de 1ère année, il n'est cité que pour avoir un point de départ afin d'observer la progression vers le niveau 1.",
    },
    {
        title: "Note - Vox Populi",
        content:
            "Projet pivot du portfolio, mobilisant les six compétences au niveau 2. Sa durée semestrielle, son équipe de quatre personnes et son livrable complet (web + BDD + rôles + déploiement) en font la référence principale.",
    },
    {
        title: "Note - CodeGameJam 2025 & 2026",
        content:
            "Ce duo rend visible la progression par itération : d'un cadrage initial trop ambitieux à une planification plus réaliste menant à un résultat final jouable et cohérent.",
    },
    {
        title: "Note - Portfolio personnel",
        content:
            "Ce projet illustre une démarche de développement personnel et autonome que les projets académiques ne montrent pas. Il complète utilement C1 en prouvant que les bonnes pratiques (typage TypeScript, SEO, accessibilité) sont intégrées y compris hors contexte contraint.",
    },
    {
        title: "Note - Homelab",
        content:
            "Ce projet documente C3 de façon bien plus directe et approfondie que les projets académiques. Il apporte également une dimension concrète à C2 (optimisation des ressources) absente des projets de jeux vidéo. Il couvre configuration système, déploiement de services et gestion de la sécurité - en continu depuis décembre 2024.",
    },
    {
        title: "Note - C4 sous-représentée",
        content:
            "La compétence C4 est principalement illustrée par Vox Populi. Le homelab implique des bases de données de développement (bots Discord, projets clients) mais de façon trop marginale pour constituer une preuve solide. Le projet de semestre 4 permettera de compléter cette compétence",
    },
]

const sectionOrder = {
    primary: ["C3", "C5"],
    complementary: ["C1", "C2", "C4", "C6"],
}

const allCompetenceCodes = [
    ...sectionOrder.primary,
    ...sectionOrder.complementary,
] as CompetenceSection["code"][]

usePageHead()
</script>

<template>
    <div id="ppp-page">
        <section class="hero-card">
            <p class="hero-badge">Portfolio d'apprentissage - BUT Informatique Parcours A</p>
            <h2>Page PPP - Compétences de fin de deuxième année</h2>
            <p>
                Ce dossier met en regard les projets réalisés avec le référentiel BUT Informatique
                au niveau 2, en distinguant les compétences finalisées dans le parcours A (C3, C5)
                de celles poursuivies en niveau 3 (C1, C2, C4, C6).
            </p>
        </section>

        <section class="why-card">
            <h3>Pourquoi distinguer deux groupes de compétences ?</h3>
            <div class="why-grid">
                <article class="why-block">
                    <h4>Compétences s'arrêtant au en 2ème année</h4>
                    <ul>
                        <li>
                            <strong>C3 - Administrer</strong> : le niveau 3 est réservé au parcours
                            B (DACS).
                        </li>
                        <li>
                            <strong>C5 - Conduire</strong> : le niveau 3 est réservé aux parcours C
                            (AGED) et D (IAMSI).
                        </li>
                    </ul>
                </article>
                <article class="why-block muted">
                    <h4>Compétences continuant après la 2ème année</h4>
                    <ul>
                        <li>
                            <strong>C1 - Réaliser</strong> : compétence principale du parcours A
                        </li>
                        <li><strong>C2 - Optimiser</strong> : approfondie dans le parcours A.</li>
                        <li><strong>C4 - Gérer des données</strong> : année 2 en commun</li>
                        <li>
                            <strong>C6 - Collaborer</strong> : le niveau 3 (Manager une équipe
                            informatique) est commun à tous les parcours - se poursuit en 3ème
                            année.
                        </li>
                    </ul>
                </article>
            </div>
        </section>

        <section class="group-heading group-primary-heading">
            <p>Partie principale</p>
            <h3>Compétences finalisées en parcours A (C3, C5)</h3>
        </section>

        <section class="competence-group">
            <article
                v-for="competence in primaryCompetences"
                :key="competence.code"
                class="competence-card"
                :style="{ '--competence-accent': accentByCompetence[competence.code] }"
            >
                <header class="competence-header">
                    <span class="competence-chip">{{ competence.code }}</span>
                    <h4>{{ competence.title }}</h4>
                </header>
                <p class="competence-summary">{{ competence.summary }}</p>

                <div v-for="level in competence.levels" :key="level.title" class="level-card">
                    <h5>{{ level.title }}</h5>
                    <div class="table-wrapper">
                        <table class="ac-table">
                            <thead>
                                <tr>
                                    <th>Apprentissage critique</th>
                                    <th>Libellé</th>
                                </tr>
                            </thead>
                            <tbody>
                                <tr v-for="learning in level.learnings" :key="learning.code">
                                    <td>{{ learning.code }}</td>
                                    <td>{{ learning.label }}</td>
                                </tr>
                            </tbody>
                        </table>
                    </div>

                    <div class="project-list">
                        <article
                            v-for="project in level.projects"
                            :key="`${level.title}-${project.title}`"
                            class="project-card"
                        >
                            <h6>
                                <RouterLink
                                    v-if="projectLinkFromId(project.projectId)"
                                    :to="projectLinkFromId(project.projectId)!"
                                    class="project-link"
                                    :title="`Voir le projet ${project.title}`"
                                >
                                    {{ project.title }}
                                </RouterLink>
                                <span v-else>{{ project.title }}</span>
                                <small>({{ project.period }})</small>
                            </h6>
                            <p
                                v-for="(paragraph, index) in project.justification"
                                :key="`${project.title}-${index}`"
                            >
                                {{ paragraph }}
                            </p>
                        </article>
                    </div>
                </div>
            </article>
        </section>

        <section class="group-heading group-secondary-heading">
            <p>Partie complémentaire</p>
            <h3>Compétences en progression vers le niveau 3 (C1, C2, C4, C6)</h3>
        </section>

        <section class="competence-group secondary-group">
            <article
                v-for="competence in complementaryCompetences"
                :key="competence.code"
                class="competence-card"
                :style="{ '--competence-accent': accentByCompetence[competence.code] }"
            >
                <header class="competence-header">
                    <span class="competence-chip">{{ competence.code }}</span>
                    <h4>{{ competence.title }}</h4>
                </header>
                <p class="competence-summary">{{ competence.summary }}</p>

                <div v-for="level in competence.levels" :key="level.title" class="level-card">
                    <h5>{{ level.title }}</h5>
                    <div class="table-wrapper">
                        <table class="ac-table">
                            <thead>
                                <tr>
                                    <th>Apprentissage critique</th>
                                    <th>Libellé</th>
                                </tr>
                            </thead>
                            <tbody>
                                <tr v-for="learning in level.learnings" :key="learning.code">
                                    <td>{{ learning.code }}</td>
                                    <td>{{ learning.label }}</td>
                                </tr>
                            </tbody>
                        </table>
                    </div>

                    <div class="project-list">
                        <article
                            v-for="project in level.projects"
                            :key="`${level.title}-${project.title}`"
                            class="project-card"
                        >
                            <h6>
                                <RouterLink
                                    v-if="projectLinkFromId(project.projectId)"
                                    :to="projectLinkFromId(project.projectId)!"
                                    class="project-link"
                                    :title="`Voir le projet ${project.title}`"
                                >
                                    {{ project.title }}
                                </RouterLink>
                                <span v-else>{{ project.title }}</span>
                                <small>({{ project.period }})</small>
                            </h6>
                            <p
                                v-for="(paragraph, index) in project.justification"
                                :key="`${project.title}-${index}`"
                            >
                                {{ paragraph }}
                            </p>
                        </article>
                    </div>
                </div>
            </article>
        </section>

        <section class="synthesis-card">
            <h3>Synthèse globale</h3>
            <div class="summary-block">
                <h4>Compétences s'arrêtant au niveau 2 (partie principale)</h4>
                <div class="table-wrapper">
                    <table class="ac-table summary-table">
                        <thead>
                            <tr>
                                <th></th>
                                <th>C3 - Administrer</th>
                                <th>C5 - Conduire un projet</th>
                            </tr>
                        </thead>
                        <tbody>
                            <tr v-for="row in primarySummaryRows" :key="row.level">
                                <td>{{ row.level }}</td>
                                <td>{{ row.c3 }}</td>
                                <td>{{ row.c5 }}</td>
                            </tr>
                        </tbody>
                    </table>
                </div>
            </div>

            <div class="summary-block">
                <h4>Compétences continuant au niveau 3 (partie complémentaire)</h4>
                <div class="table-wrapper">
                    <table class="ac-table summary-table">
                        <thead>
                            <tr>
                                <th></th>
                                <th>C1 - Réaliser</th>
                                <th>C2 - Optimiser</th>
                                <th>C4 - Gérer les données</th>
                                <th>C6 - Collaborer</th>
                            </tr>
                        </thead>
                        <tbody>
                            <tr v-for="row in complementarySummaryRows" :key="row.level">
                                <td>{{ row.level }}</td>
                                <td>{{ row.c1 }}</td>
                                <td>{{ row.c2 }}</td>
                                <td>{{ row.c4 }}</td>
                                <td>{{ row.c6 }}</td>
                            </tr>
                        </tbody>
                    </table>
                </div>
            </div>

            <article v-for="note in synthesisNotes" :key="note.title" class="note-card">
                <h4>{{ note.title }}</h4>
                <p>{{ note.content }}</p>
            </article>

            <div class="legend">
                <h4>Légende des accents compétences</h4>
                <ul>
                    <li v-for="code in allCompetenceCodes" :key="code">
                        <span
                            class="legend-dot"
                            :style="{ backgroundColor: accentByCompetence[code] }"
                        />
                        {{ code }}
                    </li>
                </ul>
            </div>
        </section>
    </div>
</template>

<style scoped>
#ppp-page {
    width: min(78rem, 96%);
    margin: 1rem auto 2rem;
    display: flex;
    flex-direction: column;
    gap: 1.25rem;
}

.hero-card,
.why-card,
.synthesis-card,
.competence-card {
    background-color: #00275a80;
    border-radius: 1.5rem;
    padding: 1.25rem;
}

.hero-badge {
    width: fit-content;
    margin: 0;
    padding: 0.25rem 0.65rem;
    border-radius: 999px;
    background-color: #00bbdc2a;
    border: 1px solid #00bbdc95;
    font-size: 0.85rem;
}

.hero-card h2 {
    margin: 0.75rem 0;
}

.hero-card p,
.why-card p,
.synthesis-card p {
    line-height: 1.55;
}

.why-grid {
    display: grid;
    grid-template-columns: repeat(2, minmax(0, 1fr));
    gap: 1rem;
}

.why-block {
    background-color: #ffffff0f;
    border-radius: 1rem;
    padding: 0.9rem;
}

.why-block.muted {
    opacity: 0.9;
}

.group-heading {
    border-radius: 1rem;
    padding: 0.85rem 1.1rem;
}

.group-heading p {
    margin: 0;
    text-transform: uppercase;
    letter-spacing: 0.05em;
    font-size: 0.8rem;
}

.group-heading h3 {
    margin: 0.35rem 0 0;
}

.group-primary-heading {
    border-left: 4px solid #00bbdc;
    background-color: #00275a4d;
}

.group-secondary-heading {
    border-left: 4px solid #ffffff70;
    background-color: #001c4252;
    opacity: 0.95;
}

.competence-group {
    display: grid;
    grid-template-columns: 1fr;
    gap: 1rem;
}

.secondary-group {
    opacity: 0.95;
}

.competence-card {
    border: 1px solid color-mix(in srgb, var(--competence-accent), #ffffff 45%);
    box-shadow: inset 0 0 0 1px #ffffff14;
}

.competence-header {
    display: flex;
    align-items: center;
    gap: 0.6rem;
    margin-bottom: 0.5rem;
}

.competence-chip {
    display: inline-flex;
    align-items: center;
    justify-content: center;
    height: 1.8rem;
    min-width: 1.8rem;
    border-radius: 999px;
    font-size: 0.8rem;
    font-weight: 600;
    color: #091a2d;
    background-color: var(--competence-accent);
}

.competence-header h4 {
    margin: 0;
}

.competence-summary {
    margin: 0.2rem 0 1rem;
}

.level-card {
    background-color: #ffffff10;
    border-radius: 1rem;
    padding: 0.9rem;
    margin-top: 0.85rem;
}

.level-card h5 {
    margin: 0 0 0.75rem;
    font-size: 1.03rem;
}

.table-wrapper {
    overflow-x: auto;
    border-radius: 0.8rem;
}

.ac-table {
    width: 100%;
    border-collapse: collapse;
    background-color: #001f47b3;
}

.ac-table th,
.ac-table td {
    border: 1px solid #ffffff2b;
    padding: 0.65rem;
    text-align: left;
    vertical-align: top;
}

.ac-table th {
    background-color: #00bbdc24;
}

.project-list {
    display: flex;
    flex-direction: column;
    gap: 0.8rem;
    margin-top: 0.85rem;
}

.project-card {
    background-color: #001b3f80;
    border-radius: 0.8rem;
    border-left: 3px solid var(--competence-accent);
    padding: 0.75rem;
}

.project-card h6 {
    margin: 0 0 0.45rem;
    font-size: 0.95rem;
}

.project-card h6 small {
    font-weight: 400;
    margin-left: 0.4rem;
}

.project-card p {
    margin: 0.35rem 0;
    line-height: 1.45;
}

.project-link {
    color: white;
    text-decoration: none;
    border-bottom: 1px solid white;
    background-image: linear-gradient(#00bbdc, #00bbdc);
    background-position: 0% 100%;
    background-repeat: no-repeat;
    background-size: 0% 2px;
    transition: background-size 300ms ease-in-out;
}

.project-link:hover {
    background-size: 100% 2px;
}

.summary-block {
    margin-bottom: 1rem;
}

.summary-block h4 {
    margin: 0 0 0.5rem;
}

.note-card {
    background-color: #ffffff10;
    border-left: 3px solid #00bbdc;
    border-radius: 0.8rem;
    padding: 0.75rem;
    margin-top: 0.75rem;
}

.note-card h4 {
    margin: 0 0 0.45rem;
}

.note-card p {
    margin: 0;
}

.legend {
    margin-top: 1rem;
}

.legend h4 {
    margin-bottom: 0.5rem;
}

.legend ul {
    display: flex;
    flex-wrap: wrap;
    gap: 0.65rem;
    list-style: none;
    margin: 0;
    padding: 0;
}

.legend li {
    display: inline-flex;
    align-items: center;
    gap: 0.4rem;
    background-color: #ffffff14;
    border-radius: 999px;
    padding: 0.3rem 0.6rem;
    font-size: 0.85rem;
}

.legend-dot {
    width: 0.75rem;
    height: 0.75rem;
    border-radius: 999px;
    display: inline-block;
}

@media (max-width: 900px) {
    .why-grid {
        grid-template-columns: 1fr;
    }
}

@media (max-width: 700px) {
    .hero-card,
    .why-card,
    .synthesis-card,
    .competence-card {
        border-radius: 1.1rem;
        padding: 1rem;
    }

    .ac-table th,
    .ac-table td {
        font-size: 0.9rem;
        padding: 0.55rem;
    }
}

@media (max-width: 500px) {
    #ppp-page {
        width: 98%;
    }

    .hero-card h2 {
        font-size: 1.45rem;
    }

    .group-heading h3 {
        font-size: 1.1rem;
    }
}
</style>
