<script setup lang="ts">
import { technologies, type TechnologyEnum } from "@/content/projects"
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
        case technologies.languages.HTML:
            return makeIconConfig("html.svg", { shadowOpacity: DEFAULT_SHADOW_OPACITY })
        case technologies.languages.CSS:
            return makeIconConfig("css.svg", { shadowOpacity: DEFAULT_SHADOW_OPACITY })
        case technologies.languages.JAVASCRIPT:
            return makeIconConfig("javascript.svg", { shadowOpacity: DEFAULT_SHADOW_OPACITY })
        case technologies.languages.TYPESCRIPT:
            return makeIconConfig("typescript.svg", { shadowOpacity: DEFAULT_SHADOW_OPACITY })
        case technologies.languages.PHP:
            return makeIconConfig("php.svg", { shadowOpacity: DEFAULT_SHADOW_OPACITY })
        case technologies.languages.JAVA:
            return makeIconConfig("java.svg", { shadowOpacity: DEFAULT_SHADOW_OPACITY })
        case technologies.languages.PYTHON:
            return makeIconConfig("python.svg")
        case technologies.languages.GOLANG:
            return makeIconConfig("go.svg")
        case technologies.languages.C:
            return makeIconConfig("c.svg", { shadowOpacity: DEFAULT_SHADOW_OPACITY })
        case technologies.languages.SQL:
            return makeIconConfig("sql.png")
        case technologies.frameworks.VUEJS:
            return makeIconConfig("vuejs.svg", { shadowOpacity: DEFAULT_SHADOW_OPACITY })
        case technologies.frameworks.NESTJS:
            return makeIconConfig("nestjs.svg", { shadowOpacity: DEFAULT_SHADOW_OPACITY })
        case technologies.frameworks.JAVAFX:
            return makeIconConfig("javafx.png", { shadowOpacity: DEFAULT_SHADOW_OPACITY })
        case technologies.frameworks.LIBGDX:
            return makeIconConfig("libgdx.png")
        case technologies.frameworks.ASTRO:
            return makeIconConfig("astro.svg", { shadowOpacity: DEFAULT_SHADOW_OPACITY })
        case technologies.frameworks.SVELTE:
            return makeIconConfig("svelte.svg", { shadowOpacity: DEFAULT_SHADOW_OPACITY })
        case technologies.frameworks.TAILWINDCSS:
            return makeIconConfig("tailwindcss.svg", {
                shadowOpacity: DEFAULT_SHADOW_OPACITY,
                forceSquare: true,
            })
        case technologies.frameworks.BOOTSTRAP:
            return makeIconConfig("bootstrap.svg", { shadowOpacity: DEFAULT_SHADOW_OPACITY })
        case technologies.databases.POSTGRESQL:
            return makeIconConfig("postgresql.svg", { shadowOpacity: DEFAULT_SHADOW_OPACITY })
        case technologies.databases.MARIADB:
            return makeIconConfig("mariadb.svg", { shadowOpacity: DEFAULT_SHADOW_OPACITY })
        case technologies.databases.MONGODB:
            return makeIconConfig("mongodb.svg", { shadowOpacity: DEFAULT_SHADOW_OPACITY })
        case technologies.databases.ORACLEDB:
            return makeIconConfig("oracle.svg", { shadowOpacity: DEFAULT_SHADOW_OPACITY })
        case technologies.databases.SQLITE:
            return makeIconConfig("sqlite.svg", { shadowOpacity: DEFAULT_SHADOW_OPACITY })
        case technologies.tools.LINUX:
            return makeIconConfig("linux.svg", { shadowOpacity: DEFAULT_SHADOW_OPACITY })
        case technologies.tools.GIT:
            return makeIconConfig("git.svg", { shadowOpacity: DEFAULT_SHADOW_OPACITY })
        case technologies.tools.GITHUB:
            return makeIconConfig("github.svg")
        case technologies.tools.DOCKER:
            return makeIconConfig("docker.svg")
        case technologies.tools.WORDPRESS:
            return makeIconConfig("wordpress.svg")
        case technologies.tools.MONDAY:
            return makeIconConfig("monday.png")
        case technologies.tools.OVH:
            return makeIconConfig("ovh.png")
        case technologies.tools.NODEJS:
            return makeIconConfig("nodejs.svg", { shadowOpacity: DEFAULT_SHADOW_OPACITY })
        case technologies.tools.VERCEL:
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
