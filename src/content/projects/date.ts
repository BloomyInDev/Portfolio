import type { ICustomDate, IProjectDate } from "./types"

export enum MonthEnum {
    January,
    February,
    March,
    April,
    May,
    June,
    July,
    August,
    September,
    October,
    November,
    December,
}

export const createDate = (options: { day?: number; month: MonthEnum; year: number }) => ({
    definedDay: options.day !== undefined,
    date: new Date(options.year, options.month, options.day ?? 1),
})

export const dateToDateString = (date: ICustomDate): string =>
    date.date.toLocaleDateString("fr-FR", {
        day: date.definedDay ? "2-digit" : undefined,
        month: "long",
        year: "numeric",
    })

export const projectDateToString = (projectDates: IProjectDate): string => {
    if (projectDates.end === undefined) {
        return `Depuis ${projectDates.start.definedDay ? "le" : ""} ${dateToDateString(projectDates.start)}`
    } else if (projectDates.end.date.getMonth() === projectDates.start.date.getMonth()) {
        return `Du ${projectDates.start.date.toLocaleDateString("fr-FR", { day: "2-digit" })} ${projectDates.end.definedDay ? "au" : "à"} ${dateToDateString(projectDates.end)}`
    } else {
        return `${projectDates.start.definedDay ? "Du" : "De"} ${dateToDateString(projectDates.start)} ${projectDates.end.definedDay ? "au" : "à"} ${dateToDateString(projectDates.end)}`
    }
}
