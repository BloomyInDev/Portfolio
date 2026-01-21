export interface ITimeline {
    title: string
    description: string
    url: string
    dateToString: string
}

export type CustomRouteMetadata = ({defaultTitle: true}) | ({defaultTitle: false} & ({composedTitle: true, createTitle: (customTitle: string) => string} | {composedTitle: false, title: string}))
