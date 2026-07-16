<script setup lang="ts">
import { projectDateToString, projects } from "@/content/projects"
import { usePageHead } from "@/lib/routing"
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
    padding: 0 var(--space-4);
}

#content > h2 {
    font-size: var(--fs-xl);
    margin: var(--space-8) 0 var(--space-12);
    text-align: center;
}
</style>
