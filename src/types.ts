export interface ITimeline {
    title: string
    description: string
    url: string
    dateToString: string
}

type ComposedOrNotComposed = { composed: true; content: (args: unknown) => string } | { composed: false; content: string }
type DefaultOrCustom = { default: true } | ({ default: false } & ComposedOrNotComposed)

export type CustomRouteMetadata = { title: DefaultOrCustom, description: DefaultOrCustom, dontPregenerate: boolean }
