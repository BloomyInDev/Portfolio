<script lang="ts" setup>
import { RouterLink } from "vue-router"
import ButtonComponent from "@components/ButtonComponent.vue"
</script>
<template>
    <section>
        <h2>404 - Page non trouvée</h2>
        <h3>Tu es perdu, viens retourne sur la bonne route</h3>
        <img id="compass" src="@/assets/compass.gif" alt="Boussole Minecraft" />
        <p>
            <ButtonComponent>
                <RouterLink to="/">Retourner à l'accueil</RouterLink>
            </ButtonComponent>
        </p>
    </section>
</template>
<style scoped>
section {
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    gap: 1rem;
    text-align: center;
    color: #ffffff;
    padding: 2rem;
    height: 100%;
}

h2,
h3 {
    margin: 0;
}

h2 {
    font-size: 2rem;
    font-weight: bolder;
}

h3 {
    font-size: 1.5rem;
    font-weight: normal;
}
p > * {
    color: #fff;
}

img#compass {
    height: 8rem;
}
</style>
