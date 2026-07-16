<script lang="ts" setup>
import { FontAwesomeIcon } from "@fortawesome/vue-fontawesome"
import { faGitAlt, faGithub, faLinkedin } from "@fortawesome/free-brands-svg-icons"
import { faEnvelope } from "@fortawesome/free-solid-svg-icons"
</script>
<template>
    <footer>
        <p>
            Bastien LUBEN.
            <a
                title="Code source & License"
                href="https://github.com/BloomyInDev/Portfolio"
                target="_blank"
                >Licence AGPL v3</a
            >
        </p>
        <div id="links">
            <a title="Mail" href="mailto:contact+portfolio@bastienluben.dev">
                <FontAwesomeIcon :icon="faEnvelope" size="lg" />
            </a>
            <a title="LinkedIn" href="https://www.linkedin.com/in/bastien-luben/" target="_blank">
                <FontAwesomeIcon :icon="faLinkedin" size="lg" />
            </a>
            <a title="GitHub" href="https://github.com/BloomyInDev" target="_blank">
                <FontAwesomeIcon :icon="faGithub" size="lg" />
            </a>
            <a title="Forge Privée" href="https://forge.red.bloomyindev.me/bastien" target="_blank">
                <FontAwesomeIcon :icon="faGitAlt" size="lg" />
            </a>
        </div>
    </footer>
</template>
<style scoped>
footer {
    margin: var(--space-12) 0 0;
    padding: var(--space-3) var(--space-6);
    color: var(--text-muted);
    font-size: var(--fs-sm);
    display: flex;
    flex-direction: row;
    align-items: center;
    justify-content: space-between;
    gap: var(--space-4);
    background: var(--surface);
    backdrop-filter: blur(12px);
    -webkit-backdrop-filter: blur(12px);
    border-top: 1px solid var(--surface-border);
}

footer > div#links {
    display: flex;
    flex-direction: row;
    justify-content: center;
    align-items: center;
    gap: var(--space-2);
}

footer > div#links > a {
    color: var(--text);
    text-decoration: none;
    display: inline-flex;
    align-items: center;
    justify-content: center;
    width: 2.25rem;
    height: 2.25rem;
    border-radius: var(--radius-md);
    transition:
        color 250ms var(--ease),
        background-color 250ms var(--ease),
        transform 250ms var(--ease);
}

footer > div#links > a:hover {
    color: var(--accent);
    background: rgba(255, 255, 255, 0.08);
    transform: translateY(-2px);
}

footer > p {
    margin: 0;
}

footer > p > a {
    color: var(--text);
}

@media (max-width: 600px) {
    footer {
        flex-direction: column;
        text-align: center;
        gap: var(--space-2);
    }
}
</style>
