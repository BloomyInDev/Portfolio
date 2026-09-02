import type { Router } from "vue-router"

/** Chemin dont le rechargement a déjà été tenté, pour ne pas boucler. */
const ATTEMPT_KEY = "stale-chunk-reload"

/**
 * Un déploiement remplace tout le contenu de dist : les chunks de route
 * (ProjectsView-<hash>.js…) référencés par un onglet déjà ouvert disparaissent.
 * L'import() échoue alors, vue-router abandonne la navigation en silence, et le
 * navigateur mémorise le rejet : tous les clics suivants sur le lien sont
 * ignorés sans même refaire de requête. Seul un rechargement complet, qui va
 * chercher le nouvel index.html, remet l'onglet d'aplomb.
 */
export function setupStaleChunkReload(router: Router) {
    router.afterEach((_to, _from, failure) => {
        if (!failure) sessionStorage.removeItem(ATTEMPT_KEY)
    })

    router.onError((error, to) => {
        if (!isStaleChunkError(error)) return
        if (sessionStorage.getItem(ATTEMPT_KEY) === to.fullPath) return

        sessionStorage.setItem(ATTEMPT_KEY, to.fullPath)
        window.location.assign(to.fullPath)
    })
}

function isStaleChunkError(error: unknown) {
    if (!(error instanceof Error)) return false
    return /dynamically imported module|Importing a module script failed|error loading dynamically imported module/i.test(
        error.message,
    )
}
