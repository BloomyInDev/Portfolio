<script setup lang="ts">
import FooterComponent from "@components/FooterComponent.vue"
import HeaderComponent from "@components/HeaderComponent.vue"
import { RouterView, useRoute } from "vue-router"
import { supportsViewTransitions } from "@/lib/viewTransitions"

const route = useRoute()
</script>

<template>
    <HeaderComponent />
    <main>
        <RouterView v-slot="{ Component }">
            <component v-if="supportsViewTransitions" :is="Component" :key="route.path" />
            <Transition v-else name="fade" mode="out-in">
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
