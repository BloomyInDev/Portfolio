<template>
    <div class="glass-card"><slot /></div>
</template>

<style scoped>
/* Frosted-glass card surface. Layout (padding, max-width, margin, hover) is left
   to the consumer, whose scoped styles can target this root via the class it
   passes in (Vue applies the parent's scope id to a child component's root). */
.glass-card {
    background: var(--surface);
    backdrop-filter: blur(12px);
    -webkit-backdrop-filter: blur(12px);
    border: 1px solid var(--surface-border);
    border-radius: var(--radius-lg);
    box-shadow: var(--shadow-md);
}
</style>
