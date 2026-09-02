import { MonthEnum, createDate } from "../date"
import technologies from "../technologies"
import types from "../types"
import type { IIncompleteProject } from "../types"

export default {
    title: "SAÉ Pokémon",
    subtitle: "Projet d'implémentation du célèbre jeu Pokémon Trading Card Game en Java",
    published: true,
    description: [
        "Dans le cadre de ma formation, j'ai participé à un projet visant à implémenter le célèbre jeu Pokémon Trading Card Game en utilisant le langage de programmation Java.",
        "Ce projet m'a permis de mettre en pratique mes compétences en programmation orientée objet en me basant sur le diagramme de classe fourni, tout en approfondissant ma compréhension des concepts fondamentaux de la programmation Java.",
        "En travaillant sur ce projet, j'ai acquis une expérience précieuse dans la conception et le développement d'une application complexe, ainsi que dans la collaboration avec d'autres membres de l'équipe pour atteindre nos objectifs communs.",
        "Ce projet m'a également permis de comprendre comment implémenter des interfaces Homme <-> Machine en utilisant JavaFX pour créer une expérience utilisateur interactive et engageante.",
        "J'ai travaillé sur ce projet avec [Natan Cantié](https://www.linkedin.com/in/natan-cantie-018550347/).",
    ],
    newFormat: false,
    type: types.projectTypes.ACADEMIC,
    knowledges: [
        technologies.languages.JAVA,
        technologies.frameworks.JAVAFX,
        technologies.tools.GIT,
        types.methods.OOP,
        types.methods.UML,
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
} satisfies IIncompleteProject
