<script lang="ts" setup>
import { FontAwesomeIcon } from '@fortawesome/vue-fontawesome'
import { faGitAlt, faGithub, faLinkedin } from '@fortawesome/free-brands-svg-icons'
</script>
<template>
    <footer>
        <p>Bastien LUBEN.</p>
        <div id="links">
            <a href="https://www.linkedin.com/in/bastien-luben/" target="_blank">
                <FontAwesomeIcon :icon="faLinkedin" size="lg" />
            </a>
            <a href="https://github.com/BloomyInDev" target="_blank">
                <FontAwesomeIcon :icon="faGithub" size="lg" />
            </a>
            <a href="https://forge.red.bloomyindev.me/bastien" target="_blank">
                <FontAwesomeIcon :icon="faGitAlt" size="lg" />
            </a>
        </div>
    </footer>
</template>
<style scoped>
footer {
    margin: 0;
    padding: 0 1rem;
    background-color: #00275a80;
    display: flex;
    flex-direction: row;
    justify-content: space-between;
}

footer > div#links {
    display: flex;
    flex-direction: row;
    justify-content: center;
    align-items: center;
    gap: 1rem;
}

footer > div#links > a {
    color: #ffffff;
    text-decoration: none;
}
</style>
