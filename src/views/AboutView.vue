<script setup lang="ts">
import { usePageHead } from "@/lib/routing"
import { computed } from "vue"
import GlassCard from "@components/GlassCard.vue"
import TechnologiesComponent from "@components/TechnologiesComponent.vue"
import { FontAwesomeIcon } from "@fortawesome/vue-fontawesome"
import { faGitAlt, faGithub, faLinkedin } from "@fortawesome/free-brands-svg-icons"
import { faEnvelope, faFilePdf } from "@fortawesome/free-solid-svg-icons"
import { technologies, projects, type TechnologyEnum } from "@/content/projects"
import meImage from "@assets/me.png"

usePageHead()

const hash = computed(() => import.meta.env.VITE_GIT_COMMIT_HASH)
const commitUrl = computed(() => `https://github.com/BloomyInDev/Portfolio/commit/${hash.value}`)

// Technologies actually met with across the projects.
const usedTechnologies = new Set(projects.flatMap((project) => project.knowledges))

// Skills grouped by category, keeping only the ones in use.
const categoryLabels: Record<keyof typeof technologies, string> = {
    languages: "Langages",
    frameworks: "Frameworks & bibliothèques",
    databases: "Bases de données",
    tools: "Outils & environnements",
    services: "Services & hébergement",
}

const skillCategories = Object.entries(categoryLabels)
    .map(([category, label]) => ({
        label,
        items: Object.values(technologies[category as keyof typeof technologies]).filter((value) =>
            usedTechnologies.has(value),
        ) as TechnologyEnum[],
    }))
    .filter((category) => category.items.length > 0)

const totalTechnologies = skillCategories.reduce((sum, category) => sum + category.items.length, 0)
const languagesCount = Object.values(technologies.languages).filter((value) =>
    usedTechnologies.has(value),
).length

const stats = [
    { value: projects.length, label: "Projets" },
    { value: totalTechnologies, label: "Technologies" },
    { value: languagesCount, label: "Langages" },
]

// Background entered by hand (period, title, detail).
type TimelineEntry = { period: string; title: string; detail: string }

const education: TimelineEntry[] = [
    {
        period: "2024 – 2027",
        title: "BUT Informatique, IUT de Montpellier-Sète",
        detail: "Parcours RACDV (Réalisation d'applications : conception, développement, validation)",
    },
    {
        period: "2021 – 2024",
        title: "Baccalauréat général, Lycée Jean Moulin (Pézenas)",
        detail: "Spécialités NSI et Mathématiques, option Mathématiques expertes, mention Assez Bien",
    },
]

const experiences: TimelineEntry[] = [
    {
        period: "Avril – Juillet 2026",
        title: "Stagiaire en développement web, Dmoti",
        detail: "Entreprise spécialisée dans la Gestion Technique des Bâtiments (Bessan)",
    },
    {
        period: "Depuis 2025",
        title: "Développeur freelance",
        detail: "Réalisation d'applications sur mesure selon les besoins des clients",
    },
]

const contacts = [
    {
        label: "Email",
        href: "mailto:contact+portfolio@bastienluben.dev",
        icon: faEnvelope,
        external: false,
    },
    {
        label: "LinkedIn",
        href: "https://www.linkedin.com/in/bastien-luben/",
        icon: faLinkedin,
        external: true,
    },
    { label: "GitHub", href: "https://github.com/BloomyInDev", icon: faGithub, external: true },
    {
        label: "Forge privée",
        href: "https://forge.red.bloomyindev.me/bastien",
        icon: faGitAlt,
        external: true,
    },
]
</script>

