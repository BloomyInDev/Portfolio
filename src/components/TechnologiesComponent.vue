<script setup lang="ts">
import { DatabasesEnum, FrameworksEnum, LanguagesEnum, ToolsEnum, type TechnologyEnum } from "@/content/projects"
import { computed } from "vue"

const icons = import.meta.glob("@/assets/technologies/**/*", { eager: true, import: "default" }) as Record<
    string,
    string
>
const iconsByName = Object.fromEntries(
    Object.entries(icons).map(([path, url]) => [path.split("/").pop() as string, url]),
)

const props = defineProps<{
    technology: TechnologyEnum
}>()

const image = computed(() => {
    switch (props.technology) {
        case LanguagesEnum.HTML:
            return "html.svg"
        case LanguagesEnum.CSS:
            return "css.svg"
        case LanguagesEnum.JAVASCRIPT:
            return "javascript.svg"
        case LanguagesEnum.TYPESCRIPT:
            return "typescript.svg"
        case LanguagesEnum.PHP:
            return "php.svg"
        case LanguagesEnum.JAVA:
            return "java.svg"
        case LanguagesEnum.PYTHON:
            return "python.svg"
        case LanguagesEnum.GOLANG:
            return "go.svg"
        case LanguagesEnum.C:
            return "c.svg"
        case LanguagesEnum.SQL:
            return "sql.png"
        case FrameworksEnum.VUEJS:
            return "vuejs.svg"
        case FrameworksEnum.NESTJS:
            return "nestjs.svg"
        case FrameworksEnum.JAVAFX:
            return "javafx.png"
        case FrameworksEnum.LIBGDX:
            return "libgdx.png"
        case FrameworksEnum.ASTRO:
            return "astro.svg"
        case FrameworksEnum.SVELTE:
            return "svelte.svg"
        case FrameworksEnum.TAILWINDCSS:
            return "tailwindcss.svg"
        case FrameworksEnum.BOOTSTRAP:
            return "bootstrap.svg"
        case DatabasesEnum.POSTGRESQL:
            return "postgresql.svg"
        case ToolsEnum.LINUX:
            return "linux.svg"
        case ToolsEnum.GIT:
            return "git.svg"
        case ToolsEnum.GITHUB:
            return "github.svg"
        case ToolsEnum.DOCKER:
            return "docker.svg"
        case ToolsEnum.WORDPRESS:
            return "wordpress.svg"
        case ToolsEnum.MONDAY:
            return "monday.png"
        case ToolsEnum.OVH:
            return "ovh.png"
        case ToolsEnum.NODEJS:
            return "nodejs.svg"
        case ToolsEnum.VERCEL:
            return "vercel.svg"
        default:
            return "default"
    }
})

const imageUrl = computed(() => {
    if (image.value === "default") return undefined
    return iconsByName[image.value]
})
</script>
<template>
    <img v-if="image" :src="imageUrl" :alt="props.technology" :title="props.technology" />
</template>
<style scoped>
img {
    height: 2.5rem;
    object-fit: contain;
    object-position: center;
}
</style>
