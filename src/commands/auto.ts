export const autoSchedule = (): string => {
    const startDate: Date = new Date('2023-05-06');
    const today: Date = new Date();

    const daysDifference: number =
        Math.floor(
            (today.getTime() - startDate.getTime()) / (1000 * 60 * 60 * 24)
        ) % 14;

    let schedule: string;

    if (daysDifference >= 0 && daysDifference < 2) {
        schedule = "Aujourd'hui, auto travaille de 5h à 13h.";
    } else if (daysDifference >= 2 && daysDifference < 4) {
        schedule = "Aujourd'hui, auto travaille de 13h à 21h.";
    } else if (daysDifference >= 4 && daysDifference < 6) {
        schedule = "Aujourd'hui, auto travaille de 21h à 5h.";
    } else {
        schedule = "Aujourd'hui, auto ne travaille pas.";
    }

    return schedule;
};
