<script setup lang="ts">
import type { IProject } from "@/content/projects"
import { onMounted, onUnmounted, ref } from "vue"

const props = defineProps<{
    images: IProject["images"]
}>()

const currentIndex = ref(0)
let interval: number | null = null

const onInterval = () => {
    nextSlide()
}

const resetInterval = () => {
    if (interval) {
        clearInterval(interval)
    }
    interval = setInterval(onInterval, 10_000)
}

const nextSlide = () => {
    resetInterval()
    currentIndex.value = (currentIndex.value + 1) % props.images.length
}

const prevSlide = () => {
    resetInterval()
    currentIndex.value = (currentIndex.value - 1 + props.images.length) % props.images.length
}

const goToSlide = (index: number) => {
    resetInterval()
    currentIndex.value = index
}

onMounted(() => {
    resetInterval()
})

onUnmounted(() => {
    if (interval) clearInterval(interval)
})
</script>

<template>
    <div class="carousel">
        <div class="carousel-viewport">
            <div
                class="carousel-inner"
                :style="{ transform: `translateX(-${currentIndex * 100}%)` }"
            >
                <div v-for="(image, index) in images" :key="index" class="carousel-item">
                    <img
                        :src="image.url"
                        :alt="image.title ?? 'Image du projet'"
                        :title="image.title ?? ''"
                    />
                </div>
            </div>

            <button class="carousel-control prev" @click="prevSlide" aria-label="Image précédente">
                &#10094;
            </button>
            <button class="carousel-control next" @click="nextSlide" aria-label="Image suivante">
                &#10095;
            </button>

            <span class="carousel-counter">{{ currentIndex + 1 }} / {{ images.length }}</span>

            <p v-if="images[currentIndex]?.title" class="carousel-caption">
                {{ images[currentIndex]?.title }}
            </p>
        </div>

        <div class="carousel-indicators">
            <button
                v-for="(image, index) in images"
                :key="index"
                :class="{ active: index === currentIndex }"
                :aria-label="`Aller à l'image ${index + 1}`"
                @click="goToSlide(index)"
            ></button>
        </div>
    </div>
</template>

<style scoped>
.carousel {
    width: 100%;
    display: flex;
    flex-direction: column;
    gap: var(--space-3);
}

.carousel-viewport {
    position: relative;
    overflow: hidden;
    border-radius: var(--radius-lg);
    border: 1px solid var(--surface-border);
    background: rgba(0, 18, 51, 0.5);
}

.carousel-inner {
    display: flex;
    transition: transform 0.5s var(--ease);
    width: 100%;
}

.carousel-item {
    min-width: 100%;
    display: flex;
    align-items: center;
    justify-content: center;
}

.carousel-item img {
    width: 100%;
    max-height: 60vh;
    display: block;
    object-fit: contain;
}

.carousel-control {
    position: absolute;
    top: 50%;
    transform: translateY(-50%);
    background: var(--surface-strong);
    backdrop-filter: blur(8px);
    border: 1px solid var(--surface-border);
    color: #ffffff;
    cursor: pointer;
    font-size: 1.1rem;
    z-index: 10;
    border-radius: 50%;
    width: 2.75rem;
    height: 2.75rem;
    display: flex;
    align-items: center;
    justify-content: center;
    transition:
        background 250ms var(--ease),
        transform 250ms var(--ease);
}

.carousel-control:hover {
    background: var(--accent-strong);
    transform: translateY(-50%) scale(1.08);
}

.prev {
    left: var(--space-3);
}

.next {
    right: var(--space-3);
}

.carousel-counter {
    position: absolute;
    top: var(--space-3);
    right: var(--space-3);
    padding: 0.2rem 0.6rem;
    border-radius: 999px;
    font-size: var(--fs-sm);
    background: var(--surface-strong);
    backdrop-filter: blur(8px);
    border: 1px solid var(--surface-border);
}

.carousel-caption {
    position: absolute;
    left: 0;
    right: 0;
    bottom: 0;
    margin: 0;
    padding: var(--space-6) var(--space-4) var(--space-3);
    font-size: var(--fs-sm);
    background: linear-gradient(transparent, rgba(0, 18, 51, 0.85));
}

.carousel-indicators {
    display: flex;
    justify-content: center;
    gap: var(--space-2);
}

.carousel-indicators button {
    width: 1.5rem;
    height: 0.35rem;
    padding: 0;
    border: none;
    background: rgba(255, 255, 255, 0.35);
    border-radius: 999px;
    cursor: pointer;
    transition:
        background 250ms var(--ease),
        width 250ms var(--ease);
}

.carousel-indicators button.active {
    width: 2.5rem;
    background: var(--cyan-300);
}
</style>
