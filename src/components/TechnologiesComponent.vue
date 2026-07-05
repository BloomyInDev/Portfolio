<script setup lang="ts">
import {
    DatabasesEnum,
    FrameworksEnum,
    LanguagesEnum,
    ToolsEnum,
    type TechnologyEnum,
} from "@/content/projects"
import { computed } from "vue"

const icons = import.meta.glob("@/assets/technologies/**/*", {
    eager: true,
    import: "default",
}) as Record<string, string>
const iconsByName = Object.fromEntries(
    Object.entries(icons).map(([path, url]) => [path.split("/").pop() as string, url]),
)

const props = defineProps<{
    technology: TechnologyEnum
}>()

// Default drop-shadow opacity used to make an icon pop off the badge background.
// Icons that are already high-contrast (plain white icons, or PNGs whose own
// colors read fine) can override it to 0 right where they're mapped, since for
// a couple of them (e.g. javafx.png) the shadow actively washes out the detail.
const DEFAULT_SHADOW_OPACITY = 0.7

type IconConfig = {
    image: string
    shadowOpacity: number
    forceSquare?: true
}

const makeIconConfig = (
    image: string,
    options?: { shadowOpacity?: number; forceSquare?: true },
): IconConfig => ({
    image,
    shadowOpacity: options?.shadowOpacity ?? 0,
    ...(options?.forceSquare && { forceSquare: true }),
})

const iconConfig = computed((): IconConfig => {
    switch (props.technology) {
        case LanguagesEnum.HTML:
            return makeIconConfig("html.svg", { shadowOpacity: DEFAULT_SHADOW_OPACITY })
        case LanguagesEnum.CSS:
            return makeIconConfig("css.svg", { shadowOpacity: DEFAULT_SHADOW_OPACITY })
        case LanguagesEnum.JAVASCRIPT:
            return makeIconConfig("javascript.svg", { shadowOpacity: DEFAULT_SHADOW_OPACITY })
        case LanguagesEnum.TYPESCRIPT:
            return makeIconConfig("typescript.svg", { shadowOpacity: DEFAULT_SHADOW_OPACITY })
        case LanguagesEnum.PHP:
            return makeIconConfig("php.svg", { shadowOpacity: DEFAULT_SHADOW_OPACITY })
        case LanguagesEnum.JAVA:
            return makeIconConfig("java.svg", { shadowOpacity: DEFAULT_SHADOW_OPACITY })
        case LanguagesEnum.PYTHON:
            return makeIconConfig("python.svg")
        case LanguagesEnum.GOLANG:
            return makeIconConfig("go.svg")
        case LanguagesEnum.C:
            return makeIconConfig("c.svg", { shadowOpacity: DEFAULT_SHADOW_OPACITY })
        case LanguagesEnum.SQL:
            return makeIconConfig("sql.png")
        case FrameworksEnum.VUEJS:
            return makeIconConfig("vuejs.svg", { shadowOpacity: DEFAULT_SHADOW_OPACITY })
        case FrameworksEnum.NESTJS:
            return makeIconConfig("nestjs.svg", { shadowOpacity: DEFAULT_SHADOW_OPACITY })
        case FrameworksEnum.JAVAFX:
            return makeIconConfig("javafx.png", { shadowOpacity: DEFAULT_SHADOW_OPACITY })
        case FrameworksEnum.LIBGDX:
            return makeIconConfig("libgdx.png")
        case FrameworksEnum.ASTRO:
            return makeIconConfig("astro.svg", { shadowOpacity: DEFAULT_SHADOW_OPACITY })
        case FrameworksEnum.SVELTE:
            return makeIconConfig("svelte.svg", { shadowOpacity: DEFAULT_SHADOW_OPACITY })
        case FrameworksEnum.TAILWINDCSS:
            return makeIconConfig("tailwindcss.svg", {
                shadowOpacity: DEFAULT_SHADOW_OPACITY,
                forceSquare: true,
            })
        case FrameworksEnum.BOOTSTRAP:
            return makeIconConfig("bootstrap.svg", { shadowOpacity: DEFAULT_SHADOW_OPACITY })
        case DatabasesEnum.POSTGRESQL:
            return makeIconConfig("postgresql.svg", { shadowOpacity: DEFAULT_SHADOW_OPACITY })
        case ToolsEnum.LINUX:
            return makeIconConfig("linux.svg", { shadowOpacity: DEFAULT_SHADOW_OPACITY })
        case ToolsEnum.GIT:
            return makeIconConfig("git.svg", { shadowOpacity: DEFAULT_SHADOW_OPACITY })
        case ToolsEnum.GITHUB:
            return makeIconConfig("github.svg")
        case ToolsEnum.DOCKER:
            return makeIconConfig("docker.svg")
        case ToolsEnum.WORDPRESS:
            return makeIconConfig("wordpress.svg")
        case ToolsEnum.MONDAY:
            return makeIconConfig("monday.png")
        case ToolsEnum.OVH:
            return makeIconConfig("ovh.png")
        case ToolsEnum.NODEJS:
            return makeIconConfig("nodejs.svg", { shadowOpacity: DEFAULT_SHADOW_OPACITY })
        case ToolsEnum.VERCEL:
            return makeIconConfig("vercel.svg")
        default:
            return makeIconConfig("default")
    }
})

const image = computed(() => iconConfig.value.image)

const imageUrl = computed(() => {
    if (image.value === "default") return undefined
    return iconsByName[image.value]
})

const shadowStyle = computed(() => {
    const opacity = iconConfig.value.shadowOpacity
    return opacity === 0 ? {} : { filter: `drop-shadow(0 0 2px rgba(0, 0, 0, ${opacity}))` }
})

const forceSquare = computed(() => iconConfig.value.forceSquare ?? false)
</script>
<template>
    <span
        v-if="image"
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
