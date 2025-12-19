<script setup lang="ts">
import { RouterLink } from "vue-router"
import type { ITimeline } from "@/types/timeline"
import { computed } from "vue"
import { FontAwesomeIcon } from "@fortawesome/vue-fontawesome"
import { faCalendar } from "@fortawesome/free-solid-svg-icons"

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
                <p><FontAwesomeIcon :icon="faCalendar" /> {{ item.dateToString }}</p>
            </div>
            <span class="bubble"></span>
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
    content: "";
    background-color: #ffffff;
    border-radius: 0.25rem;
    margin: 5%;
}

.timeline > .container {
    display: flex;
    width: 28rem;
    color: #ffffff;
    text-decoration: none;
    justify-content: center;
    align-items: center;
    gap: 1rem;
}

.timeline > .container.left {
    justify-content: end;
    flex-direction: row;
}

.timeline > .left {
    grid-column: 1 / span 2;
    align-content: end;
}

.timeline > .container.right {
    justify-content: start;
    flex-direction: row-reverse;
}

.timeline > .right {
    grid-column: 2 / span 2;
    align-content: start;
}

.bubble {
    width: 1rem;
    height: 1rem;
    background-image: linear-gradient(115deg, #006eff 50%, #00f7ff);
    border-radius: 50%;
    position: relative;
    transition: all 250ms ease-in-out;
}

.timeline > .container.right > .bubble {
    transform: translateX(-25%);
}

.timeline > .container.left > .bubble {
    transform: translateX(25%);
}

.bubble:hover {
    width: 2rem;
    height: 2rem;
}

.timeline > .container.right > .bubble:hover {
    transform: translateX(-40%);
}

.timeline > .container.left > .bubble:hover {
    transform: translateX(40%);
}

.content {
    background-color: #00275a80;
    padding: 1rem;
    border-radius: 1rem;
    max-width: 20rem;
}

@media (max-width: 900px) {
    .timeline {
        gap: 0.5rem 0;
    }

    .timeline > .container {
        width: 100%;
    }

    .timeline > .container.right > .bubble {
        transform: translateX(25%);
    }

    .timeline > .container.right > .bubble:hover {
        transform: translateX(40%);
    }

    .timeline > .container.right {
        justify-content: end;
        flex-direction: row;
    }

    .timeline > .right {
        grid-column: 1 / span 2;
        align-content: end;
    }
}

@media (max-width: 600px) {
    .content {
        max-width: 15rem;
    }

    .timeline > .container {
        max-width: 20rem;
    }
}
</style>
