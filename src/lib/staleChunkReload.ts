import type { Router } from "vue-router"

/** Path we already tried reloading, so we don't loop. */
const ATTEMPT_KEY = "stale-chunk-reload"

/**
 * A deploy replaces the whole of dist: the route chunks (ProjectsView-<hash>.js,
 * its CSS...) an already-open tab points at are gone. Loading fails, vue-router
 * silently abandons the navigation, and the click looks like it did nothing. Only
 * a full reload, which fetches the new index.html, sets the tab straight again.
 *
 * Vite fails in two distinct ways, hence listening to vite:preloadError, which
 * covers both without depending on the error message, browser-specific as it is:
 *  - the route's CSS does not load, rejected before the import() even runs;
 *  - the import() of the chunk itself fails.
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
