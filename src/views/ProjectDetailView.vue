<script setup lang="ts">
import { projects } from "@/script/projects"
import { useRoute } from "vue-router"

const projectName = useRoute().params.projectName as string

const projectInfo = projects.find((project) => project.id === projectName) || null
</script>

<template>
    <p v-if="projectInfo === null">Ce projet n'existe pas.</p>
    <div v-else>
        <h1>{{ projectInfo.title }}</h1>
        <h2>{{ projectInfo.subtitle }}</h2>
        <p>{{ projectInfo.description }}</p>
    </div>
</template>
