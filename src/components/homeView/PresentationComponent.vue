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
    margin: 4rem 0;
}

div#me {
    height: fit-content;
}

div#me > img {
    content: url('@assets/me.png');
    border-radius: 50%;
    max-width: 24rem;
    margin: auto;
    animation: mover 2s infinite alternate ease-in-out;
}

@keyframes mover {
    0% {
        transform: translateY(1rem);
    }
    100% {
        transform: translateY(-1rem);
    }
}

div#container > div#me {
    margin: 0 1rem;
}

div#presentation p {
    font-size: x-large;
    margin: 0;
    text-align: center;
}

div#presentation > p:nth-child(2) {
    font-size: xx-large;
    font-weight: bold;
    margin: 0.5rem 0;
}
</style>
