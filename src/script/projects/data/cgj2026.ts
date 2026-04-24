import { MonthEnum, createDate } from "../date"
import { MethodsEnum, ProjectTypeEnum, TechnologiesEnum, type IIncompleteProject } from "../types"

export default {
    title: "CodeGameJam 2026 - 10ème édition",
    subtitle: "Développement d'un jeu vidéo en équipe lors de la CodeGameJam 2026",
    published: true,
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
} satisfies IIncompleteProject
