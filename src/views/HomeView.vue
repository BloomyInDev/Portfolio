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

usePageHead()

const techValues = new Set<string>([
    ...Object.values(LanguagesEnum),
    ...Object.values(FrameworksEnum),
    ...Object.values(DatabasesEnum),
    ...Object.values(ToolsEnum),
])

const technologies = [...new Set(projects.flatMap((project) => project.knowledges))].filter(
    (knowledge): knowledge is TechnologyEnum => techValues.has(knowledge as string),
)

const featured = projects.slice(0, 3)
</script>

<template>
    <div class="home">
        <section class="hero">
            <PresentationComponent />
            <p class="tagline">
                Étudiant en BUT Informatique, passionné par le développement web et
                l'auto-hébergement. Je construis des applications web modernes et j'administre mes
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
        </section>

        <section class="section">
            <h2>Technologies</h2>
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
            <RouterLink to="/projects" class="see-all">Voir tous les projets →</RouterLink>
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
    display: flex;
    flex-direction: column;
    align-items: center;
    text-align: center;
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
    margin-top: var(--space-6);
    color: var(--accent);
    text-decoration: none;
    font-weight: 600;
}

.see-all:hover {
    text-decoration: underline;
}
</style>
