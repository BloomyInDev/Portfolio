<script setup lang="ts">
import { RouterLink } from 'vue-router'
import { FontAwesomeIcon } from '@fortawesome/vue-fontawesome'
import { faHouse, faCircleInfo } from '@fortawesome/free-solid-svg-icons'
</script>

<template>
    <header>
        <h1>Bastien LUBEN</h1>
        <nav>
            <RouterLink to="/" title="Acceuil">
                <FontAwesomeIcon :icon="faHouse" size="lg" />
            </RouterLink>
            <!--
                <RouterLink to="/about" title="À propos">
                    <FontAwesomeIcon :icon="faCircleInfo" size="lg" />
                </RouterLink>
            -->
        </nav>
    </header>
</template>

<style scoped>
header {
    margin: 0;
    background-color: #00275a80;
    display: flex;
    flex-direction: row;
    justify-content: space-between;
}

header > h1 {
    font-size: 2.25rem;
    margin: 0;
    padding: 0.5rem;
}

header > nav {
    color: white;
    display: flex;
    align-items: center;
    justify-content: center;
    gap: 1rem;
    margin: 0 1rem;
}

header > nav > a {
    color: white;
    text-decoration: none;
    transition: all 250ms ease-in-out;
}

header > nav > a:hover {
    color: #0099ff;
}
</style>
