<script lang="ts" setup>
import { FontAwesomeIcon } from "@fortawesome/vue-fontawesome"
import { faGitAlt, faGithub, faLinkedin } from "@fortawesome/free-brands-svg-icons"
</script>
<template>
    <footer>
        <p>
            Bastien LUBEN.
            <a href="https://github.com/BloomyInDev/Portfolio" target="_blank">Licence AGPL v3</a>
        </p>
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
    margin-top: 1rem;
    padding: 0 1rem;
    background-color: #00275a80;
    color: #ffffff;
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
    transition: all 250ms ease-in-out;
}

footer > div#links > a:hover {
    color: #0099ff;
}

footer > p > a {
    color: #ffffff;
}
</style>
