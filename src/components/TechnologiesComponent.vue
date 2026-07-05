<script setup lang="ts">
import { TechnologiesEnum } from "@/content/projects"
import { computed } from "vue"

const icons = import.meta.glob("@/assets/languages/*", { eager: true, import: "default" }) as Record<string, string>

const props = defineProps<{
    technology: TechnologiesEnum
}>()

const image = computed(() => {
    switch (props.technology) {
        case TechnologiesEnum.HTML:
            return "html.svg"
        case TechnologiesEnum.CSS:
            return "css.svg"
        case TechnologiesEnum.JAVASCRIPT:
            return "javascript.svg"
        case TechnologiesEnum.TYPESCRIPT:
            return "typescript.svg"
        case TechnologiesEnum.PHP:
            return "php.svg"
        case TechnologiesEnum.VUEJS:
            return "vuejs.svg"
        case TechnologiesEnum.NESTJS:
            return "nestjs.svg"
        case TechnologiesEnum.JAVA:
            return "java.svg"
        case TechnologiesEnum.JAVAFX:
            return "javafx.png"
        case TechnologiesEnum.LIBGDX:
            return "libgdx.png"
        case TechnologiesEnum.PYTHON:
            return "python.svg"
        case TechnologiesEnum.GOLANG:
            return "golang.svg"
        case TechnologiesEnum.C:
            return "c.svg"
        case TechnologiesEnum.SQL:
            return "sql.png"
        case TechnologiesEnum.POSTGRESQL:
            return "postgresql.svg"
        case TechnologiesEnum.LINUX:
            return "linux.svg"
        case TechnologiesEnum.GIT:
            return "git.svg"
        case TechnologiesEnum.GITHUB:
            return "github.svg"
        case TechnologiesEnum.DOCKER:
            return "docker.svg"
        case TechnologiesEnum.WORDPRESS:
            return "wordpress.svg"
        case TechnologiesEnum.MONDAY:
            return "monday.png"
        case TechnologiesEnum.OVH:
            return "ovh.png"
        default:
            return "default"
    }
})

const imageUrl = computed(() => {
    if (image.value === "default") return undefined
    return icons[`/src/assets/languages/${image.value}`]
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
