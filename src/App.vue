<script setup lang="ts">
import FooterComponent from "@components/layout/FooterComponent.vue"
import HeaderComponent from "@components/layout/HeaderComponent.vue"
import { RouterView, useRoute } from "vue-router"

const route = useRoute()
</script>

<template>
    <HeaderComponent />
    <main>
        <RouterView v-slot="{ Component }">
            <Transition name="fade" mode="out-in">
                <component :is="Component" :key="route.path" />
            </Transition>
        </RouterView>
    </main>
    <FooterComponent />
</template>

<style>
.fade-enter-active,
.fade-leave-active {
    transition: opacity 0.2s ease;
}

.fade-enter-from,
.fade-leave-to {
    opacity: 0;
}
</style>
