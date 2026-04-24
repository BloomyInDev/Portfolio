<script setup lang="ts">
import type { IProject } from "@/content/projects"
import { onMounted, ref } from "vue"

const props = defineProps<{
    images: IProject["images"]
}>()

const currentIndex = ref(0)
let interval: number | null = null

const onInterval = () => {
    console.log("On interval")
    nextSlide()
}

const resetInterval = () => {
    console.log("Resetting interval")
    if (interval) {
        console.log("Clearing previous interval")
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
</script>

<template>
    <div class="carousel">
        <div class="carousel-inner" :style="{ transform: `translateX(-${currentIndex * 100}%)` }">
            <div v-for="(image, index) in images" :key="index" class="carousel-item">
                <img
                    :src="image.url"
                    :alt="image.title ?? 'Carousel Image'"
                    :title="image.title ?? ''"
                />
            </div>
        </div>
        <button class="carousel-control prev" @click="prevSlide" aria-label="Previous Slide">
            &#10094;
        </button>
        <button class="carousel-control next" @click="nextSlide" aria-label="Next Slide">
            &#10095;
        </button>
        <div class="carousel-indicators">
            <span
                v-for="(image, index) in images"
                :key="index"
                :class="{ active: index === currentIndex }"
                @click="goToSlide(index)"
            ></span>
        </div>
    </div>
</template>

<style scoped>
.carousel {
    position: relative;
    width: 100%;
    overflow: hidden;
    border-radius: 1rem;
}

.carousel-inner {
    display: flex;
    transition: transform 0.5s ease-in-out;
    width: 100%;
    align-items: center;
}

.carousel-item {
    min-width: 100%;
    box-sizing: border-box;
    border-radius: 1rem;
}

.carousel-item img {
    border-radius: 1rem;
    width: 100%;
    display: block;
    object-fit: cover;
}

.carousel-control {
    position: absolute;
    top: 50%;
    transform: translateY(-50%);
    background-color: rgba(0, 0, 0, 0.5);
    color: white;
    border: none;
    padding: 10px;
    cursor: pointer;
    font-size: 18px;
    z-index: 10;
    border-radius: 50%;
    width: 40px;
    height: 40px;
    display: flex;
    align-items: center;
    justify-content: center;
}

.carousel-control:hover {
    background-color: rgba(0, 0, 0, 0.8);
}

.prev {
    left: 10px;
}

.next {
    right: 10px;
}

.carousel-indicators {
    position: absolute;
    bottom: 15px;
    left: 50%;
    transform: translateX(-50%);
    display: flex;
    gap: 10px;
}

.carousel-indicators span {
    width: 10px;
    height: 10px;
    background-color: rgba(255, 255, 255, 0.5);
    border-radius: 50%;
    cursor: pointer;
}

.carousel-indicators span.active {
    background-color: white;
}
</style>
