import type { Router } from "vue-router"

/** Chemin dont le rechargement a déjà été tenté, pour ne pas boucler. */
const ATTEMPT_KEY = "stale-chunk-reload"

/**
 * Un déploiement remplace tout le contenu de dist : les chunks de route
 * (ProjectsView-<hash>.js, son CSS…) référencés par un onglet déjà ouvert
 * disparaissent. Le chargement échoue, vue-router abandonne la navigation en
 * silence, et le clic semble sans effet. Seul un rechargement complet, qui va
 * chercher le nouvel index.html, remet l'onglet d'aplomb.
 *
 * Vite échoue de deux façons distinctes, d'où l'écoute de vite:preloadError qui
 * couvre les deux sans dépendre du libellé de l'erreur, propre à chaque
 * navigateur :
 *  - le CSS de la route ne se charge pas, rejeté avant même l'import() ;
 *  - l'import() du chunk lui-même échoue.
 */
export function setupStaleChunkReload(router: Router) {
    let preloadFailed = false
    window.addEventListener("vite:preloadError", () => {
        preloadFailed = true
    })

    router.afterEach((_to, _from, failure) => {
        if (failure) return
        preloadFailed = false
        sessionStorage.removeItem(ATTEMPT_KEY)
    })

    router.onError((error, to) => {
        const stale = preloadFailed || isStaleChunkError(error)
        preloadFailed = false

        if (!stale) return
        if (sessionStorage.getItem(ATTEMPT_KEY) === to.fullPath) return

        sessionStorage.setItem(ATTEMPT_KEY, to.fullPath)
        window.location.assign(to.fullPath)
    })
}

function isStaleChunkError(error: unknown) {
    if (!(error instanceof Error)) return false
    return /dynamically imported module|Importing a module script failed|Unable to preload CSS/i.test(
        error.message,
    )
}
