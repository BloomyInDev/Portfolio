import { MonthEnum, createDate } from "../date"
import { projectNameToId } from "../slug"
import { MethodsEnum, ProjectTypeEnum, TechnologiesEnum, type IIncompleteProject } from "../types"

export default {
    title: "Homelab",
    subtitle:
        "Mise en place d'un réseau de serveurs personnels pour l'hébergement de services et l'apprentissage de l'administration système",
    published: true,
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
} satisfies IIncompleteProject
