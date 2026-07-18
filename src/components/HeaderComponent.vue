<script setup lang="ts">
import { RouterLink } from "vue-router"
import { FontAwesomeIcon } from "@fortawesome/vue-fontawesome"
import { faHouse, faCircleInfo, faWrench } from "@fortawesome/free-solid-svg-icons"
</script>

<template>
    <header>
        <h1>Bastien LUBEN</h1>
        <nav>
            <RouterLink to="/" title="Acceuil">
                <FontAwesomeIcon :icon="faHouse" size="lg" />
            </RouterLink>
            <RouterLink to="/projects" title="Projets">
                <FontAwesomeIcon :icon="faWrench" size="lg" />
            </RouterLink>
            <RouterLink to="/about" title="À propos">
                <FontAwesomeIcon :icon="faCircleInfo" size="lg" />
            </RouterLink>
        </nav>
    </header>
</template>

<style scoped>
header {
    position: sticky;
    top: 0;
    z-index: 10;
    margin: 0;
    display: flex;
    flex-direction: row;
    justify-content: space-between;
    align-items: center;
    background: var(--surface);
    backdrop-filter: blur(12px);
    border-bottom: 1px solid var(--surface-border);
}

header > h1 {
    font-size: var(--fs-lg);
    font-weight: 700;
    margin: 0;
    padding: var(--space-3) var(--space-4);
}

header > nav {
    display: flex;
    align-items: center;
    justify-content: center;
    gap: var(--space-2);
    margin: 0 var(--space-3);
}

header > nav > a {
    color: var(--text);
    text-decoration: none;
    display: inline-flex;
    align-items: center;
    justify-content: center;
    width: 2.5rem;
    height: 2.5rem;
    border-radius: var(--radius-md);
    transition:
        color 250ms var(--ease),
        background-color 250ms var(--ease);
}

header > nav > a:hover {
    color: var(--accent);
    background: rgba(255, 255, 255, 0.08);
}

header > nav > a.router-link-exact-active {
    color: var(--cyan-300);
    background: rgba(0, 247, 255, 0.12);
}
</style>