<template>
    <div class="about-page">
        <GlassCard class="intro">
            <img class="avatar" :src="meImage" alt="Photo de Bastien LUBEN" />
            <div class="intro-text">
                <h1>Bastien LUBEN</h1>
                <p class="role">Étudiant en BUT Informatique · Développeur web</p>
                <a class="cv-btn" href="/cvWebBastienLuben.pdf" target="_blank">
                    <FontAwesomeIcon :icon="faFilePdf" /> Mon CV
                </a>
            </div>
        </GlassCard>

        <GlassCard class="stats">
            <div v-for="stat in stats" :key="stat.label" class="stat">
                <span class="stat-value">{{ stat.value }}</span>
                <span class="stat-label">{{ stat.label }}</span>
            </div>
        </GlassCard>

        <GlassCard class="section">
            <h2>À propos de moi</h2>
            <p>
                Je suis Bastien, étudiant en BUT Informatique (parcours RACDV) à l'IUT de
                Montpellier-Sète. Je conçois et développe des applications web, du back-end à
                l'interface, et je réalise des projets sur mesure en freelance.
            </p>
            <p>
                J'apprends surtout en construisant : chaque projet est l'occasion de découvrir une
                nouvelle technologie ou une nouvelle méthode de travail. Je m'intéresse au
                développement full-stack, au réseau, à l'administration système et à
                l'auto-hébergement de services, que j'explore à travers mon homelab.
            </p>
        </GlassCard>

        <GlassCard class="section">
            <h2>Parcours</h2>

            <h3 class="timeline-title">Formation</h3>
            <ul class="timeline">
                <li v-for="item in education" :key="item.title" class="timeline-item">
                    <span class="timeline-period">{{ item.period }}</span>
                    <div>
                        <p class="timeline-heading">{{ item.title }}</p>
                        <p v-if="item.detail" class="timeline-detail">{{ item.detail }}</p>
                    </div>
                </li>
            </ul>

            <template v-if="experiences.length > 0">
                <h3 class="timeline-title">Expériences</h3>
                <ul class="timeline">
                    <li v-for="item in experiences" :key="item.title" class="timeline-item">
                        <span class="timeline-period">{{ item.period }}</span>
                        <div>
                            <p class="timeline-heading">{{ item.title }}</p>
                            <p v-if="item.detail" class="timeline-detail">{{ item.detail }}</p>
                        </div>
                    </li>
                </ul>
            </template>
        </GlassCard>

        <GlassCard class="section">
            <h2>J'ai déjà utilisé</h2>
            <div class="skill-groups">
                <div v-for="category in skillCategories" :key="category.label" class="skill-group">
                    <h3>{{ category.label }}</h3>
                    <div class="skills">
                        <TechnologiesComponent
                            v-for="skill in category.items"
                            :key="skill"
                            :technology="skill"
                        />
                    </div>
                </div>
            </div>
        </GlassCard>

        <GlassCard class="section">
            <h2>Me contacter</h2>
            <ul class="contacts">
                <li v-for="contact in contacts" :key="contact.label">
                    <a
                        :href="contact.href"
                        :target="contact.external ? '_blank' : undefined"
                        class="contact"
                    >
                        <FontAwesomeIcon :icon="contact.icon" />
                        <span>{{ contact.label }}</span>
                    </a>
                </li>
            </ul>
        </GlassCard>

        <p class="colophon">
            Ce site a été développé par Bastien LUBEN avec Vite et Vue.js. Code source disponible
            sur
            <a class="animated-link" href="https://github.com/BloomyInDev/Portfolio" target="_blank"
                >GitHub</a
            >. Version : <a class="animated-link" :href="commitUrl">{{ hash }}</a>
        </p>
    </div>
</template>

<style scoped>
.about-page {
    width: min(48rem, 100% - 2rem);
    margin: var(--space-8) auto var(--space-12);
    display: flex;
    flex-direction: column;
    gap: var(--space-6);
}

.intro {
    display: flex;
    align-items: center;
    gap: var(--space-6);
    padding: var(--space-8);
}

.avatar {
    width: 8rem;
    height: 8rem;
    border-radius: 50%;
    object-fit: cover;
    border: 2px solid rgba(255, 255, 255, 0.25);
    flex-shrink: 0;
}

.intro-text {
    display: flex;
    flex-direction: column;
    gap: var(--space-2);
}

