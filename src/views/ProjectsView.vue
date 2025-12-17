<script setup lang="ts">
import { projects } from "@/script/projects"
import type { ITimeline } from "@/types/timeline"
import TimelineComponent from "@components/homeView/TimelineComponent.vue"

const timeline = projects.map((project) => ({
    title: project.title,
    description: project.subtitle,
    url: `/project/${project.id}`,
})) satisfies ITimeline[]
</script>

<template>
    <div id="content"><TimelineComponent :items="timeline"></TimelineComponent></div>
</template>

<style scoped>
#content {
    display: flex;
    justify-content: center;
}
</style>
