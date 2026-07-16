<script lang="ts" setup>
import PresentationComponent from "@components/PresentationComponent.vue"
import ButtonComponent from "@components/ButtonComponent.vue"
import GlassCard from "@components/GlassCard.vue"
import TechnologiesComponent from "@components/TechnologiesComponent.vue"
import {
    DatabasesEnum,
    FrameworksEnum,
    LanguagesEnum,
    ToolsEnum,
    projects,
    projectDateToString,
    type TechnologyEnum,
} from "@/content/projects"
import { usePageHead } from "@/lib/routing"
import { ref } from "vue"
import { FontAwesomeIcon } from "@fortawesome/vue-fontawesome"
import { faChevronDown } from "@fortawesome/free-solid-svg-icons"

usePageHead()

const contentStart = ref<HTMLElement>()

const scrollToContent = () => {
    const target = contentStart.value
    if (!target) return
    // scrollIntoView place le haut de la section sous le header sticky. On calcule
    // la position en retranchant la hauteur du header pour un rendu propre partout.
    const header = document.querySelector("header")
    const offset = (header?.offsetHeight ?? 0) + 16
    const top = target.getBoundingClientRect().top + window.scrollY - offset
    window.scrollTo({ top, behavior: "smooth" })
}

// Technologies mises en avant sur l'accueil (choix manuel, à ajuster librement).
const technologies: TechnologyEnum[] = [
    LanguagesEnum.TYPESCRIPT,
    FrameworksEnum.VUEJS,
    LanguagesEnum.PHP,
    LanguagesEnum.JAVA,
    LanguagesEnum.GOLANG,
    LanguagesEnum.SQL,
    ToolsEnum.DOCKER,
    ToolsEnum.GIT,
    ToolsEnum.LINUX,
]

const featured = projects.slice(0, 3)
</script>

<template>
    <div class="home">
        <section class="hero">
            <PresentationComponent />
            <p class="tagline">
                Étudiant en BUT Informatique, passionné par le développement applicatif et
                l'auto-hébergement. Je construis des applications modernes et j'administre mes
                propres serveurs.
            </p>
            <div class="buttons">
                <ButtonComponent>
                    <RouterLink to="/projects">Voir mes projets</RouterLink>
                </ButtonComponent>
                <ButtonComponent>
                    <RouterLink to="/about">À propos</RouterLink>
                </ButtonComponent>
            </div>

            <button class="scroll-cue" @click="scrollToContent" aria-label="Découvrir la suite">
                <FontAwesomeIcon :icon="faChevronDown" />
            </button>
        </section>

        <section ref="contentStart" class="section">
            <h2>Technologies utilisées</h2>
            <div class="tech-grid">
                <TechnologiesComponent
                    v-for="tech in technologies"
                    :key="tech"
                    :technology="tech"
                />
            </div>
        </section>

        <section class="section">
            <h2>Projets récents</h2>
            <div class="recent">
                <RouterLink
                    v-for="project in featured"
                    :key="project.id"
                    :to="`/project/${project.id}`"
                    class="recent-link"
                >
                    <GlassCard class="recent-card">
                        <h3>{{ project.title }}</h3>
                        <p class="recent-subtitle">{{ project.subtitle }}</p>
                        <p class="recent-date">{{ projectDateToString(project.dates) }}</p>
                    </GlassCard>
                </RouterLink>
            </div>
            <ButtonComponent class="see-all">
                <RouterLink to="/projects">Voir tous les projets</RouterLink>
            </ButtonComponent>
        </section>
    </div>
</template>

<style scoped>
.home {
    display: flex;
    flex-direction: column;
    align-items: center;
    gap: var(--space-12);
    padding: 0 var(--space-4) var(--space-12);
}

.hero {
    position: relative;
    min-height: calc(100dvh - 3.5rem);
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    text-align: center;
    padding-bottom: var(--space-12);
}

.scroll-cue {
    position: absolute;
    bottom: var(--space-4);
    left: 50%;
    transform: translateX(-50%);
    width: 2.75rem;
    height: 2.75rem;
    border-radius: 50%;
    border: 1px solid var(--surface-border);
    background: var(--surface);
    backdrop-filter: blur(8px);
    -webkit-backdrop-filter: blur(8px);
    color: var(--text);
    font-size: 1.1rem;
    cursor: pointer;
    display: flex;
    align-items: center;
    justify-content: center;
    animation: scroll-bounce 1.8s var(--ease) infinite;
    transition: background 250ms var(--ease);
}

.scroll-cue:hover {
    background: var(--accent-strong);
}

@keyframes scroll-bounce {
    0%,
    100% {
        transform: translateX(-50%) translateY(0);
    }
    50% {
        transform: translateX(-50%) translateY(6px);
    }
}

.tagline {
    max-width: 40rem;
    margin: 0 auto;
    color: var(--text-muted);
    font-size: var(--fs-lg);
}

.buttons {
    display: flex;
    gap: 1rem;
    margin-top: var(--space-8);
    flex-wrap: wrap;
    justify-content: center;
}

.section {
    width: min(70rem, 100%);
    display: flex;
    flex-direction: column;
    align-items: center;
}

.section > h2 {
    font-size: var(--fs-xl);
    margin: 0 0 var(--space-8);
    text-align: center;
}

.tech-grid {
    display: flex;
    flex-wrap: wrap;
    justify-content: center;
    gap: var(--space-3);
}

.recent {
    display: grid;
    grid-template-columns: repeat(auto-fit, minmax(15rem, 1fr));
    gap: var(--space-4);
    width: 100%;
}

.recent-link {
    text-decoration: none;
    color: inherit;
}

.recent-card {
    height: 100%;
    padding: var(--space-6);
    transition:
        transform 250ms var(--ease),
        border-color 250ms var(--ease),
        box-shadow 250ms var(--ease);
}

.recent-link:hover .recent-card {
    transform: translateY(-4px);
    border-color: var(--surface-border-hover);
    box-shadow: var(--shadow-lg);
}

.recent-card > h3 {
    margin: 0 0 var(--space-2);
    font-size: var(--fs-lg);
}

.recent-subtitle {
    margin: 0;
    color: var(--text-muted);
    font-size: var(--fs-sm);
}

.recent-date {
    margin: var(--space-3) 0 0;
    color: var(--text-muted);
    font-size: var(--fs-sm);
}

.see-all {
    margin-top: var(--space-8);
}
</style>
