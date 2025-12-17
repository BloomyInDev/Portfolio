<script lang="ts" setup>
import PresentationComponent from "@components/homeView/PresentationComponent.vue"
import ButtonComponent from "@components/base/ButtonComponent.vue"
</script>

<template>
    <div class="center">
        <PresentationComponent />
        <div class="buttons">
            <ButtonComponent>
                <RouterLink to="/projects">Voir mes projets</RouterLink>
            </ButtonComponent>
        </div>
    </div>
</template>

<style scoped>
div.center {
    display: flex;
    justify-content: center;
    align-items: center;
    flex-direction: column;
    height: 100%;
}
</style>
