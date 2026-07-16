<template>
    <div class="btn"><slot></slot></div>
</template>

<style scoped>
.btn {
    padding: 0.6rem 1.25rem;
    border-radius: var(--radius-md);
    border: 1px solid rgba(255, 255, 255, 0.18);
    background: linear-gradient(180deg, var(--blue-500), var(--accent-strong));
    color: #ffffff;
    font-size: var(--fs-base);
    font-weight: 600;
    cursor: pointer;
    box-shadow: var(--shadow-md);
    transition:
        transform 250ms var(--ease),
        box-shadow 250ms var(--ease),
        filter 250ms var(--ease);
}

.btn:hover {
    transform: translateY(-2px);
    filter: brightness(1.08);
    box-shadow: var(--shadow-lg);
}

.btn:active {
    transform: translateY(0);
}

.btn > * {
    color: #ffffff;
    text-decoration: none;
}
</style>
