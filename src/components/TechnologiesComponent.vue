<script setup lang="ts">
import { TechnologiesEnum } from "@/script/projects"
import { computed } from "vue"

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
        case TechnologiesEnum.JAVA:
            return "java.svg"
        case TechnologiesEnum.JAVAFX:
            return "javafx.png"
        case TechnologiesEnum.PYTHON:
            return "python.svg"
        case TechnologiesEnum.GOLANG:
            return "golang.svg"
        case TechnologiesEnum.C:
            return "c.svg"
        case TechnologiesEnum.SQL:
            return "sql.png"
        case TechnologiesEnum.PLSQL:
            return "plsql.svg"
        case TechnologiesEnum.GIT:
            return "git.svg"
        case TechnologiesEnum.GITHUB:
            return "github.svg"
        case TechnologiesEnum.DOCKER:
            return "docker.svg"
        default:
            return "default"
    }
})

const imageUrl = computed(() => {
    return image.value === "default" ? undefined : `/languages/${image.value}`
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
