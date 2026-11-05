<script setup lang="ts">
import { types, projectDateToString, projects, type TechnologyEnum } from "@/content/projects"
import { usePageHead } from "@/lib/routing"
import ButtonComponent from "@components/ButtonComponent.vue"
import CarousselComponent from "@components/CarousselComponent.vue"
import GlassCard from "@components/GlassCard.vue"
import TechnologiesComponent from "@components/TechnologiesComponent.vue"
import {
    faArrowLeft,
    faArrowUpRightFromSquare,
    faCalendar,
} from "@fortawesome/free-solid-svg-icons"
import { FontAwesomeIcon } from "@fortawesome/vue-fontawesome"
import { computed } from "vue"
import { useRoute } from "vue-router"

type Method = (typeof types.methods)[keyof typeof types.methods]

const projectName = useRoute().params.projectName as string

const projectInfo = projects.find((project) => project.id === projectName) || null

const projectDate = computed(() =>
    projectInfo === null ? "" : projectDateToString(projectInfo.dates),
)
const projectTechnologies = computed<TechnologyEnum[]>(() =>
    projectInfo === null
        ? []
        : projectInfo.knowledges.filter(
              (t): t is TechnologyEnum => !Object.values(types.methods).includes(t as Method),
          ),
)
const projectMethods = computed<string>(() =>
    projectInfo === null
        ? "Aucune méthode spécifique n'a été utilisée."
        : projectInfo.knowledges
              .filter((t): t is Method => Object.values(types.methods).includes(t as Method))
              .join(", "),
)

usePageHead({
    projectName: projectInfo ? projectInfo.title : "Projet inconnu",
    projectDetails: projectInfo ? projectInfo.subtitle : "Ce projet n'existe pas.",
})
</script>

<template>
    <div>
        <div id="back-to-projects-container">
            <RouterLink to="/projects" id="back-to-projects" title="Retour aux projets">
                <ButtonComponent
                    ><FontAwesomeIcon :icon="faArrowLeft" /> Retour aux projets</ButtonComponent
                >
            </RouterLink>
        </div>
        <div id="content">
            <p v-if="projectInfo === null">Ce projet n'existe pas.</p>
            <GlassCard v-else id="project">
                <a
                    v-if="projectInfo.projectUrl"
                    :href="projectInfo.projectUrl"
                    target="_blank"
                    id="project-link"
                    title="Voir le projet"
                >
                    <FontAwesomeIcon :icon="faArrowUpRightFromSquare" /> Voir le projet
                </a>
                <h2>{{ projectInfo.title }}</h2>
                <h3>{{ projectInfo.subtitle }}</h3>
                <div id="technologies-list">
                    <h3>Technologies</h3>
                    <TechnologiesComponent
                        v-for="(tech, index) in projectTechnologies"
                        :key="index"
                        :technology="tech"
                    />
                </div>
                <div id="methods-list">
                    <h3>Méthodes</h3>
                    <p>{{ projectMethods }}</p>
                </div>
                <p><FontAwesomeIcon :icon="faCalendar" /> {{ projectDate }}</p>
                <div v-if="projectInfo.body" id="markdown">
                    <component :is="projectInfo.body" />
                </div>
                <CarousselComponent
                    v-if="projectInfo.images && projectInfo.images.length > 1"
                    :images="projectInfo.images"
                />
                <img
                    v-else-if="projectInfo.images.length === 1"
                    :src="projectInfo.images[0]?.url"
                    :alt="projectInfo.images[0]?.title"
                    :title="projectInfo.images[0]?.title"
                    id="project-image"
                />
            </GlassCard>
        </div>
    </div>
</template>

<style scoped>
#back-to-projects-container {
    max-width: 75rem;
    margin: var(--space-6) auto 0;
    padding: 0 var(--space-4);
    display: flex;
}
#back-to-projects {
    display: inline-flex;
    text-decoration: none;
}

div#content {
    display: flex;
    justify-content: center;
}
#project {
    max-width: 75rem;
    margin: var(--space-8) var(--space-4) 0;
    padding: var(--space-8);
}

#project > h2 {
    font-size: var(--fs-2xl);
    margin-top: 0;
}

#project > h3 {
    font-size: var(--fs-lg);
    color: var(--text-muted);
}

