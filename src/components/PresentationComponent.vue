<template>
    <div id="container">
        <div id="me"><img alt="Une image de Bastien LUBEN" /></div>
        <div id="presentation">
            <p>Bonjour, je m'appelle</p>
            <p id="name">Bastien LUBEN</p>
            <p>et je suis étudiant en BUT Informatique</p>
        </div>
    </div>
</template>
<style scoped>
div#container {
    display: flex;
    flex-direction: row;
    justify-content: center;
    align-items: center;
    gap: var(--space-8);
    margin: var(--space-12) 0;
}

div#me {
    height: fit-content;
    position: relative;
}

/* Soft glow halo behind the avatar */
div#me::before {
    content: "";
    position: absolute;
    inset: -8%;
    border-radius: 50%;
    background: radial-gradient(circle at 50% 40%, rgba(0, 247, 255, 0.35), transparent 70%);
    filter: blur(24px);
    z-index: -1;
}

div#me > img {
    content: url("@assets/me.png");
    display: block;
    border-radius: 50%;
    max-width: 22rem;
    width: 100%;
    border: 2px solid rgba(255, 255, 255, 0.25);
    box-shadow: var(--shadow-lg);
    animation: mover 2.5s infinite alternate ease-in-out;
}

@keyframes mover {
    0% {
        transform: translateY(0.9rem);
    }
    100% {
        transform: translateY(-0.9rem);
    }
}

div#presentation p {
    font-size: var(--fs-lg);
    color: var(--text-muted);
    margin: 0;
    text-align: center;
}

div#presentation > p#name {
    font-size: var(--fs-3xl);
    font-weight: 700;
    letter-spacing: -0.02em;
    color: var(--text);
    margin: var(--space-2) 0;
}

/* Passage en pile verticale dès qu'il n'y a plus la place pour deux colonnes. */
@media (max-width: 600px) {
    div#container {
        flex-direction: column;
        gap: var(--space-6);
        margin: var(--space-8) 0;
    }

    div#me > img {
        max-width: 11rem;
    }
}
</style>
