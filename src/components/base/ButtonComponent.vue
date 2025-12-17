<template>
    <div class="btn">
        <slot></slot>
    </div>
</template>

<style scoped>
.btn {
    padding: 0.5rem 1rem;
    border: none;
    border-radius: 0.75rem;
    background-color: #268fff;
    color: #ffffff;
    font-size: 1rem;
    cursor: pointer;
    transition: all 250ms ease-in-out;
}
.btn:hover {
    background-color: #0069da;
    border-radius: 1rem;
}

.btn > * {
    color: #ffffff;
    text-decoration: none;
}
</style>
