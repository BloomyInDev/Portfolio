export const projectNameToId = (name: string): string =>
    name
        .toLowerCase()
        .normalize("NFD")
        .replace(/[^a-zA-Z0-9 -]/g, "") // Remove everything that is not a letter, number, space or dash
        .replace(/ /g, "-") // Replace spaces with dashes
