import { computed } from "vue"
import { useRoute } from "vue-router"
import { useHead } from "@unhead/vue"
import type { CustomRouteMetadata } from "@/types"

const DEFAULTS = {
    title: "Bastien Luben",
    description: "Portfolio de Bastien Luben - Développeur",
}

export function usePageHead(args: unknown = {}) {
    const route = useRoute()

    const meta = computed(() => route.meta as CustomRouteMetadata | undefined)

    const title = computed(() => {
        if (!meta.value) return DEFAULTS.title

        const t = meta.value.title
        if (t.default) return DEFAULTS.title
        if (t.composed) return `${t.content(args)} - ${DEFAULTS.title}`
        return `${t.content} - ${DEFAULTS.title}`
    })

    const description = computed(() => {
        if (!meta.value) return DEFAULTS.description

        const d = meta.value.description
        if (d.default) return DEFAULTS.description
        if (d.composed) return d.content(args)
        return d.content
    })

    useHead({
        title,
        meta: [
            {
                name: "description",
                content: description,
            },
            {
                property: "og:title",
                content: title,
            },
            {
                property: "og:description",
                content: description,
            },
            {
                name: "og:site_name",
                content: "Bastien Luben",
            },
            {
                property: "og:type",
                content: "website",
            },
            {
                name: "og:email",
                content: "contact+portfolio@bastienluben.dev",
            },
            {
                name: "og:country-name",
                content: "France",
            },
            {
                name: "og:image",
                content: "https://bastienluben.dev/favicon.png",
            },
            {
                name: "twitter:title",
                content: title,
            },
            {
                name: "twitter:description",
                content: description,
            },
        ],
    })
}
