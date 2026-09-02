/// <reference types="vite/client" />

declare module "virtual:technology-icons" {
    /** Bundled icons, keyed by `category/file` (see plugins/technologyIcons). */
    const icons: Record<string, string | undefined>
    export default icons
}
