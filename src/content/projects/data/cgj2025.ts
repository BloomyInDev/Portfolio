import { MonthEnum, createDate } from "../date"
import { FrameworksEnum, LanguagesEnum, ToolsEnum } from "../technologies"
import { MethodsEnum, ProjectTypeEnum, type IIncompleteProject } from "../types"

export default {
    title: "CodeGameJam 2025 - 9ème édition",
    subtitle: "Développement d'un jeu vidéo en équipe lors de la CodeGameJam 2025",
    published: true,
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
        LanguagesEnum.JAVA,
        FrameworksEnum.LIBGDX,
        ToolsEnum.GIT,
        MethodsEnum.OOP,
    ],
    dates: {
        start: createDate({ day: 23, month: MonthEnum.January, year: 2025 }),
        end: createDate({ day: 25, month: MonthEnum.January, year: 2025 }),
    },
    images: [{ title: "Écran de jeu", url: "/project/cgj2025/gameplay.png" }],
    projectUrl: "https://bybloomy.itch.io/thesymphonyofstars-cgj2025",
} satisfies IIncompleteProject
