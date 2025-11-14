<template>
    <div class="btn">
        <slot></slot>
    </div>
</template>

<style scoped>
.btn {
    padding: 0.5rem 1rem;
    border: none;
    border-radius: 0.25rem;
    background-color: #268fff;
    color: #ffffff;
    font-size: 1rem;
    cursor: pointer;
    transition: background-color 250ms ease-in-out;
}
.btn:hover {
    background-color: #0069da;
}

.btn > * {
    color: #ffffff;
    text-decoration: none;
}
</style>
