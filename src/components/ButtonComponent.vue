<script setup lang="ts">
import { computed } from "vue"

const props = withDefaults(
    defineProps<{
        proportionalPaddings?: boolean
        unroundedCorners?: {
            topLeft: boolean
            topRight: boolean
            bottomLeft: boolean
            bottomRight: boolean
        }
    }>(),
    {
        proportionalPaddings: false,
        unroundedCorners: () => ({
            topLeft: false,
            topRight: false,
            bottomLeft: false,
            bottomRight: false,
        }),
    },
)

const padding = computed(() => {
    return props.proportionalPaddings ? "proportional-paddings" : "non-proportinal-paddings"
})

const corners = computed(() => {
    const cornersClasses = []
    // Dirty way to clone an object
    const corners = JSON.parse(JSON.stringify(props.unroundedCorners)) as {
        topLeft: boolean
        topRight: boolean
        bottomLeft: boolean
        bottomRight: boolean
    }

    Object.keys(corners).forEach((corner) => {
        corners[corner as keyof typeof corners] = !corners[corner as keyof typeof corners]
    })

    if (corners.topLeft) cornersClasses.push("rounded-top-left")
    if (corners.topRight) cornersClasses.push("rounded-top-right")
    if (corners.bottomLeft) cornersClasses.push("rounded-bottom-left")
    if (corners.bottomRight) cornersClasses.push("rounded-bottom-right")

    return cornersClasses.join(" ")
})
</script>
<template>
    <div :class="`btn ${padding} ${corners}`">
        <slot></slot>
    </div>
</template>

<style scoped>
.btn {
    --default-rounded-corner: 0.75rem;
    --default-hover-rounded-corner: 1rem;
}

.proportinal-paddings {
    padding: 0.6rem;
}

.non-proportinal-paddings {
    padding: 0.6rem 1.25rem;
}

.rounded-top-left {
    border-top-left-radius: var(--default-rounded-corner);
}

.rounded-top-left:hover {
    border-top-left-radius: var(--default-hover-rounded-corner);
}

.rounded-top-right {
    border-top-right-radius: var(--default-rounded-corner);
}

.rounded-top-right:hover {
    border-top-right-radius: var(--default-hover-rounded-corner);
}

.rounded-bottom-left {
    border-bottom-left-radius: var(--default-rounded-corner);
}

.rounded-bottom-left:hover {
    border-bottom-left-radius: var(--default-hover-rounded-corner);
}

.rounded-bottom-right {
    border-bottom-right-radius: var(--default-rounded-corner);
}

.rounded-bottom-right:hover {
    border-bottom-right-radius: var(--default-hover-rounded-corner);
}

.btn {
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
