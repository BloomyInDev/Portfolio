<script setup lang="ts">
import { usePageHead } from "@/lib/routing"
import { computed } from "vue"
import GlassCard from "@components/GlassCard.vue"

const hash = computed(() => import.meta.env.VITE_GIT_COMMIT_HASH)
const commitUrl = computed(() => `https://github.com/BloomyInDev/Portfolio/commit/${hash.value}`)

usePageHead()
</script>

<template>
    <GlassCard class="about">
        <h2>A propos</h2>
        <p>Je m'appelle Bastien LUBEN</p>
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
    </GlassCard>
</template>

<style scoped>
.about {
    width: min(44rem, 100% - 2rem);
    margin: var(--space-12) auto;
    padding: var(--space-8);
    text-align: center;
}

.about > h2 {
    font-size: var(--fs-xl);
    margin: 0 0 var(--space-6);
}

.about > p {
    color: var(--text-muted);
    margin: var(--space-4) 0;
}

a {
    color: var(--accent);
    text-decoration-thickness: 1px;
    text-underline-offset: 2px;
}
</style>
