export interface ITimeline {
    title: string
    description: string
    url: string
    dateToString: string
}

type ComposedOrNotComposed<T extends object = object> =
    | ({ composed: true; content: (args: unknown) => string } & T)
    | ({ composed: false; content: string } & T)

type ComposedOrNotComposedAndWithWithoutSuffix = ComposedOrNotComposed<{ withSuffix: boolean }>

type DefaultOrCustom<T extends ComposedOrNotComposed> = { default: true } | ({ default: false } & T)

export type CustomRouteMetadata = {
    title: DefaultOrCustom<ComposedOrNotComposedAndWithWithoutSuffix>
    description: DefaultOrCustom<ComposedOrNotComposed>
    dontPregenerate: boolean
}
