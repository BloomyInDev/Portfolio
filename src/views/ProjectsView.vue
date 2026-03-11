<script setup lang="ts">
import { projectDateToString, projects } from "@/script/projects"
import { usePageHead } from "@/script/routing"
import type { ITimeline } from "@/types"
import TimelineComponent from "@components/TimelineComponent.vue"

const timeline = projects.map((project) => ({
    title: project.title,
    description: project.subtitle,
    url: `/project/${project.id}`,
    dateToString: projectDateToString(project.dates),
})) satisfies ITimeline[]

usePageHead()
</script>

<template>
    <div id="content">
        <h2>Mes différents projets</h2>
        <TimelineComponent :items="timeline"></TimelineComponent>
    </div>
</template>

<style scoped>
#content {
    display: flex;
    justify-content: center;
    align-items: center;
    flex-direction: column;
}
</style>
