<script setup lang="ts">
import { projects } from "@/script/projects"
import { useRoute } from "vue-router"
import VueMarkdown from "vue-markdown-render"
import { FontAwesomeIcon } from "@fortawesome/vue-fontawesome"
import {
    faArrowUpRightFromSquare,
    faArrowLeft,
    faCalendar,
} from "@fortawesome/free-solid-svg-icons"
import ButtonComponent from "@components/base/ButtonComponent.vue"
import { computed } from "vue"

const projectName = useRoute().params.projectName as string

const projectInfo = projects.find((project) => project.id === projectName) || null

const projectDate = computed(() => (projectInfo === null ? "" : projectInfo.dates.toString()))
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
                <p><FontAwesomeIcon :icon="faCalendar" /> {{ projectDate }}</p>
                <VueMarkdown :source="projectInfo.description" />
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
</style>
