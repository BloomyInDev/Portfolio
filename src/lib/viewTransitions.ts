import { nextTick } from "vue"
import { START_LOCATION, type Router } from "vue-router"

export const supportsViewTransitions =
    typeof document !== "undefined" && "startViewTransition" in document

/**
 * Animates route changes with the View Transition API.
 * The browser captures the old state in beforeResolve, then the promise handed to
 * startViewTransition only resolves once the new component is rendered
 * (afterEach + nextTick), so the browser captures the right final state.
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