#project > #project-link {
    float: right;
    margin: 0 0 var(--space-4) var(--space-4);
    display: inline-flex;
    align-items: center;
    gap: var(--space-2);
    padding: 0.6rem 1.1rem;
    border-radius: var(--radius-md);
    background: linear-gradient(180deg, var(--blue-500), var(--accent-strong));
    color: #ffffff;
    font-weight: 600;
    text-decoration: none;
    border: 1px solid rgba(255, 255, 255, 0.18);
    box-shadow: var(--shadow-md);
    transition:
        transform 250ms var(--ease),
        filter 250ms var(--ease),
        box-shadow 250ms var(--ease);
}

#project > #project-link:hover {
    transform: translateY(-2px);
    filter: brightness(1.08);
    box-shadow: var(--shadow-lg);
}

#technologies-list,
#methods-list {
    display: flex;
    flex-wrap: wrap;
    align-items: center;
    gap: 0.25rem;
}

#project-image {
    border-radius: 1rem;
    width: 100%;
    display: block;
    object-fit: cover;
}

#markdown {
    line-height: 1.7;
}

#markdown :deep(a) {
    color: white;
    text-decoration: none;
    border-bottom: 1px solid white;
    background-image: linear-gradient(#00bbdc, #00bbdc);
    background-position: 0% 100%;
    background-repeat: no-repeat;
    background-size: 0% 2px;
    transition: background-size 400ms ease-in-out;
}

#markdown :deep(a):hover {
    background-size: 100% 2px;
}

#markdown :deep(a::after) {
    content: " ↗";
    font-size: 0.75em;
}

/* Revision timeline: a `<div class="revisions">` of `<details>` in a project's markdown,
   newest first, one per past version of the page. A `<time>` in a `<summary>` becomes
   the date pill. */
#markdown :deep(.revisions) {
    /* Center of the rail, from the list's left edge, and the indent of the cards. */
    --rail: 0.6rem;
    --gutter: calc(var(--rail) * 2 + var(--space-4));
    --dot: 0.9rem;
    /* Center of the first summary line, from a card's top edge. */
    --row: calc(var(--space-3) + 0.85em);
    position: relative;
    margin-top: var(--space-6);
    padding-left: var(--gutter);
    interpolate-size: allow-keywords;
}

/* The rail: a fading track, plus a cyan glint that slides down it. */
#markdown :deep(.revisions)::before {
    content: "";
    position: absolute;
    left: calc(var(--rail) - 1px);
    top: var(--row);
    bottom: var(--space-6);
    width: 2px;
    border-radius: 1px;
    background:
        linear-gradient(180deg, transparent, var(--cyan-300), transparent) 0 -5rem / 100% 5rem
            no-repeat,
        linear-gradient(180deg, var(--blue-400), rgba(0, 153, 255, 0.08));
    animation: revisions-glint 3.5s var(--ease) 0.8s infinite;
}

@keyframes revisions-glint {
    to {
        background-position:
            0 calc(100% + 5rem),
            0 0;
    }
}

#markdown :deep(.revisions details) {
    position: relative;
    margin-bottom: var(--space-4);
    background: rgba(0, 18, 51, 0.32);
    border: 1px solid var(--surface-border);
    border-radius: var(--radius-md);
    transition:
        border-color 300ms var(--ease),
        background 300ms var(--ease),
        box-shadow 300ms var(--ease);
    animation: revisions-in 700ms var(--ease) both;
}

#markdown :deep(.revisions details:nth-child(2)) {
    animation-delay: 120ms;
}
#markdown :deep(.revisions details:nth-child(3)) {
    animation-delay: 240ms;
}
#markdown :deep(.revisions details:nth-child(n + 4)) {
    animation-delay: 360ms;
}

@keyframes revisions-in {
    from {
        opacity: 0;
        transform: translateX(-1rem);
    }
}

#markdown :deep(.revisions details:hover) {
    border-color: var(--surface-border-hover);
}

#markdown :deep(.revisions details[open]) {
    background: rgba(0, 39, 90, 0.55);
    border-color: rgba(0, 247, 255, 0.28);
    box-shadow:
        0 0 24px rgba(0, 247, 255, 0.08),
        var(--shadow-md);
}

/* Dashed connector from the dot to the card. */
#markdown :deep(.revisions details)::before {
    content: "";
    position: absolute;
    left: calc(var(--rail) + var(--dot) / 2 - var(--gutter));
    width: calc(var(--gutter) - var(--rail) - var(--dot) / 2);
    top: var(--row);
    border-top: 1px dashed rgba(0, 247, 255, 0.35);
}

