<script setup lang="ts">
import { MethodsEnum, projectDateToString, projects, type TechnologyEnum } from "@/content/projects"
import { usePageHead } from "@/lib/routing"
import ButtonComponent from "@components/ButtonComponent.vue"
import CarousselComponent from "@components/CarousselComponent.vue"
import TechnologiesComponent from "@components/TechnologiesComponent.vue"
import {
    faArrowLeft,
    faArrowUpRightFromSquare,
    faCalendar,
} from "@fortawesome/free-solid-svg-icons"
import { FontAwesomeIcon } from "@fortawesome/vue-fontawesome"
import { computed } from "vue"
import VueMarkdown from "vue-markdown-render"
import { useRoute } from "vue-router"

const projectName = useRoute().params.projectName as string

const projectInfo = projects.find((project) => project.id === projectName) || null

const projectDate = computed(() =>
    projectInfo === null ? "" : projectDateToString(projectInfo.dates),
)
const projectTechnologies = computed<TechnologyEnum[]>(() =>
    projectInfo === null
        ? []
        : projectInfo.knowledges.filter(
              (t): t is TechnologyEnum => !Object.values(MethodsEnum).includes(t as MethodsEnum),
          ),
)
const projectMethods = computed<string>(() =>
    projectInfo === null
        ? "Aucune méthode spécifique n'a été utilisée."
        : projectInfo.knowledges
              .filter((t): t is MethodsEnum =>
                  Object.values(MethodsEnum).includes(t as MethodsEnum),
              )
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
                    :proportional-paddings="false"
                    :unrounded-corners="{
                        topLeft: true,
                        bottomLeft: true,
                        topRight: false,
                        bottomRight: false,
                    }"
                    ><FontAwesomeIcon :icon="faArrowLeft"
                /></ButtonComponent>
            </RouterLink>
        </div>
        <div id="content">
            <p v-if="projectInfo === null">Ce projet n'existe pas.</p>
            <div v-else id="project">
                <a
                    v-if="projectInfo.projectUrl"
                    :href="projectInfo.projectUrl"
                    target="_blank"
                    id="project-link"
                    title="Voir le projet"
                >
                    <ButtonComponent :proportional-paddings="true"
                        ><FontAwesomeIcon
                            :icon="faArrowUpRightFromSquare"
                            size="xl" /></ButtonComponent
                ></a>
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
                <VueMarkdown
                    :source="projectInfo.description"
                    id="markdown"
                    :options="{ breaks: true }"
                />
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
            </div>
        </div>
    </div>
</template>

<style scoped>
#back-to-projects-container {
    display: flex;
    justify-content: flex-start;
    align-items: center;
}
#back-to-projects {
    margin: 0.5rem 0;
    display: inline-block;
    width: 2.5rem;
    text-decoration: none;
    transition: width 0.25s ease-in-out;
}

#back-to-projects:hover {
    width: 4rem;
}

div#content {
    display: flex;
    justify-content: center;
}
#project {
    max-width: 75rem;
    margin: 2rem 0 0 0;
    padding: 20px;
    background-color: #00275a80;
    border-radius: 2rem;
}

#project > h2 {
    font-size: xx-large;
    margin-top: 0;
}

#project > h3 {
    font-size: x-large;
}

#project > #project-link {
    float: right;
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
    line-height: 1.2;
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
</style>
