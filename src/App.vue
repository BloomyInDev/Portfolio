<script setup lang="ts">
import FooterComponent from '@components/layout/FooterComponent.vue'
import HeaderComponent from '@components/layout/HeaderComponent.vue'
</script>

<template>
    <HeaderComponent />
    <main><RouterView /></main>
    <FooterComponent />
</template>

<style scoped></style>