#markdown :deep(.revisions summary) {
    list-style: none;
    display: flex;
    flex-wrap: wrap;
    align-items: center;
    gap: var(--space-2) var(--space-3);
    padding: var(--space-3) var(--space-4);
    font-weight: 600;
    cursor: pointer;
    border-radius: inherit;
    transition: color 300ms var(--ease);
}

#markdown :deep(.revisions summary::-webkit-details-marker) {
    display: none;
}

#markdown :deep(.revisions summary:focus-visible) {
    outline: 2px solid var(--cyan-300);
    outline-offset: 2px;
}

#markdown :deep(.revisions summary:hover) {
    color: var(--cyan-300);
}

/* The dot on the rail: hollow when closed, lit and pulsing when open. */
#markdown :deep(.revisions summary)::before {
    content: "";
    position: absolute;
    left: calc(var(--rail) - var(--dot) / 2 - var(--gutter));
    top: calc(var(--row) - var(--dot) / 2);
    width: var(--dot);
    height: var(--dot);
    border-radius: 50%;
    border: 2px solid var(--blue-400);
    background: var(--blue-950);
    transition:
        background 300ms var(--ease),
        border-color 300ms var(--ease),
        scale 300ms var(--ease);
}

#markdown :deep(.revisions details:hover > summary)::before {
    scale: 1.2;
    border-color: var(--cyan-300);
}

#markdown :deep(.revisions details[open] > summary)::before {
    background: var(--cyan-300);
    border-color: var(--cyan-300);
    animation: revisions-pulse 2.4s ease-out infinite;
}

@keyframes revisions-pulse {
    from {
        box-shadow:
            0 0 0 0 rgba(0, 247, 255, 0.55),
            0 0 12px rgba(0, 247, 255, 0.7);
    }
    to {
        box-shadow:
            0 0 0 0.6rem rgba(0, 247, 255, 0),
            0 0 12px rgba(0, 247, 255, 0.7);
    }
}

/* Chevron, pushed to the right edge. */
#markdown :deep(.revisions summary)::after {
    content: "";
    margin-left: auto;
    width: 0.5rem;
    height: 0.5rem;
    border-right: 2px solid currentColor;
    border-bottom: 2px solid currentColor;
    opacity: 0.7;
    rotate: -45deg;
    transition: rotate 400ms var(--ease);
}

#markdown :deep(.revisions details[open] > summary)::after {
    rotate: 45deg;
}

#markdown :deep(.revisions summary time) {
    padding: 0.05rem 0.65rem;
    border-radius: 999px;
    border: 1px solid rgba(0, 247, 255, 0.3);
    background: rgba(0, 153, 255, 0.16);
    color: var(--cyan-300);
    font-size: var(--fs-sm);
    font-weight: 500;
    font-variant-numeric: tabular-nums;
    letter-spacing: 0.02em;
}

/* Smooth height on open/close where ::details-content is supported; elsewhere the
   content just appears and fades in. */
#markdown :deep(.revisions details)::details-content {
    block-size: 0;
    overflow: hidden;
    transition:
        block-size 450ms var(--ease),
        content-visibility 450ms allow-discrete;
}

#markdown :deep(.revisions details[open])::details-content {
    block-size: auto;
}

#markdown :deep(.revisions details[open] > summary) {
    border-bottom: 1px solid var(--surface-border);
    border-radius: var(--radius-md) var(--radius-md) 0 0;
}

#markdown :deep(.revisions details > :not(summary)) {
    margin-inline: var(--space-4);
    color: var(--text-muted);
}

#markdown :deep(.revisions details > :last-child:not(summary)) {
    margin-bottom: var(--space-4);
}

#markdown :deep(.revisions details[open] > :not(summary)) {
    animation: revisions-reveal 500ms var(--ease) 80ms both;
}

@keyframes revisions-reveal {
    from {
        opacity: 0;
        transform: translateY(-0.4rem);
    }
}

@media (prefers-reduced-motion: reduce) {
    #markdown :deep(.revisions),
    #markdown :deep(.revisions *) {
        animation: none !important;
        transition: none !important;
    }
    #markdown :deep(.revisions)::before,
    #markdown :deep(.revisions *)::before,
    #markdown :deep(.revisions *)::after,
    #markdown :deep(.revisions details)::details-content {
        animation: none !important;
        transition: none !important;
    }
}
</style>
