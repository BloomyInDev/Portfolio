import { nextTick } from "vue"
import { START_LOCATION, type Router } from "vue-router"

export const supportsViewTransitions =
    typeof document !== "undefined" && "startViewTransition" in document

/**
 * Anime les changements de route avec la View Transition API.
 * Le navigateur capture l'ancien état dans beforeResolve, puis la promesse
 * passée à startViewTransition n'est résolue qu'une fois le nouveau composant
 * rendu (afterEach + nextTick), pour que le navigateur capture le bon état final.
 */
export function setupViewTransitions(router: Router) {
    if (!supportsViewTransitions) return

    let finishTransition: (() => void) | undefined

    router.beforeResolve((to, from) => {
        if (from === START_LOCATION || to.fullPath === from.fullPath) return
        if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return

        return new Promise<void>((resolve) => {
            document.startViewTransition(() => {
                resolve()
                return new Promise<void>((finish) => {
                    finishTransition = finish
                })
            })
        })
    })

    router.afterEach(async () => {
        if (!finishTransition) return
        await nextTick()
        finishTransition()
        finishTransition = undefined
    })

    router.onError(() => {
        finishTransition?.()
        finishTransition = undefined
    })
}
