<script setup lang="ts">
import { RouterLink } from "vue-router"
import type { ITimeline } from "@/types"
import { computed } from "vue"
import GlassCard from "@components/GlassCard.vue"
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
            <GlassCard class="content">
                <h2>{{ item.title }}</h2>
                <p>{{ item.description }}</p>
                <p><FontAwesomeIcon :icon="faCalendar" /> {{ item.dateToString }}</p>
            </GlassCard>
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
    gap: 0 var(--space-4);
}

.timeline > .bar {
    grid-column: 2;
    grid-row: 1 / span v-bind(numberOfItems);
    width: 0.4rem;
    height: 95%;
    content: "";
    background: linear-gradient(180deg, var(--blue-400), var(--blue-500));
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
    /* Pull each row up so the alternating cards interleave. Tunable. */
    margin-bottom: -4rem;
}

.timeline > .container:last-child {
    margin-bottom: 0;
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
    width: 1.1rem;
    height: 1.1rem;
    background: var(--cyan-300);
    border: 2px solid #ffffff;
    box-shadow: 0 0 0 4px rgba(0, 18, 51, 0.4);
    border-radius: 50%;
    position: relative;
    transition: transform 250ms var(--ease);
}

/* Base offset nudges the dot onto the bar; hover only scales (from center) so
   the dot grows in place without shifting. */
.timeline > .container.right > .bubble {
    transform: translateX(-25%);
}

.timeline > .container.left > .bubble {
    transform: translateX(25%);
}

.timeline > .container.right:hover > .bubble {
    transform: translateX(-25%) scale(1.6);
}

.timeline > .container.left:hover > .bubble {
    transform: translateX(25%) scale(1.6);
}

.content {
    padding: var(--space-6);
    max-width: 20rem;
    transition:
        transform 250ms var(--ease),
        border-color 250ms var(--ease),
        box-shadow 250ms var(--ease);
}

.timeline > .container:hover .content {
    transform: translateY(-4px);
    border-color: var(--surface-border-hover);
    box-shadow: var(--shadow-lg);
}

.content > h2 {
    margin: 0 0 var(--space-2);
    font-size: var(--fs-lg);
}

.content > p {
    margin: var(--space-2) 0 0;
    color: var(--text-muted);
    font-size: var(--fs-sm);
}

@media (max-width: 900px) {
    .timeline {
        gap: 0.5rem 0;
    }

    .timeline > .container {
        width: 100%;
        margin-bottom: 0;
    }

    .timeline > .container.right > .bubble {
        transform: translateX(25%);
    }

    .timeline > .container.right:hover > .bubble {
        transform: translateX(25%) scale(1.6);
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