.intro-text > h1 {
    margin: 0;
    font-size: var(--fs-2xl);
}

.role {
    margin: 0;
    color: var(--text-muted);
    font-size: var(--fs-lg);
}

.cv-btn {
    align-self: flex-start;
    margin-top: var(--space-2);
    display: inline-flex;
    align-items: center;
    gap: var(--space-2);
    padding: 0.5rem 1rem;
    border-radius: var(--radius-md);
    background: linear-gradient(180deg, var(--blue-500), var(--accent-strong));
    color: #ffffff;
    font-weight: 600;
    text-decoration: none;
    border: 1px solid rgba(255, 255, 255, 0.18);
    box-shadow: var(--shadow-md);
    transition:
        transform 250ms var(--ease),
        filter 250ms var(--ease);
}

.cv-btn:hover {
    transform: translateY(-2px);
    filter: brightness(1.08);
}

.stats {
    display: grid;
    grid-template-columns: repeat(3, 1fr);
    padding: var(--space-6);
    text-align: center;
}

.stat {
    display: flex;
    flex-direction: column;
    gap: var(--space-1);
}

.stat + .stat {
    border-left: 1px solid var(--surface-border);
}

.stat-value {
    font-size: var(--fs-2xl);
    font-weight: 700;
    color: var(--text);
}

.stat-label {
    color: var(--text-muted);
    font-size: var(--fs-sm);
}

.section {
    padding: var(--space-8);
}

.section > h2 {
    margin: 0 0 var(--space-4);
    font-size: var(--fs-xl);
}

.section > p {
    margin: 0 0 var(--space-4);
    color: var(--text-muted);
}

.section > p:last-child {
    margin-bottom: 0;
}

.timeline-title {
    margin: var(--space-6) 0 var(--space-3);
    font-size: var(--fs-lg);
}

.timeline-title:first-of-type {
    margin-top: 0;
}

.timeline {
    list-style: none;
    margin: 0;
    padding: 0;
    display: flex;
    flex-direction: column;
    gap: var(--space-4);
}

.timeline-item {
    display: grid;
    grid-template-columns: 11rem 1fr;
    gap: var(--space-4);
    align-items: baseline;
}

.timeline-period {
    color: var(--cyan-300);
    font-size: var(--fs-sm);
    font-weight: 600;
}

.timeline-heading {
    margin: 0;
    font-weight: 600;
}

.timeline-detail {
    margin: var(--space-1) 0 0;
    color: var(--text-muted);
    font-size: var(--fs-sm);
}

.skill-groups {
    display: flex;
    flex-direction: column;
    gap: var(--space-6);
}

.skill-group > h3 {
    margin: 0 0 var(--space-3);
    font-size: var(--fs-base);
    color: var(--text-muted);
}

.skills {
    display: flex;
    flex-wrap: wrap;
    gap: var(--space-3);
}

.contacts {
    list-style: none;
    margin: 0;
    padding: 0;
    display: grid;
    grid-template-columns: repeat(auto-fit, minmax(12rem, 1fr));
    gap: var(--space-3);
}

.contact {
    display: flex;
    align-items: center;
    gap: var(--space-3);
    padding: var(--space-3) var(--space-4);
    border-radius: var(--radius-md);
    border: 1px solid var(--surface-border);
    color: var(--text);
    text-decoration: none;
    transition:
        background 250ms var(--ease),
        border-color 250ms var(--ease),
        transform 250ms var(--ease);
}

.contact:hover {
    background: rgba(255, 255, 255, 0.06);
    border-color: var(--surface-border-hover);
    transform: translateY(-2px);
}

.colophon {
    margin: 0;
    text-align: center;
    color: var(--text-muted);
    font-size: var(--fs-sm);
}

@media (max-width: 600px) {
    .intro {
        flex-direction: column;
        text-align: center;
    }

    .intro-text {
        align-items: center;
    }

    .cv-btn {
        align-self: center;
    }

    .timeline-item {
        grid-template-columns: 1fr;
        gap: var(--space-1);
    }
}
</style>
