<script lang="ts" setup>
const props = defineProps<{
    text: string
}>()
</script>

<template>
    <div id="tooltip">
        <slot />
    </div>
</template>

<style scoped>
#tooltip {
    position: relative;
    display: inline-block;
    cursor: pointer;
}

#tooltip::before {
    content: v-bind('props.text');
    text-align: center;
    background-color: grey;
    color: rgb(238, 237, 237);
    width: fit-content;
    padding: 10px;
    border-radius: 5px;
    position: absolute;
    top: 100%;
    margin-left: 20px;
    visibility: hidden;
}

#tooltip:hover::before {
    visibility: visible;
}

#tooltip::after {
    content: '';
    border-left: 7px solid transparent;
    border-right: 7px solid transparent;
    border-bottom: 10px solid #555;
    position: absolute;
    bottom: 0%;
    margin-left: -63px;
    visibility: hidden;
}

#tooltip:hover::after {
    visibility: visible;
}
</style>
