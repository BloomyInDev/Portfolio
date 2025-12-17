<script setup lang="ts">
import { RouterLink } from 'vue-router'
import type { ITimeline } from '@/types/timeline'
import { computed } from 'vue'

const props = defineProps<{ items: ITimeline[] }>()
const numberOfItems = computed(() => props.items.length)
</script>

<template>
    <div class="timeline">
        <div class="bar"></div>

        <RouterLink
            v-for="(item, index) in props.items"
            :key="index"
            :to="item.url"
            :class="['container', index % 2 === 0 ? 'left' : 'right']"
            :style="{ gridRow: (index + 1).toString() }"
        >
            <div class="content">
                <h2>{{ item.title }}</h2>
                <p>{{ item.description }}</p>
            </div>
        </RouterLink>
    </div>
</template>

<style scoped>
.timeline {
    display: grid;
    grid-template-columns: repeat(3, auto);
    justify-items: center;
    justify-content: center;
    align-items: center;
    align-content: center;
    gap: 0 1rem;
}

.timeline > .bar {
    grid-column: 2;
    grid-row: 1 / span v-bind(numberOfItems);
    width: 0.5rem;
    height: 95%;
    content: '';
    background-color: #ffffff;
    border-radius: 0.25rem;
    margin: 5%;
}

.timeline > .container {
    display: flex;
    width: 100%;
    color: #ffffff;
}

.timeline > .container.left {
    justify-content: end;
}

.timeline > .left {
    grid-column: 1;
    align-content: end;
}

.timeline > .container.right {
    justify-content: start;
}

.timeline > .right {
    grid-column: 3;
    align-content: start;
}
</style>
