export const autoSchedule = (): string => {
    const startDate: Date = new Date('2023-05-06');
    const today: Date = new Date();
    const timezoneOffset: number = today.getTimezoneOffset() / 60;

    const daysDifference: number =
        Math.floor(
            (today.getTime() - startDate.getTime()) / (1000 * 60 * 60 * 24)
        ) % 14;

    let schedule: string;

    if (daysDifference >= 0 && daysDifference < 2) {
        schedule = `Aujourd'hui, auto travaille de ${5 + timezoneOffset}h à ${
            13 + timezoneOffset
        }h.`;
    } else if (daysDifference >= 2 && daysDifference < 4) {
        schedule = `Aujourd'hui, auto travaille de ${13 + timezoneOffset}h à ${
            21 + timezoneOffset
        }h.`;
    } else if (daysDifference >= 4 && daysDifference < 6) {
        schedule = `Aujourd'hui, auto travaille de ${21 + timezoneOffset}h à ${
            5 + timezoneOffset
        }h.`;
    } else {
        schedule = "Aujourd'hui, auto ne travaille pas.";
    }

    return schedule;
};
