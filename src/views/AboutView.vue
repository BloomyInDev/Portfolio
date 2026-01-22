<script setup lang="ts">
import { usePageHead } from "@/script/routing"
import { computed } from "vue"

const hash = computed(() => import.meta.env.VITE_GIT_COMMIT_HASH)
const commitUrl = computed(() => `https://github.com/BloomyInDev/Portfolio/commit/${hash.value}`)

usePageHead()
</script>

<template>
    <section>
        <h2>A propos</h2>
        <p>
            Pour me contacter, n'hésitez pas à m'envoyer un email à l'adresse
            <a href="mailto:contact+portfolio@bastienluben.dev"
                >contact+portfolio@bastienluben.dev</a
            >
        </p>
        <p>
            Vous pouvez également obtenir un lien pour mon CV
            <a href="/cvWebBastienLuben.pdf" target="_blank">ici</a>.
        </p>
        <p>Ce site a été développé par Bastien LUBEN en utilisant Vite et Vue.js.</p>
        <p>
            Le code source est disponible sur
            <a href="https://github.com/BloomyInDev/Portfolio" target="_blank">GitHub</a>. Hash de
            commit: <a :href="commitUrl">{{ hash }}</a>
        </p>
    </section>
</template>

<style scoped>
section {
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
}

a {
    color: #ffffff;
}
</style>
