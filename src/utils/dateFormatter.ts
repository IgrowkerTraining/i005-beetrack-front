export type DateToFormat = Date | string;

export const dateFormatter = (date: DateToFormat): string => {

    if(date instanceof Date) {
        return date.toLocaleDateString();
    }

    return new Date(date).toLocaleDateString();
}