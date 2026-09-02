<script setup lang="ts">
import { type TechnologyEnum } from "@/content/projects"
import { SHADOW_OPACITY, iconsByTechnology } from "@/content/projects/icons"
import icons from "virtual:technology-icons"
import { computed } from "vue"

const props = defineProps<{
    technology: TechnologyEnum
}>()

const spec = computed(() => iconsByTechnology.get(props.technology))

// `icons` only holds the icons of published projects: a technology missing from the
// build renders nothing, which the template's `v-if` already handles.
const imageUrl = computed(() => {
    const file = spec.value?.file
    return file ? icons[file] : undefined
})

const shadowStyle = computed(() =>
    spec.value && spec.value.shadow !== false
        ? { filter: `drop-shadow(0 0 2px rgba(0, 0, 0, ${SHADOW_OPACITY}))` }
        : {},
)

const forceSquare = computed(() => spec.value?.square ?? false)
</script>
<template>
    <span
        v-if="imageUrl"
        class="icon-badge"
        :class="{ 'icon-badge--square': forceSquare }"
        :title="props.technology"
    >
        <img :src="imageUrl" :alt="props.technology" :style="shadowStyle" />
    </span>
</template>
<style scoped>
.icon-badge {
    display: inline-flex;
    align-items: center;
    justify-content: center;
    height: 2.5rem;
    width: auto;
    min-width: 2.5rem;
    padding: 0.35rem;
    border-radius: 0.5rem;
    background-color: rgba(255, 255, 255, 0.25);
}

.icon-badge--square {
    width: 2.5rem;
}

img {
    height: 100%;
    width: auto;
    object-fit: contain;
    object-position: center;
}

.icon-badge--square img {
    width: 100%;
}
</style>
