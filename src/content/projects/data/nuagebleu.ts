import { createDate, MonthEnum } from "../date"
import technologies from "../technologies"
import types from "../types"
import type { IIncompleteProject } from "../types"

export default {
    title: "NuageBleu",
    subtitle: "Un bot discord permettant d'écouter de la musique, simplement",
    newFormat: true,
    published: true,
    description: [
        "NuageBleu est un bot Discord permettant d'écouter de la musique en communauté, simplement.",
        "J'ai développé ce projet de février 2023 à janvier 2026, en tant que co-fondateur, gérant également une grande partie de l'infrastructure derrière le bot.",
        "",
        "Le bot a connu 3 versions successives :",
        "- **NuageBotV1** : JavaScript, DisTube (YouTube, Spotify, Deezer, SoundCloud), MongoDB & MariaDB",
        "- **NuageBotV2** : réécrite après la V1, devenue difficile à maintenir (pas de typage forcé, erreurs aléatoires imprévisibles). TypeScript, Lavalink (`magmastream`), Prisma/MySQL, génération de playlists par IA (Mistral)",
        "- **NuageBleuNext** : réécrite à son tour car certaines fonctionnalités devenaient trop compliquées à implémenter sur l'architecture de la V2. Architecture orientée objet, sharding `discord.js`, PostgreSQL, vraies playlists utilisateur, monétisation Discord native, API HTTP + WebSocket temps réel",
        "",
        "Le site web (SvelteKit + Tailwind/DaisyUI) servait de vitrine et de tableau de bord :",
        "- Connexion OAuth2 Discord, gestion de session par token en base, et un dashboard ouvrant une connexion WebSocket directe vers le bot pour afficher la musique en cours et la file d'attente en temps réel, tout en relayant les actions de contrôle (play/pause/skip/volume...) vers l'API interne du bot",
        "- Une page profil avec les statistiques d'écoute personnelles, une offre premium adossée à la monétisation Discord, et un panel d'administration (liste des serveurs, statistiques agrégées avec Chart.js, gestion des accès premium, kill switch)",
        "",
        "Le reste de l'écosystème :",
        "- Toute l'infrastructure hébergée chez WinHeberg, d'abord via une offre mutualisée (bot sur Pterodactyl + serveur web basique), puis migrée vers un VPS avec Docker et un reverse proxy Traefik (en partie calqué sur mon homelab), avec une stack Prometheus/Grafana pour la supervision",
        "- Un prototype d'architecture de cluster distribué basé sur MQTT (NuageBleuManager), pensé pour coordonner plusieurs instances du bot sur différentes machines au-delà du sharding mono-machine",
        "",
        "Ce projet m'a permis d'apprendre énormément sur le développement Discord, les architectures orientées objet, la persistance de données et l'administration de l'infrastructure en production. Après près de 3 ans, j'ai quitté le projet suite à un désaccord avec mon co-fondateur, et pour me consacrer à d'autres projets.",
    ],
    dates: {
        start: createDate({ month: MonthEnum.February, year: 2023 }),
        end: createDate({ month: MonthEnum.January, year: 2026 }),
    },
    knowledges: [
        technologies.languages.TYPESCRIPT,
        technologies.languages.JAVASCRIPT,
        technologies.languages.SQL,
        technologies.frameworks.SVELTE,
        technologies.frameworks.TAILWINDCSS,
        technologies.databases.POSTGRESQL,
        technologies.tools.NODEJS,
        technologies.tools.DOCKER,
        technologies.tools.GIT,
        technologies.tools.LINUX,
        types.methods.OOP,
        types.methods.SELF_LEARNING,
    ],
    type: types.projectTypes.PERSONAL,
    projectUrl: "https://nuagebleu.fr",
} satisfies IIncompleteProject
